import { useEffect, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../api/BaseUrl';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // userId 정보 가져오기
        console.log('user:', user);
        if (!user?.userId) {
            setPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        axios.get(`${BASE_URL}/api/users/myPost`, {
            params: { userId: user.seq }
        })
        .then(res => setPosts(res.data))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    }, []);

    console.log('내가 작성한 글:', posts);

    return (
        <div className="activity-list-section">
            <h3>📝 내가 작성한 글 ({posts.length}개)</h3>
            <div className="post-list">
                {loading ? (
                    <div className="list-empty">로딩 중...</div>
                ) : posts.length === 0 ? (
                    <div className="list-empty">작성한 글이 없습니다.</div>
                ) : posts.map(post => (
                    <div key={post.id} className="list-item post-item">
                        <div className="item-content">
                            <h4 className="item-title">{post.title}</h4>
                            <div className="item-meta">
                                <span className="item-date">{post.createdAt?.slice(0, 10)}</span>
                                <span className="item-stats">
                                    조회 {post.view} · 추천수 {post.likes}
                                </span>
                            </div>
                        </div>
                        <div className="item-action">
                            <button
                                className="view-btn"
                                onClick={() => window.location.href = `/board/all/detail/${post.id}`}>
                                보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPosts;
