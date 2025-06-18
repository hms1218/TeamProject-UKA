import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QnAEdit = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('수정이 완료되었습니다.');
    navigate(`/customer/qna/${id}`);
  };

  return (
    <div className="qna-form">
      <h2>QnA 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
          />
        </div>
        <div>
          <label>내용</label><br />
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{
              height: '200px',
              marginBottom: '24px',
              background: '#fff',
              borderRadius: '8px'
            }}
            placeholder="내용을 입력하세요"
          />
        </div>
        <button type="submit" className="customer-write-button">✅ 수정 완료</button>
      </form>
    </div>
  );
};

export default QnAEdit;
