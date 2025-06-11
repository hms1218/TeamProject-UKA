import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QnADetail.css';

const dummyQnAs = [
  { id: 1, title: '입양 문의드립니다', content: '입양에 대해 궁금해요', author: 'user1', isSecret: false },
  { id: 2, title: '후원 관련 문의', content: '후원 문의 내용입니다.', author: 'user2', isSecret: true, password: '1234' },
  { id: 3, title: '위치가 어디인가요?', content: '서울입니다.', author: 'user3', isSecret: false },
  { id: 4, title: '마지막 질문인가요?', content: '마지막입니다.', author: 'user4', isSecret: false },
];

const QnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [qna, setQna] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    const qnaId = parseInt(id);
    const sorted = [...dummyQnAs].sort((a, b) => b.id - a.id);
    const currentIndex = sorted.findIndex((q) => q.id === qnaId);
    const current = sorted[currentIndex];

    setQna(current);
    setPrev(sorted[currentIndex - 1] || null);
    setNext(sorted[currentIndex + 1] || null);
  }, [id]);

  if (!qna) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  // 🔒 비밀글 접근 체크
  if (qna.isSecret && !window.sessionStorage.getItem(`qna_access_${qna.id}`)) {
    const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
    if (input === qna.password) {
      window.sessionStorage.setItem(`qna_access_${qna.id}`, 'true');
    } else {
      alert('❌ 비밀번호가 일치하지 않습니다.');
      navigate('/customer/qna');
      return null;
    }
  }

  const handleSecretNavigate = (post) => {
    if (post.isSecret) {
      const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
      if (input === post.password) {
        window.sessionStorage.setItem(`qna_access_${post.id}`, 'true');
        navigate(`/customer/qna/${post.id}`);
      } else {
        alert('❌ 비밀번호가 틀렸습니다.');
      }
    } else {
      navigate(`/customer/qna/${post.id}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{qna.title}</h2>
      <p>작성자: {qna.author}</p>
      <p>{qna.content}</p>

      <div className="qna-button-group">
        <button
          className="qna-button"
          onClick={() => navigate(`/customer/qna/${qna.id}/edit`, { state: qna })}
        >
          ✏️ 수정
        </button>
        <button
          className="qna-button"
          onClick={() => {
            if (window.confirm('삭제하시겠습니까?')) {
              alert('삭제 기능은 아직 구현되지 않았습니다.');
              navigate('/customer/qna');
            }
          }}
        >
          🗑 삭제
        </button>
        <button
          className="qna-button"
          onClick={() => navigate('/customer/qna')}
        >
          ← 목록으로
        </button>
      </div>

      <div className="qna-navigation">
        {prev && (
          <div className="qna-nav-item" onClick={() => navigate(`/customer/qna/${prev.id}`)}>
            <span className="qna-nav-label">◀️ 이전글</span>
            <span className="qna-nav-title">
              {prev.isSecret ? '비밀글입니다.' : prev.title}
            </span>
          </div>
        )}
        {next && (
          <div className="qna-nav-item" onClick={() => navigate(`/customer/qna/${next.id}`)}>
            <span className="qna-nav-label">▶️ 다음글</span>
            <span className="qna-nav-title">
              {next.isSecret ? '비밀글입니다.' : next.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnADetail;
