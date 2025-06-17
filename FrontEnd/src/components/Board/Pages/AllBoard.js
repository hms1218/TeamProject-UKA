import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './BoardList.css';

const AllBoard = () => {
    const { chats, notice, review} = useChat(); // 전역 상태 사용
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();
  
    const itemsPerPage = 10;
  
	//공지글 상단 고정
	const noticedChats = [...notice.map(post => ({ ...post, type: 'notice' }))].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	//일반 게시글 페이징 대상
    const combinedPosts = [
        ...chats.map((post) => ({ ...post, type: 'chat' })),
        ...review.map((post) => ({ ...post, type: 'review' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	//공지글 제외한 게시글만 페이징 계산
    
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentPosts = combinedPosts.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(combinedPosts.length / itemsPerPage);
    
 
    const handleTitleClick = (post) => {
        if (post.isSecret) {
            setOpenId(openId === post.id ? null : post.id);
        } else {
            navigate(`/board/all/${post.id}`, {state: { postType: post.type }});
        }
    };
  
    const handlePasswordConfirm = (post) => {
        if (inputPassword === post.password) {
			window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
			navigate(`/board/all/${post.id}`, {state: { postType: post.type }})
		} else {
			alert('비밀번호가 틀렸습니다.');
		}
    };

    const handleWrite = () => {
      	navigate('/board/all/new');
    };
  
    return (
      	<div className="chat-container">
			<div className="chat-header"><h2>전체</h2></div>
	
			<div className="chat-list">
			{/* ✅ 공지글 상단 고정 */}
			{noticedChats.map((notice) => (
			<div key={`notice-${notice.id}`} className="notice-item">
				<div className="notice-wrapper">
					<span className="notice-icon">📢</span>
				</div>
				<div className="chat-title-link">
					<span className="chat-title-text" onClick={() => handleTitleClick(notice)}>
						{notice.title}
					</span>
				</div>
				<span className="chat-author">작성자: {notice.author}</span>
				<small>{new Date(notice.createdAt).toLocaleString()}</small>
			</div>
			))}

			{/* 일반게시글 */}
			{currentPosts.map((post) => (
				<div key={`${post.type}-${post.id}`}>
				<div className="chat-item">
					<div className="lock-wrapper">
						<span className={`lock-icon ${post.isSecret ? '' : 'lock-placeholder'}`}>🔒</span>
					</div>
	
					<div className="chat-title-link">
						<span className="chat-title-text" onClick={() => handleTitleClick(post)}>
							{post.title}
						</span>
					</div>
	
					<span className="chat-author">작성자: {post.author}</span>
					<small>{new Date(post.createdAt).toLocaleString()}</small>
				</div>
	
				{openId === post.id && post.isSecret && (
					<div className="chat-password-box">
					<input
						type="password"
						maxLength="4"
						placeholder="비밀번호 4자리"
						value={inputPassword}
						onChange={(e) => setInputPassword(e.target.value)}
					/>
					<button onClick={() => handlePasswordConfirm(post)}>확인</button>
					</div>
				)}
				</div>
          	))}
        	</div>
  
        	{/* 페이징 버튼 */}
			<div className="pagination">
				{Array.from({ length: totalPages }, (_, idx) => (
					<button
					key={idx}
					onClick={() => setCurrentPage(idx + 1)}
					className={currentPage === idx + 1 ? 'active' : ''}
					>
					{idx + 1}
					</button>
				))}
			</div>
  
			<div className="chat-write-container">
				<button className="chat-write-button" onClick={handleWrite}>✏️ 글쓰기</button>
			</div>
      	</div>
    );
};

export default AllBoard;