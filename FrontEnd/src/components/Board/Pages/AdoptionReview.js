import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './BoardList.css';

const AdoptionReview = () => {
    const { review} = useChat(); // 전역 상태 사용
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();
  
    const itemsPerPage = 10;
  
	const sortedReview = [...review].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentReview = sortedReview.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(review.length / itemsPerPage);
  
    const handleTitleClick = (chat) => {
		if (chat.isSecret) {
			setOpenId(openId === chat.id ? null : chat.id);
		} else {
			navigate(`/board/adoptionReview/${chat.id}`);
		}
    };
  
    const handlePasswordConfirm = (chat) => {
		if (inputPassword === chat.password) {
			navigate(`/board/adoptionReview/${chat.id}`);
		} else {
			alert('비밀번호가 틀렸습니다.');
		}
    };
  
    const handleWrite = () => {
      	navigate('/board/adoptionReview/new');
    };
  
    return (
      	<div className="chat-container">
			<div className="chat-header"><h2>입양후기</h2></div>
	
			<div className="chat-list">
			{/* 일반게시글 */}
			{currentReview.map((review) => (
				<div key={review.id}>
				<div className="chat-item">
					<div className="lock-wrapper">
					<span className={`lock-icon ${review.isSecret ? '' : 'lock-placeholder'}`}>🔒</span>
					</div>
	
					<div className="chat-title-link">
					<span className="chat-title-text" onClick={() => handleTitleClick(review)}>
						{review.title}
					</span>
					</div>
	
					<span className="chat-author">작성자: {review.author}</span>
					<small>{new Date(review.createdAt).toLocaleString()}</small>
				</div>
	
				{openId === review.id && review.isSecret && (
					<div className="chat-password-box">
					<input
						type="password"
						maxLength="4"
						placeholder="비밀번호 4자리"
						value={inputPassword}
						onChange={(e) => setInputPassword(e.target.value)}
					/>
					<button onClick={() => handlePasswordConfirm(review)}>확인</button>
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

export default AdoptionReview;