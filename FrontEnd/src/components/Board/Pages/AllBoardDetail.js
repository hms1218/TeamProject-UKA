import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BoardDetail.css';
import { useBoard } from '../Context/BoardContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import isAdminCheck from '../../Common/isAdminCheck';

const mockComments = [
    { id: 1, author: 'guest1', content: '저도 궁금해요.', date: '25.06.14', parentId: null },
    { id: 2, author: 'user2', content: '답변 부탁드려요.', date: '25.06.14',parentId: null },
];

const API_BASE_URL = 'http://localhost:8888';

const categoryLabels = {
        NOTICE: '공지사항',
        CHAT: '속닥속닥',
        REVIEW: '입양후기'
    };

const AllBoardDetail = () => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { posts } = useBoard();
    const isAdmin = isAdminCheck();

    const [notice, setNotice] = useState([]);
    const [chat, setChat] = useState([]);
    const [review, setReview] = useState([]);
    
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
    const [replyTargetId, setReplyTargetId] = useState(null); // 댓글에 대한 답글 
    const [replyInput, setReplyInput] = useState({});

    // 대댓글 수정 상태 관리: 수정 중인 대댓글 id, 수정할 텍스트
    const [editReplyId, setEditReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState('');

    const [isLiked, setIsLiked] = useState(false);
    const [isReported, setIsReported] = useState(false);

    // const currentUser = localStorage.getItem("username"); //유저 정보
    const currentUser = isAdmin ? "admin" : localStorage.getItem("username") || 'me';

    const filteredList = location.state?.filteredList || null;

    useEffect(() => {
        const fetchBoardById = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/board/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error('게시글 불러오기 실패', error);
                Swal.fire({
                    icon: 'error',
                    title: '게시글 불러오기 실패',
                    text: '서버에서 게시글을 불러오지 못했습니다.'
                });
                navigate('/board/all');
            }
        }
        fetchBoardById();
    },[id])

    useEffect(() => {
        if(!post) return;

        console.log('post.category:', post.category);
        console.log('filteredList:', filteredList);

        const notice = posts.filter(p => p.category.toUpperCase() === 'NOTICE');
         console.log('notice:', notice);
        const chat = posts.filter(p => p.category.toUpperCase() === 'CHAT');
        const review = posts.filter(p => p.category.toUpperCase() === 'REVIEW');

        let noticeList = [];

        if(post.category === 'NOTICE'){

            if (filteredList && filteredList.length > 0) {
                const filteredNotice = filteredList.filter(p => p.category.toUpperCase() === 'NOTICE');
                noticeList = filteredNotice.length > 0 ? filteredNotice : notice;
            } else {
                noticeList = notice;
            }

            console.log('noticeList:', noticeList);
            if(!noticeList || noticeList.length === 0){
                setPrev(null);
                setNext(null);
            }

            const sortedNotice = [...noticeList].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            const idx = sortedNotice.findIndex(p => p.id === post.id);
            console.log('현재 post 인덱스:', idx);
            console.log('post.id:', post.id, 'type:', typeof post.id);
            console.log('noticeList ids:', noticeList.map(p => ({ id: p.id, type: typeof p.id })));
            setPrev(sortedNotice[idx - 1] || null);
            setNext(sortedNotice[idx + 1] || null);
            return
        }

        let combinedList = [];

        if(filteredList){
            combinedList = filteredList.filter(post => post.category === 'CHAT' || post.category === 'REVIEW');
        } else{
            combinedList = [
                ...chat.map(post => ({...post, category: 'CHAT'})),
                ...review.map(post => ({...post, category: 'REVIEW'}))
            ]
        }

        if(combinedList.length === 0){
            setPrev(null);
            setNext(null);
            return;
        }

        const sortedCombined = combinedList.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        const idx = sortedCombined.findIndex(p => p.id === post.id);

        setPrev(sortedCombined[idx - 1] || null);
        setNext(sortedCombined[idx + 1] || null);

    },[post, filteredList, posts])

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
        navigate(`/board/all/detail/${post.type}/${post.id}`, {
            state: {
                filteredList: filteredList
            }
        });
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
                // deletePostById(post.type, post.id)
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
                author: currentUser,
                content: commentInput,
                date: (new Date().toISOString().split('T')[0]),
                parentId: null,
                },
            ]);
        setCommentInput('');
        }
    };

    //답글
    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();

        const input = replyInput[parentId]?.trim();
        if(!input) return;
        
        setComments([
            ...comments,
            {
                id: Date.now(),
                author: currentUser,
                content: input,
                date: new Date().toISOString().split('T')[0],
                parentId: parentId,
            },
        ]);
        setReplyInput(prev => {
            const newInputs = {...prev};
            delete newInputs[parentId];
            return newInputs;
        });

        setReplyTargetId(null);
        
    }

    // ✅ 댓글과 대댓글 재귀 렌더링 함수
    const renderCommentTree = (parentId = null, level = 0) => {
        return comments
        .filter(c => c.parentId === parentId)
        .map(c => (
            <div key={c.id} style={{ marginLeft: parentId ? 20 : 0, marginBottom: 12 }}>
            <div style={{ fontSize: 15 }}>
                <b>
                    {c.author}
                    {c.author === currentUser && " (작성자)"}
                </b>
                <span style={{ marginLeft: 6, color: "#bbb", fontSize: 13 }}>{c.date}</span>
            </div>
            <div>
                {editCommentId === c.id || editReplyId === c.id ? (
                <>
                    <input
                        type="text"
                        value={editCommentId === c.id ? editCommentText : editReplyText}
                        onChange={e => {
                            if (editCommentId === c.id) setEditCommentText(e.target.value);
                            else setEditReplyText(e.target.value);
                        }}
                        style={{
                            fontSize: 14,
                            padding: "6px 12px",
                            border: "1px solid #ccc",
                            borderRadius: 6,
                            width: "60%",
                            marginTop: 6,
                        }}
                    />
                    <button
                        className="board-detail-comment-button"
                        onClick={() => {
                            if (editCommentId === c.id) saveEditComment();
                            else saveEditReply();
                        }}
                        style={{
                            cursor: 'pointer',
                        }}
                        >
                        저장
                    </button>
                    <button
                        className="board-detail-comment-button"
                        onClick={() => {
                            setEditCommentId(null);
                            setEditReplyId(null);
                        }}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                    취소
                    </button>
                </>
                ) : (
                <>
                    <div style={{ fontSize: 14, marginTop: 4 }}>{c.content}</div>
                    {(isAdmin || c.author === currentUser) && (
                    <>
                        <button
                            onClick={() =>
                                c.parentId
                                ? EditReply(c)
                                : EditComment(c)
                            }
                            style={{
                                fontSize: 13,
                                marginLeft: 4,
                                background: 'none',
                                border: 'none',
                                color: '#0984e3',
                                cursor: 'pointer',
                            }}
                        >
                        ✏️ 수정
                        </button>
                        <button
                            onClick={() =>
                                c.parentId
                                ? handleDeleteReply(c.id)
                                : handleDeleteComment(c.id)
                            }
                            style={{
                                fontSize: 13,
                                marginLeft: 6,
                                background: 'none',
                                border: 'none',
                                color: '#e17055',
                                cursor: 'pointer',
                            }}
                        >
                        🗑 삭제
                        </button>
                    </>
                    )}
                </>
                )}
            </div>

            {/* ↪ 답글 버튼 */}
            <button
                onClick={() => setReplyTargetId(prev => (prev === c.id ? null : c.id))}
                style={{
                fontSize: 13,
                marginTop: 6,
                background: 'none',
                border: 'none',
                color: '#6c5ce7',
                cursor: 'pointer',
                }}
            >
                ↪ 답글
            </button>

            {/* 답글 입력창 */}
            {replyTargetId === c.id && (
                <form
                onSubmit={e => handleReplySubmit(e, c.id)}
                style={{ display: 'flex', gap: 8, marginTop: 6 }}
                >
                <input
                    type="text"
                    placeholder="답글을 입력하세요"
                    value={replyInput[c.id] || ''}
                    onChange={e =>
                    setReplyInput(prev => ({ ...prev, [c.id]: e.target.value }))
                    }
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

            {/* 🔁 재귀 호출 */}
            {renderCommentTree(c.id, level + 1)}
            </div>
        ));
    };

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

    //임시라 고쳐야함
    const handleLikesButton = () => {

        setIsLiked(prevLiked => {
            const newLiked = !prevLiked;

            setPost(prevPost => ({
                ...prevPost,
                likes: newLiked ? prevPost.likes + 1 : prevPost.likes - 1,         
            }));

            return newLiked;
        });
    };

    //임시라 고쳐야함
    const handleReportButton = () => {
        setIsReported(prevReported => {
            const newReported = !prevReported;

            setPost(prevPost => ({
                ...prevPost,
                report: newReported ? (prevPost.report || 0) + 1 : (prevPost.report || 0) - 1,
            }));

            return newReported;
        });
    };

    return (
        <div style={{ minWidth:'1075px' }}>
            <div className='board-detail-title-container'>
                <p style={{marginTop: 20}}>[ {categoryLabels[post.category]} ]</p>  
                <div style={{textAlign: 'right', marginTop:15}}>
                    <span style={{color: '#ccc'}}>
                        조회수 {post.view} |
                        추천수 {post.likes} |
                        신고수 {post.report}
                    </span><br/>
                </div>         
            </div>
            <div className='board-detail-title-container'>
                <p style={{fontSize: 30}}>{post.title}</p>
                <div style={{textAlign: 'right', marginTop: 15}}>
                    <span style={{color: '#ccc'}}>
                        작성자 : {post.author}
                    </span><br/>
                    <span style={{color: '#ccc'}}>
                        {new Date(post.createdAt).toLocaleString()}
                    </span>
                </div>  
            </div>
            <hr/>
            <div className='board-detail-content'>
                <p style={{minHeight: 250, fontSize:18}}>{post.content}</p>
            </div>

            <div className="board-detail-button-group">
                <>
                    <button className="board-detail-button"
                        onClick={handleLikesButton}
                        style={{
                            backgroundColor: isLiked ? '#4895ff' : '#fff',
                            color: isLiked ? '#fff' : '#000'
                        }}
                    >
                        👍추천
                    </button>
                    <button className="board-detail-report-button"
                        onClick={handleReportButton}
                        style={{
                            backgroundColor: isReported ? 'red' : '#fff',
                            color: isReported ? '#fff' : '#000',
                        }}
                    >
                        🚨신고
                    </button>
                </>
                {((post.type === 'notice' && isAdmin) || (post.type !== 'notice' && (isAdmin || post.author === currentUser))) && (
                    <>
                        <button className="board-detail-button"
                            onClick={() => navigate(`/board/all/edit/${post.type}/${post.id}`, { state: post })}
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
            </div>
                
            
            {/* 댓글 렌더링 */}
            {/* ✅ 댓글 영역 */}
            <strong>댓글({comments.length})</strong>
            <div style={{ marginTop: 12 }}>
                {renderCommentTree()}
            </div>
            
            <form
                onSubmit={handleCommentSubmit}
                style={{ display: 'flex', gap: 8, marginTop: 12 }}
      
            >
                <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    style={{
                        flex: 1,
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
