import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BoardDetail.css';
import { useChat } from '../Context/ChatContext';

const AllBoardDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { chats, notice, review } = useChat();

    const [post, setPost] = useState(null);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    const postType = location.state?.postType;

    useEffect(() => {
        const postId = parseInt(id);

        // ✅ notice는 별도 처리
        if (postType === 'notice') {
            const sortedNotices = [...notice].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const idx = sortedNotices.findIndex(notice => notice.id === postId);
            const current = sortedNotices[idx];

            setPost(current);
            setPrev(sortedNotices[idx - 1] || null);
            setNext(sortedNotices[idx + 1] || null);
            return;
        }

        // ✅ chat + review만 정렬
        const combined = [
            ...chats.map(posts => ({ ...posts, type: 'chat' })),
            ...review.map(posts => ({ ...posts, type: 'review' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const idx = combined.findIndex(posts => posts.id === postId && posts.type === postType);
        const current = {...combined[idx]};

        setPost({...current});
        setPrev(combined[idx - 1] || null);
        setNext(combined[idx + 1] || null);
    }, [id, postType, notice, chats, review]);

    if (!post) {
        return <p>게시글을 찾을 수 없습니다.</p>;
    }

    // 🔒 비밀글 접근 체크
    if (post.isSecret && !window.sessionStorage.getItem(`chat_access_${post.id}`)) {
        const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
        if (input === post.password) {
            window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
        } else {
            alert('❌ 비밀번호가 일치하지 않습니다.');
            navigate('/board/all');
            return null;
        }
    }

    const handleSecretNavigate = (post) => {
        if (post.isSecret) {
        const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
            if (input === post.password) {
                window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
                navigate(`/board/all/${post.id}`, {state: { postType: post.type || 'notice' }});
            } else {
                alert('❌ 비밀번호가 틀렸습니다.');
            }
        } else {
            navigate(`/board/${post.id}`, {state: { postType: post.type || 'notice' }});
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{post.title}</h2>
            <p>작성자: {post.author}</p>
            <p>{post.content}</p>

            <div className="chat-button-group">
                <button
                className="chat-button"
                    onClick={() => navigate(`/board/all/${post.id}/edit`, { state: post })}
                >
                ✏️ 수정
                </button>
                <button
                className="chat-button"
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
                    className="chat-button"
                    onClick={() => navigate('/board/all')}
                >
                ← 목록으로
                </button>
            </div>

            <div className="chat-navigation">
            {prev && (
                <div 
                    className="chat-nav-item" 
                    onClick={() => navigate(`/board/all/${prev.id}`, {state: { postType: prev.type || 'notice' }})}
                >
                    <span className="chat-nav-label">◀️ 이전글</span>
                    <span className="chat-nav-title">
                    {prev.isSecret ? '비밀글입니다.' : prev.title}
                    </span>
                </div>
            )}
            {next && (
                <div className="chat-nav-item" onClick={() => navigate(`/board/all/${next.id}`, {state: { postType: next.type || 'notice' }})}>
                    <span className="chat-nav-label">▶️ 다음글</span>
                    <span className="chat-nav-title">
                    {next.isSecret ? '비밀글입니다.' : next.title}
                    </span>
                </div>
            )}
            </div>
        </div>
    );
};

export default AllBoardDetail;
