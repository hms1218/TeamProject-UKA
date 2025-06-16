import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useQnA} from '../Context/QnAContext';
import { useRef } from 'react';
import './QnADetail.css';

const QnADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const alreadyRedirected = useRef(false);
  const [qna, setQna] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const { qnas } = useQnA();

  useEffect(() => {
    if (alreadyRedirected.current) return;
    const qnaId = parseInt(id);
    const sorted = [...qnas].sort((a, b) => b.id - a.id);
    const currentIndex = sorted.findIndex((q) => q.id === qnaId);
    const current = sorted[currentIndex];

    if (current?.isReported) {
      alreadyRedirected.current = true;
      alert("현재 관리자 검토중입니다.");
      navigate('/customer/qna');
      return;
    }

    setQna(current);
    setPrev(sorted[currentIndex - 1] || null);
    setNext(sorted[currentIndex + 1] || null);
  }, [id]);

  if (!qna) {
    return <p>게시글을 찾을 수 없습니다.</p>;
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
      <h2>
        {qna.isReported ? '[관리자 검토중입니다] ' : ''}
        {qna.title}
      </h2>
      <p>작성자: {qna.author}</p>
      <p>{qna.content}</p>

      {qna.isAnswered && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>💬 관리자 답변</h3>
          <p>{qna.answer}</p>
        </div>
      )}

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
