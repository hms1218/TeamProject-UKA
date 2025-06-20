import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BoardDetail.css';
import { useChat } from '../Context/ChatContext';
import Swal from 'sweetalert2';

const mockComments = [
    { id: 1, author: 'guest1', content: '저도 궁금해요.', date: '25.06.14' },
    { id: 2, author: 'user2', content: '답변 부탁드려요.', date: '25.06.14' },
];

const AllBoardDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { chats, notice, review } = useChat();

    const [post, setPost] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    const [comments, setComments] = useState(mockComments);
    const [commentInput, setCommentInput] = useState('');

    const postType = location.state?.postType;

    useEffect(() => {
        const postId = parseInt(id);

        // notice는 별도 처리
        if (postType === 'notice') {
            const sortedNotices = [...notice].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const idx = sortedNotices.findIndex(notice => notice.id === postId);
            const current = sortedNotices[idx];

            setPost(current);
            setPrev(sortedNotices[idx - 1] || null);
            setNext(sortedNotices[idx + 1] || null);
            return;
        }

        // chat + review만 정렬
        const combined = [
            ...chats.map(posts => ({ ...posts, type: 'chat' })),
            ...review.map(posts => ({ ...posts, type: 'review' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const idx = combined.findIndex(posts => posts.id === postId);
        const current = {...combined[idx]};

        setPost({...current});
        setPrev(combined[idx - 1] || null);
        setNext(combined[idx + 1] || null);
    }, [id, notice, chats, review]);

    if (!post) {
        return <p>게시글을 찾을 수 없습니다.</p>;
    }

    const handleSecretNavigate = (post) => {
        if (post.isSecret) {
            Swal.fire({
                title: '🔒 비밀글입니다',
                text: '비밀번호를 입력해주세요',
                input: 'password',
                inputPlaceholder: '비밀번호',
                showCancelButton: true,
                confirmButtonColor: '#6c5ce7',  // 보라색 확인 버튼
                cancelButtonColor: '#636e72',   // 회색 취소 버튼
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            preConfirm: (password) => {
                if (!password) {
                    Swal.showValidationMessage('비밀번호를 입력해주세요!');
                }
                    return password;
            }
            }).then((result) => {
                if (result.isConfirmed) {
                    const inputPassword = result.value;
                        if (handlePasswordConfirm(inputPassword, post)) {
                            navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: '비밀번호가 틀렸습니다',
                                confirmButtonColor: '#d63031',
                            });
                        }
                }
            });
        } else {
            navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
        }
    }

    //비밀번호 확인
    const handlePasswordConfirm = (inputPassword, post) => {
        if (inputPassword.trim() === post.password) {
            window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
            return true;
        }
        return false;
    };

    // 댓글 추가
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentInput.trim()) {
            setComments([
                ...comments,
                {
                id: comments.length + 1,
                author: 'me',
                content: commentInput,
                date: (new Date().toISOString().split('T')[0]),
                },
            ]);
        setCommentInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <p>{post.title}</p>
            <table className='board-detail-table-container'>
                <tbody>
                    <tr>
                        <td style={{ background: '#ccc', padding: 9, fontWeight: 700 }}>등록자명</td>
                        <td style={{ background: '#fff', width: '18%', padding: 9 }}>{post.author}</td>
                        <td style={{ background: '#ccc', padding: 9, fontWeight: 700 }}>등록일</td>
                        <td style={{ background: '#fff', width: '20%', padding: 9 }}>{new Date(post.createdAt).toLocaleString()}</td>
                        <td style={{ background: '#ccc', padding: 9, fontWeight: 700 }}>조회수</td>
                        <td style={{ background: '#fff', width: '8%', padding: 9 }}>{post.views ?? 0}</td>
                        <td style={{ background: '#ccc', padding: 9, fontWeight: 700 }}>추천수</td>
                        <td style={{ background: '#fff', width: '8%', padding: 9 }}>{post.likes ?? 0}</td>
                    </tr>
                </tbody>
            </table>
                <p>{post.content}</p>
            </div>

            <div className="board-detail-button-group">
                <button
                className="board-detail-button"
                    onClick={() => navigate(`/board/all/${post.id}/new`, { state: post })}
                >
                ✏️ 수정
                </button>
                <button
                className="board-detail-button"
                onClick={() => {
                    if (window.confirm('삭제하시겠습니까?')) {
                    alert('삭제 기능은 아직 구현되지 않았습니다.');
                    navigate('/board/all');
                    }
                }}
                >
                🗑 삭제
                </button>
                <button
                    className="board-detail-button"
                    onClick={() => navigate('/board/all')}
                >
                ← 목록으로
                </button>
            </div>

            {/* 7. 댓글 */}
            <div style={{ margin: "35px 0 0 0" }}>
                <h4 style={{ marginBottom: 12, fontWeight: 700, fontSize: 17 }}>댓글 <span>({comments.length})</span></h4>
                <div style={{ marginLeft: 3 }}>
                {comments.length === 0 && <div style={{ color: "#aaa" }}>등록된 댓글이 없습니다.</div>}
                {comments.map(c => (
                    <div key={c.id} style={{
                    marginBottom: 10, fontSize: 15, padding: '12px 0', borderBottom: '1px solid #f1f1f1'
                    }}>
                    <b>{c.author}</b> <span style={{ color: "#bbb", fontSize: 13, marginLeft: 8 }}>{c.date}</span>
                    <div style={{ marginLeft: 2 }}>{c.content}</div>
                    </div>
                ))}
                </div>
                <form style={{ display: "flex", gap: 8, marginBottom: 18, marginTop: 12 }} onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    style={{
                    flex: 1,
                    // border: "1px solid #b19cd9",
                    border: "1px solid #ccc",
                    borderRadius: 7,
                    fontSize: 16,
                    padding: "8px 14px"
                    }}
                />
                <button type="submit" className="board-detail-submit-button">등록</button>
                </form>
            </div>

            <div className="board-post-navigation">
            {prev && (
                <div 
                    className="board-post-nav-item" 
                    onClick={() => handleSecretNavigate(prev)}
                >
                    <span className="board-post-nav-label">◀️ 이전글</span>
                    <span className="board-post-nav-title">
                    {prev.isSecret ? '비밀글입니다.' : prev.title}
                    </span>
                </div>
            )}
            {next && (
                <div className="board-post-nav-item" onClick={() => handleSecretNavigate(next)}>
                    <span className="board-post-nav-label">▶️ 다음글</span>
                    <span className="board-post-nav-title">
                    {next.isSecret ? '비밀글입니다.' : next.title}
                    </span>
                </div>
            )}
            </div>
        </div>
    );
};

export default AllBoardDetail;
