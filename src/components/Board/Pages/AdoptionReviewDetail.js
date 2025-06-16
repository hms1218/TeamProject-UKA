import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ChatDetail.css';

const dummyAdoptionDetail = [
  { id: 1, title: '후기공지1', content: '공지합니다.', author: '관리자', isSecret: false},
  { id: 2, title: '후기공지2', content: '공지합니다.', author: '관리자', isSecret: true, password: '1234' },
  { id: 3, title: '후기공지3', content: '공지합니다', author: '관리자', isSecret: false },
  { id: 4, title: '후기공지4', content: '공지합니다.', author: '관리자', isSecret: false},
  { id: 5, title: '후기공지5', content: '공지합니다.', author: '관리자', isSecret: true, password: '1234' },
  { id: 6, title: '후기공지6', content: '공지합니다', author: '관리자', isSecret: false },
  { id: 7, title: '후기공지7', content: '공지합니다.', author: '관리자', isSecret: false},
  { id: 8, title: '후기공지8', content: '공지합니다.', author: '관리자', isSecret: true, password: '1234' },
  { id: 9, title: '후기공지9', content: '공지합니다', author: '관리자', isSecret: false },
  { id: 10, title: '후기공지10', content: '공지합니다', author: '관리자', isSecret: false },
  { id: 11, title: '후기공지11', content: '공지합니다', author: '관리자', isSecret: false },
];

const AdoptionReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
        const reviewId = parseInt(id);
        const sorted = [...dummyAdoptionDetail].sort((a, b) => b.id - a.id);
        const currentIndex = sorted.findIndex((q) => q.id === reviewId);
        const current = sorted[currentIndex];

        setReview(current);
        setPrev(sorted[currentIndex - 1] || null);
        setNext(sorted[currentIndex + 1] || null);
    }, [id]);

    if (!review) {
        return <p>게시글을 찾을 수 없습니다.</p>;
    } 

  // 🔒 비밀글 접근 체크
    if (review.isSecret && !window.sessionStorage.getItem(`chat_access_${review.id}`)) {
        const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
        if (input === review.password) {
            window.sessionStorage.setItem(`chat_access_${review.id}`, 'true');
        } else {
            alert('❌ 비밀번호가 일치하지 않습니다.');
            navigate('/board/adoptionReview');
            return null;
        }
  }

  const handleSecretNavigate = (post) => {
    if (post.isSecret) {
        const input = prompt('🔒 비밀글입니다. 비밀번호를 입력해주세요');
        if (input === post.password) {
            window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
            navigate(`/board/adoptionReview/${post.id}`);
        } else {
            alert('❌ 비밀번호가 틀렸습니다.');
        }
    } else {
        navigate(`/board/adoptionReview/${post.id}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
        <h2>{review.title}</h2>
        <p>작성자: {review.author}</p>
        <p>{review.content}</p>

        <div className="chat-button-group">
            <button
                className="chat-button"
                onClick={() => navigate(`/customer/qna/${review.id}/edit`, { state: review })}
                >
            ✏️ 수정
            </button>
            <button
            className="chat-button"
            onClick={() => {
                if (window.confirm('삭제하시겠습니까?')) {
                alert('삭제 기능은 아직 구현되지 않았습니다.');
                navigate('/board/adoptionReview');
                }
            }}
            >
            🗑 삭제
            </button>
            <button
            className="chat-button"
            onClick={() => navigate('/board/adoptionReview')}
            >
            ← 목록으로
            </button>
      </div>

      <div className="chat-navigation">
            {prev && (
            <div className="chat-nav-item" onClick={() => navigate(`/board/adoptionReview/${prev.id}`)}>
                <span className="chat-nav-label">◀️ 이전글</span>
                <span className="chat-nav-title">
                {prev.isSecret ? '비밀글입니다.' : prev.title}
                </span>
            </div>
            )}
            {next && (
            <div className="chat-nav-item" onClick={() => navigate(`/board/adoptionReview/${next.id}`)}>
                <span className="chat-nav-label">▶️ 다음글</span>
                <span className="chat-nav-title">
                {next.isSecret ? '비밀글입니다.' : next.title}
                </span>
            </div>
            )}
        </div>
    </div>
  );
};

export default AdoptionReviewDetail;
