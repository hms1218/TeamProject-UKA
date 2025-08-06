import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/BaseUrl';

const MyComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.userId) {
            setComments([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        axios.get(`${BASE_URL}/api/users/myComment`, {
            params: { userId: user.seq }

        })
        .then(res => setComments(res.data))
        .catch(() => setComments([]))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>댓글 불러오는 중...</div>;
    }

    console.log('내가 작성한 댓글:', comments);

    return (
        <div className="activity-list-section">
            <h3>💬 내가 작성한 댓글 ({comments.length}개)</h3>
            <div className="comment-list">
                {comments.length === 0 ? (
                    <div>작성한 댓글이 없습니다.</div>
                ) : (
                    comments.map((comment, index) => (
                        <div key={comment.id || comment.commentId || index} className="list-item comment-item">
                            <div className="item-content">
                                <p className="comment-text">"{comment.content}"</p>
                                <div className="item-meta">
                                    <span className="comment-type">
                                        {comment.type === 'BOARD' ? '게시판' : 'QnA'}
                                    </span>
                                    <span className="comment-post">
                                        게시글: {comment.postTitle || comment.boardTitle || comment.qnaTitle || comment.post || '알 수 없음'}
                                    </span>
                                    <span className="item-date">
                                        {(comment.createdAt || comment.date || '').slice(0, 10)}
                                    </span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button
                                    className="view-btn"
                                    onClick={() => {
                                        // 게시글 상세로 이동 (type별 분기)
                                        if (comment.type === 'QNA') {
                                            // QnA 댓글: qnaId 또는 postId 사용
                                            window.location.href = `customer/qna/${comment.postId.substring(8)}`;
                                        } else if (comment.type === 'BOARD') {
                                            // 게시판 댓글: boardId 또는 postId 사용
                                            window.location.href = `/board/all/detail/${comment.postId || comment.boardId}`;
                                        }
                                    }}
                                >
                                    보기
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyComments;
