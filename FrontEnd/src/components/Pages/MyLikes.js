import { useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../api/BaseUrl';

const MyLikes = () => {
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.seq) {
            setLikes([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        axios.get(`${BASE_URL}/api/users/myLikes`, {
            params: { userId: user.userId }
        })
        .then(res => setLikes(res.data))
        .catch(() => setLikes([]))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>좋아요 목록 불러오는 중...</div>;
    }

    return (
        <div className="activity-list-section">
            <h3>❤️ 좋아요 누른 게시물 ({likes.length}개)</h3>
            <div className="liked-list">
                {likes.length === 0 ? (
                    <div>좋아요 누른 게시물이 없습니다.</div>
                ) : (
                    likes.map((liked, index) => (
                        <div key={liked.id || index} className="list-item liked-item">
                            <div className="item-content">
                                <h4 className="item-title">{liked.title}</h4>
                                <div className="item-meta">
                                    <span className="item-author">작성자: {liked.author}</span>
                                    <span className="item-date">{liked.date?.slice(0, 10)}</span>
                                    <span className="item-likes">좋아요 {liked.likes}</span>
                                </div>
                            </div>
                            <div className="item-action">
                                <button
                                    className="unlike-btn"
                                    onClick={() => {
                                        // 좋아요 취소 로직 여기에 추가
                                    }}
                                >❤️</button>
                                <button
                                    className="view-btn"
                                    onClick={() => {
                                        if (liked.id) {
                                            window.location.href = `/board/all/detail/${liked.id}`;
                                        }
                                    }}
                                >보기</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyLikes;
