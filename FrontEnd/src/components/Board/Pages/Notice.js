import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './BoardList.css';

const Notice = () => {
    const {notice} = useChat(); // 전역 상태 사용
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const navigate = useNavigate();
  
    const itemsPerPage = 10;
  
	const notices = [...notice].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentnotice = notices.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(notice.length / itemsPerPage);
  
    const handleTitleClick = (notice) => {
		if (notice.isSecret) {
			setOpenId(openId === notice.id ? null : notice.id);
		} else {
			navigate(`/board/notice/${notice.id}`);
		}
    };
  
    const handleWrite = () => {
      	navigate('/board/notice/new');
    };
  
    return (
      	<div className="chat-container">
			<div className="chat-header"><h2>공지사항</h2></div>
	
			<div className="chat-list">
			{/* ✅ 공지글 상단 고정 */}
			{currentnotice.map((notice) => (
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
  
            {/* 관리자만 보이게 설정해야함 */}
			<div className="chat-write-container">
				<button className="chat-write-button" onClick={handleWrite}>✏️ 글쓰기</button>
			</div>
      	</div>
    );
};

export default Notice;