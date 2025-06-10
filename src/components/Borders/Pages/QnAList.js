import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnAList.css';

const dummyQnAs = [
  { id: 1, title: '입양 문의드립니다', author: 'user1', isSecret: false },
  { id: 2, title: '후원 관련 문의', author: 'user2', isSecret: true },
  { id: 3, title: '위치가 어디인가요?', author: 'user3', isSecret: false },
];

const QnAList = () => {
  const [qnas, setQnas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQnas(dummyQnAs); // 추후 API 대체
  }, []);

  const handleClick = (qna) => {
    if (qna.isSecret) {
      alert('🔒 비밀글입니다. 접근 권한이 필요합니다.');
      // 추후: setShowPasswordModal(true);
    } else {
      navigate(`/customer/qna/${qna.id}`);
    }
  };

  return (
    <div className="qna-container">
      <div className="qna-header">
        <h2>QnA 게시판</h2>
      </div>

      <div className="qna-list">
        {qnas.map((qna) => (
          <div key={qna.id} className="qna-item">
            {/* 🔒 자물쇠 아이콘 (시각용) */}
            <div className="lock-wrapper">
              <span className={`lock-icon ${qna.isSecret ? '' : 'lock-placeholder'}`}>
                🔒
              </span>
            </div>

            {/* 제목 클릭 시 onClick */}
            <div className="qna-title-link">
              <span
                className="qna-title-text"
                onClick={() => handleClick(qna)}
              >
                {qna.title}
              </span>
            </div>

            {/* 작성자 (클릭 불가) */}
            <span className="qna-author">작성자: {qna.author}</span>
          </div>
        ))}
      </div>

      <button className="qna-write-button" onClick={() => navigate('/customer/qna/new')}>
        ✏️ 글쓰기
      </button>
    </div>
  );
};

export default QnAList;
