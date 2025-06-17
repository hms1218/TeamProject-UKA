import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './BoardList.css';

const ChatList = () => {
    const { chats} = useChat(); // 전역 상태 사용
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();
  
    const itemsPerPage = 10;
  
	const sortedChats = [...chats].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentChats = sortedChats.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(chats.length / itemsPerPage);
  
    const handleTitleClick = (chat) => {
		if (chat.isSecret) {
			setOpenId(openId === chat.id ? null : chat.id);
		} else {
			navigate(`/board/chat/${chat.id}`);
		}
    };
  
    const handlePasswordConfirm = (chat) => {
		if (inputPassword === chat.password) {
			navigate(`/board/chat/${chat.id}`);
		} else {
			alert('비밀번호가 틀렸습니다.');
		}
    };
  
    const handleWrite = () => {
      	navigate('/board/chat/new');
    };
  
    return (
      	<div className="chat-container">
			<div className="chat-header"><h2>속닥속닥</h2></div>
	
			<div className="chat-list">
			{/* 일반게시글 */}
			{currentChats.map((chat) => (
				<div key={chat.id}>
				<div className="chat-item">
					<div className="lock-wrapper">
					<span className={`lock-icon ${chat.isSecret ? '' : 'lock-placeholder'}`}>🔒</span>
					</div>
	
					<div className="chat-title-link">
					<span className="chat-title-text" onClick={() => handleTitleClick(chat)}>
						{chat.title}
					</span>
					</div>
	
					<span className="chat-author">작성자: {chat.author}</span>
					<small>{new Date(chat.createdAt).toLocaleString()}</small>
				</div>
	
				{openId === chat.id && chat.isSecret && (
					<div className="chat-password-box">
					<input
						type="password"
						maxLength="4"
						placeholder="비밀번호 4자리"
						value={inputPassword}
						onChange={(e) => setInputPassword(e.target.value)}
					/>
					<button onClick={() => handlePasswordConfirm(chat)}>확인</button>
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

export default ChatList;