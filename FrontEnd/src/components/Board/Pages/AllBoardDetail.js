import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BoardDetail.css';
import { useChat } from '../Context/ChatContext';
import Swal from 'sweetalert2';
import { useAdmin } from '../../../api/AdminContext';

const mockComments = [
    { id: 1, author: 'guest1', content: '저도 궁금해요.', date: '25.06.14' },
    { id: 2, author: 'user2', content: '답변 부탁드려요.', date: '25.06.14' },
];

const AllBoardDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { chats, notice, review, deletePostById } = useChat();
    const { isAdmin } = useAdmin();

    const [post, setPost] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    //댓글
    const [comments, setComments] = useState(mockComments);
    const [commentInput, setCommentInput] = useState('');
    // 댓글 수정 상태 관리: 수정 중인 댓글 id, 수정할 텍스트
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    //대댓글
    const [replyTargetId, setReplyTargetId] = useState(null); // 현재 대댓글 입력 대상
    const [replyInput, setReplyInput] = useState('');
    // 대댓글 수정 상태 관리: 수정 중인 대댓글 id, 수정할 텍스트
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    // const currentUser = localStorage.getItem("username"); //유저 정보
    const currentUser = isAdmin ? "admin" : localStorage.getItem("username") || "me";

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

    // 댓글 LocalStorage에서 불러오기
    useEffect(() => {
        const saved = localStorage.getItem(`comments-${id}`);
        if (saved) {
            setComments(JSON.parse(saved));
        } else {
            setComments(mockComments); // 기본 댓글
        }
    }, [id]);

    // 댓글 LocalStorage에 저장
    useEffect(() => {
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
    }, [comments, id]);

    // 댓글 수정
    const EditComment = (comment) => {
        setEditCommentId(comment.id);
        setEditCommentText(comment.content);
    };

    // 댓글 수정 저장
    const saveEditComment = () => {
        if (editCommentText.trim() === '') return;

        setComments(prev =>
            prev.map(c =>
                c.id === editCommentId ? { ...c, content: editCommentText } : c
            )
        );
        setEditCommentId(null);
        setEditCommentText('');
    };

    // 대댓글 수정
    const EditReply = (reply) => {
        setEditReplyId(reply.id);
        setEditReplyText(reply.content);
    };

    // 대댓글 수정 저장
    const saveEditReply = () => {
        if (editReplyText.trim() === '') return;

        setComments(prev =>
            prev.map(c =>
                c.id === editReplyId ? { ...c, content: editReplyText } : c
            )
        );
        setEditReplyId(null);
        setEditReplyText('');
    };

    if (!post) {
        return <p>게시글을 찾을 수 없습니다.</p>;
    }

    //이전글, 다음글
    const handleNavigate = (post) => {
        navigate(`/board/all/detail/${post.id}`, { state: { postType: post.type } });
    }

    //삭제 버튼
    const handleDelete = () => {
        Swal.fire({
            title: '게시글 삭제',
            text: '정말 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6c5ce7',  // 보라색 확인 버튼
            cancelButtonColor: '#636e72',   // 회색 취소 버튼
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if(result.isConfirmed){
                deletePostById(post.type, post.id)
                Swal.fire({
                    title: '삭제 완료',
                    text: '게시글이 삭제되었습니다.',
                    icon: 'success',
                    confirmButtonColor: '#6c5ce7',
                    confirmButtonText: '확인'
                }).then(() => {
                    navigate(`/board/all`);
                });
            };
        })
    }

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

    //대댓글
    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();
        if (replyInput.trim()) {
            setComments([
            ...comments,
            {
                id: Date.now(),
                author: 'me',
                content: replyInput,
                date: new Date().toISOString().split('T')[0],
                parentId: parentId,
            },
            ]);
            setReplyInput('');
            setReplyTargetId(null);
        }
    }

    //댓글 삭제
    const handleDeleteComment = (id) => {
        Swal.fire({
            title: '댓글 삭제',
            text: '해당 댓글 및 대댓글이 삭제됩니다. 계속할까요?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e17055',
            cancelButtonColor: '#636e72',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                setComments(prev =>
                    prev.filter(c => c.id !== id && c.parentId !== id)  // 댓글 + 대댓글 제거
                );
            Swal.fire('삭제 완료', '댓글이 삭제되었습니다.', 'success');
            }
        });
    };

    //대댓글 삭제
    const handleDeleteReply = (id) => {
        Swal.fire({
            title: '답글 삭제',
            text: '정말 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#e17055',
            cancelButtonColor: '#636e72',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                setComments(prev => prev.filter(c => c.id !== id));
            Swal.fire('삭제 완료', '답글이 삭제되었습니다.', 'success');
            }
        });
    };

    const category = {
        notice: '공지사항',
        chat: '속닥속닥',
        review: '입양후기',
    }

    return (
        <div style={{minWidth:'1075px'}}>
            <label>[ {category[postType]} ]</label>
            <div className='board-detail-title-container'>
                <p style={{fontSize: 30}}>{post.title}</p>
                <p style={{color: '#ccc'}}>
                    작성자 {post.author} | 
                    등록일 {new Date(post.createdAt).toLocaleString()} |
                    조회수 {post.views} |
                    추천수 {post.likes}
                </p>
            </div>
            <hr/>
            <div className='board-detail-content'>
                <p style={{minHeight: 250, fontSize:18}}>{post.content}</p>
            </div>

            <div className="board-detail-button-group">
                {((postType === 'notice' && isAdmin) || (postType !== 'notice' && (isAdmin || post.author === currentUser))) && (
                    <>
                        <button className="board-detail-button"
                            onClick={() => navigate(`/board/all/edit/${postType}/${post.id}`, { state: post })}
                        >
                        ✏️ 수정
                        </button>
                        <button className="board-detail-button"
                            onClick={handleDelete}
                        >
                        🗑 삭제
                        </button>
                    </>
                )}
                <button className="board-detail-button"
                    onClick={() => navigate('/board/all')}       
                >
                ← 목록으로
                </button>
                {/* <button onClick={() => alert(`${currentUser}`)}>테스트</button> */}
            </div>
                
            
            {/* 댓글 렌더링 */}
            {comments.filter(c => !c.parentId).map(c => (
            <div key={c.id} style={{
                    marginBottom: 10, fontSize: 15, padding: '12px 0', borderBottom: '1px solid #f1f1f1'
                }}>
                <b>{c.author}</b> 
                <span style={{ color: "#bbb", fontSize: 13, marginLeft: 8 }}>{c.date}</span>
                <div style={{ marginLeft: 2 }}>
                    {editCommentId === c.id ? (
                    // 수정모드
                    <>
                        <input
                            type="text"
                            value={editCommentText}
                            onChange={e => setEditCommentText(e.target.value)}
                            style={{ fontSize: 15, width: '50%', padding: 5 }}
                        />
                        <button 
                            className='board-detail-comment-button'
                            onClick={saveEditComment} 
                        >저장</button>
                        <button 
                            className='board-detail-comment-button'
                            onClick={() => setEditCommentId(null)} 
                        >취소</button>
                    </>
                    ) : (
                    // 일반모드
                    <>
                        {c.content}
                        {(isAdmin || c.author === currentUser) && (
                        <>
                            <button
                            onClick={() => EditComment(c)}
                            style={{ fontSize: 14, marginLeft: 8, background: 'none', border: 'none', color: '#0984e3', cursor: 'pointer' }}
                            >✏️ 수정</button>
                            <button
                            onClick={() => handleDeleteComment(c.id)}
                            style={{ fontSize: 14, marginLeft: 10, background: 'none', border: 'none', color: '#e17055', cursor: 'pointer' }}
                            >🗑 삭제</button>                  
                        </>
                        )}
                    </>
                    )}
                </div>

                {/* 대댓글 목록 */}
                {comments.filter(r => r.parentId === c.id).map(r => (
                <div key={r.id} style={{ marginLeft: 20, marginTop: 8, fontSize: 14 }}>
                        └ <b>{r.author}</b> 
                        <span style={{ color: "#bbb", fontSize: 12, marginLeft: 6 }}>{r.date}</span>
                    <div style={{ marginLeft: 4 }}>
                        {editReplyId === r.id ? (
                        // 수정모드
                        <>
                            <input
                            type="text"
                            value={editReplyText}
                            onChange={e => setEditReplyText(e.target.value)}
                            style={{ fontSize: 14, width: '50%', padding: 5 }}
                            />
                            <button 
                                className='board-detail-comment-button'
                                onClick={saveEditReply} 
                            >저장</button>
                            <button 
                                className='board-detail-comment-button'
                                onClick={() => setEditReplyId(null)} 
                            >취소</button>
                        </>
                        ) : (
                        //일반모드
                        <>
                        {r.content}
                        {(isAdmin || r.author === currentUser) && (
                        <>
                            <button
                                onClick={() => EditReply(r)}
                                style={{ fontSize: 14, marginLeft: 4, background: 'none', border: 'none', color: '#0984e3', cursor: 'pointer' }}
                            >✏️ 수정</button>
                            <button
                                onClick={() => handleDeleteReply(r.id)}
                                style={{ fontSize: 14, marginLeft: 8, background: 'none', border: 'none', color: '#e17055', cursor: 'pointer' }}
                            >🗑 삭제</button>
                        </>
                        )}
                        </>
                        )}
                    </div>
                </div>
                ))}

                {/* 대댓글 작성 버튼 */}
                <button
                onClick={() => setReplyTargetId(c.id)}
                style={{ fontSize: 13, marginTop: 6, background: 'none', border: 'none', color: '#6c5ce7', cursor: 'pointer' }}
                >
                ↪ 답글
                </button>

                {/* 대댓글 입력창 */}
                {replyTargetId === c.id && (
                <form onSubmit={(e) => handleReplySubmit(e, c.id)} style={{ display: 'flex', gap: 8, marginTop: 6, marginLeft: 16 }}>
                    <input
                    type="text"
                    placeholder="답글을 입력하세요"
                    value={replyInput}
                    onChange={e => setReplyInput(e.target.value)}
                    style={{
                        flex: 1,
                        border: "1px solid #ccc",
                        borderRadius: 7,
                        fontSize: 14,
                        padding: "6px 12px"
                    }}
                    />
                    <button type="submit" className="board-detail-submit-button">등록</button>
                </form>
                )}
            </div>
            ))}
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


            <div className="board-post-navigation">
            {prev && (
                <div 
                    className="board-post-nav-item" 
                    onClick={() => handleNavigate(prev)}
                >
                    <span className="board-post-nav-label">◀️ 이전글</span>
                    <span className="board-post-nav-title">
                    {prev.title}
                    </span>
                </div>
            )}
            {next && (
                <div className="board-post-nav-item" onClick={() => handleNavigate(next)}>
                    <span className="board-post-nav-label">▶️ 다음글</span>
                    <span className="board-post-nav-title">
                    {next.title}
                    </span>
                </div>
            )}
            </div>
        </div>
    );
};

export default AllBoardDetail;
