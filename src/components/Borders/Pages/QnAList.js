import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnAList.css';

const dummyQnAs = [
  { id: 1, title: '입양 문의드립니다', author: 'user1', isSecret: false },
  { id: 2, title: '후원 관련 문의', author: 'user2', isSecret: true, password: '1234' },
  { id: 3, title: '위치가 어디인가요?', author: 'user3', isSecret: false },
];

const QnAList = () => {
  const [qnas, setQnas] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setQnas(dummyQnAs);
  }, []);

  const handleTitleClick = (qna) => {
    if (qna.isSecret) {
      setOpenId(openId === qna.id ? null : qna.id); // 토글
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
        {qnas.map((qna) => (
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

            {/* 비밀번호 입력창 */}
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

      <div className="qna-write-container">
        <button className="qna-write-button" onClick={handleWrite}>✏️ 글쓰기</button>
      </div>
    </div>
  );
};

export default QnAList;
