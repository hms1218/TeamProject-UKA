import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteButton.css';

const dummyQnAs = [
  { id: 1, title: '입양 문의드립니다', author: 'user1', isSecret: false },
  { id: 2, title: '후원 관련 문의', author: 'user2', isSecret: true },
  { id: 3, title: '위치가 어디인가요?', author: 'user3', isSecret: false },
];

const QnAList = () => {
  const [qnas, setQnas] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = true; // TODO: 실제 로그인 상태로 교체

  useEffect(() => {
    // 추후 API로 대체 예정
    setQnas(dummyQnAs);
  }, []);

  const handleWrite = () => {
    navigate('/customer/qna/new');
  };

  const handleClick = (id) => {
    navigate(`/customer/qna/${id}`);
  };

  return (
    <div className="qna-list">
      <h2>QnA 게시판</h2>
      <ul>
        {qnas.map((qna) => (
          <li key={qna.id} className="qna-item" onClick={() => handleClick(qna.id)}>
            {qna.isSecret && <span role="img" aria-label="lock">🔒</span>}&nbsp;
            {qna.title} - <small>{qna.author}</small>
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <button onClick={handleWrite} className="write-button">
          글쓰기
        </button>
      )}
    </div>
  );
};

export default QnAList;