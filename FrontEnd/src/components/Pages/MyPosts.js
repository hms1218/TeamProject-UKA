import { useEffect, useState } from 'react';
import axios from 'axios';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true);
        axios.get('/api/users/me/posts', {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        .then(res => setPosts(res.data))
        .catch(() => setPosts([]))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="activity-list-section">
            <h3>📝 내가 작성한 글 ({posts.length}개)</h3>
            <div className="post-list">
                {loading ? (
                    <div className="list-empty">로딩 중...</div>
                ) : posts.length === 0 ? (
                    <div className="list-empty">작성한 글이 없습니다.</div>
                ) : posts.map(post => (
                    <div key={post.postId} className="list-item post-item">
                        <div className="item-content">
                            <h4 className="item-title">{post.title}</h4>
                            <div className="item-meta">
                                <span className="item-date">{post.createdAt?.slice(0, 10)}</span>
                                <span className="item-stats">
                                    조회 {post.views} · 좋아요 {post.likes}
                                </span>
                            </div>
                        </div>
                        <div className="item-action">
                            <button className="view-btn" onClick={() => window.location.href = `/posts/${post.postId}`}>보기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPosts;
