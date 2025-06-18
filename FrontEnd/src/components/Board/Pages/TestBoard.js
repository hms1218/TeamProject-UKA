import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './TestBoard.css';

const TestBoard = () => {
    const { chats, notice, review } = useChat();
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();

    const itemsPerPage = 15;

    const noticedChats = [...notice.map(post => ({ ...post, type: 'notice' }))].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const combinedPosts = [
        ...chats.map(post => ({ ...post, type: 'chat' })),
        ...review.map(post => ({ ...post, type: 'review' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalPages = Math.ceil(combinedPosts.length / itemsPerPage);

    const currentPosts = combinedPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPageNumbers = () => {
        const maxButtons = 100;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxButtons - 1);
        if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleTitleClick = (post) => {
        if (post.isSecret) {
        setOpenId(openId === post.id ? null : post.id);
        } else {
        navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
        }
    };

    const handlePasswordConfirm = (post) => {
        if (inputPassword === post.password) {
        window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
        navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
        } else {
        alert('비밀번호가 틀렸습니다.');
        }
    };

    const handleWrite = () => {
        navigate('/board/all/new');
    };

    return (
        <div className="board-container">
        <h1 className="board-title">전체 게시판</h1>

        <div className="board-controls">
            <select>
            <option>최신순</option>
            <option>조회순</option>
            </select>
            <button className="write-btn" onClick={handleWrite}>글쓰기</button>
        </div>

        <table className="board-table">
            <thead>
            <tr>
                <th>탭</th>
                <th>제목</th>
                <th>작성자</th>
                <th>댓글</th>
                <th>조회</th>
                <th>추천</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {noticedChats.map((post) => (
                <tr key={`notice-${post.id}`} className="notice-row">
                    <td>공지사항</td>
                    <td className="title-cell" onClick={() => handleTitleClick(post)}>📢 {post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.comment}</td>
                    <td>{post.views}</td>
                    <td>{post.likes}</td>
                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                </tr>
            ))}

            {currentPosts.map((post) => (
                <>
                <tr key={`${post.type}-${post.id}`}>
                        <td>{post.type === 'chat' ? "속닥속닥" : "입양후기"}</td>
                        <td className="title-cell" onClick={() => handleTitleClick(post)}>
                        {post.isSecret ? '🔒 ' : ''}{post.title}
                        </td>
                        <td>{post.author}</td>
                        <td>{post.comment}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                        <td>{new Date(post.createdAt).toLocaleString()}</td>
                </tr>
                {openId === post.id && post.isSecret && (
                    <tr className="password-row">
                    <td colSpan="4">
                        <input
                        type="password"
                        maxLength="4"
                        placeholder="비밀번호 4자리"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        />
                        <button onClick={() => handlePasswordConfirm(post)}>확인</button>
                    </td>
                    </tr>
                )}
                </>
            ))}
            </tbody>
        </table>

        <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {getPageNumbers().map(page => (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
            >
                {page}
            </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>

        <div className="board-search">
            <div className="search-group">
                <input type="text" placeholder="검색어를 입력해주세요" />
                <button className="search-btn">검색</button>
            </div>
            <button className="write-btn-down">글쓰기</button>
        </div>
    </div>
    );
};

export default TestBoard;