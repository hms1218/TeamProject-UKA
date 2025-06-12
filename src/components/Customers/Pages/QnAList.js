import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQnA } from '../Context/QnAContext';
import './QnAList.css';

const QnAList = () => {
  const { qnas, setQnas } = useQnA(); // 전역 상태 사용
  const [currentPage, setCurrentPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    if (qnas.length === 0) {
      const sorted = [...qnas].sort((a, b) => b.id - a.id);
      setQnas(sorted);
    }
  }, [qnas, setQnas]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentQnAs = qnas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(qnas.length / itemsPerPage);

  const handleTitleClick = (qna) => {
    if (qna.isSecret) {
      setOpenId(openId === qna.id ? null : qna.id);
    } else {
      navigate(`/customer/qna/${qna.id}`);
    }
  };

  const handlePasswordConfirm = (qna) => {
    if (inputPassword === qna.password) {
      navigate(`/customer/qna/${qna.id}`);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleWrite = () => {
    navigate('/customer/qna/new');
  };

  return (
    <div className="qna-container">
      <div className="qna-header"><h2>QnA 게시판</h2></div>

      <div className="qna-list">
        {currentQnAs.map((qna) => (
          <div key={qna.id}>
            <div className="qna-item">
              <div className="lock-wrapper">
                <span className={`lock-icon ${qna.isSecret ? '' : 'lock-placeholder'}`}>🔒</span>
              </div>

              <div className="qna-title-link">
                <span className="qna-title-text" onClick={() => handleTitleClick(qna)}>
                  {qna.title}
                </span>
              </div>

              <span className="qna-author">작성자: {qna.author}</span>
            </div>

            {openId === qna.id && qna.isSecret && (
              <div className="qna-password-box">
                <input
                  type="password"
                  maxLength="4"
                  placeholder="비밀번호 4자리"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <button onClick={() => handlePasswordConfirm(qna)}>확인</button>
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

      <div className="qna-write-container">
        <button className="qna-write-button" onClick={handleWrite}>✏️ 글쓰기</button>
      </div>
    </div>
  );
};

export default QnAList;
