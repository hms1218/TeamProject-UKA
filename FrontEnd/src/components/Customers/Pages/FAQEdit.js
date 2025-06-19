import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useAlert } from '../Context/AlertContext';
import 'react-quill/dist/quill.snow.css';

const FAQEdit = () => {
  const { id } = useParams();
  const { state } = useLocation(); // 전달된 기존 faq 데이터
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [question, setQuestion] = useState(state?.question || '');
  const [answer, setAnswer] = useState(state?.answer || '');

    if (!state)
    return (
      <div style={{padding: '3rem', textAlign: 'center', fontSize: '1.1rem'}}>
        FAQ 데이터를 불러올 수 없습니다.<br/>
        <button
          style={{marginTop: 24, padding: '8px 22px', borderRadius: 6, fontWeight: 600, border: '1px solid #ccc'}}
          onClick={() => navigate('/customer/faq')}
        >
          FAQ 목록으로 돌아가기
        </button>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 실제 수정 API 요청 추가 필요 (fetch/axios 등)

    await showAlert({
      title: '수정 완료',
      text: 'FAQ가 성공적으로 수정되었습니다.',
      imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: '좋았쓰',
      icon: "success",
    });

    navigate(`/customer/faq`);
  };

  return (
    <div className="faq-form">
      <h2>FAQ 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>질문</label><br />
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
          />
        </div>
        <div>
          <label>답변</label><br />
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            style={{
              height: '200px',
              marginBottom: '24px',
              background: '#fff',
              borderRadius: '8px'
            }}
            placeholder="답변을 입력하세요"
          />
        </div>
        <button type="submit" className="customer-write-button">✅ 수정 완료</button>
      </form>
    </div>
  );
};

export default FAQEdit;
