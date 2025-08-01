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

    return (
        <div className="activity-list-section">
            <h3>💬 내가 작성한 댓글 ({comments.length}개)</h3>
            <div className="comment-list">
                {comments.length === 0 ? (
                    <div>작성한 댓글이 없습니다.</div>
                ) : (
                    comments.map((comment, index) => (
                        <div key={comment.id || index} className="list-item comment-item">
                            <div className="item-content">
                                <p className="comment-text">"{comment.content}"</p>
                                <div className="item-meta">
                                    <span className="comment-post">게시글: {comment.postTitle || comment.post || '알 수 없음'}</span>
                                    <span className="item-date">{comment.createdAt?.slice(0, 10) || comment.date}</span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button
                                    className="view-btn"
                                    onClick={() => {
                                        // 게시글 상세로 이동 (postId 필요시 아래처럼)
                                        if (comment.postId) {
                                            window.location.href = `/board/all/detail/${comment.postId}`;
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
