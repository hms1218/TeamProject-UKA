import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useAlert } from '../../../Context/AlertContext';
import 'react-quill/dist/quill.snow.css';
import '../../WriteButton.css';
import './AdminDetail.css';

const FAQForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [faqs, setFaqs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFaqs([...faqs, { title, content }]);
    setTitle('');
    setContent('');

    // 1. 커스텀 confirm
    const result = await showAlert({
      title: 'faq를 등록하시겠습니까?',
      text: '작성한 내용을 등록할까요?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      imageUrl: process.env.PUBLIC_URL + '/img/code.jpg', // 필요하면
      imageWidth: 300,
      imageHeight: 250,
      imageAlt: '코딩',
    });

    // 2. 아니오(취소)면 그냥 리턴
    if (!result || !result.isConfirmed) return;

    // 3. 네일 때만 실제 등록
    console.log('faq 작성됨:', { title, content });

    await showAlert({
      title: '등록 완료!',
      icon: 'success',
      timer: 1500,
      imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg', // 필요하면
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: '좋았쓰',
      showConfirmButton: false,
    });

    navigate('/customer/faq');
  };

  return (
    <div className="faq-form">
      <h2>FAQ 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div className="faq-form-title">
          <label>제목</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label><br />
          {/* Quill 에디터로 대체 */}
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
        <button type="submit" className="customer-write-button">등록</button>
      </form>
    </div>
  );
};

export default FAQForm;