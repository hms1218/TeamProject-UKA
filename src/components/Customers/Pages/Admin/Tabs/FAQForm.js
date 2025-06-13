import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const FAQForm = () => {
  const [title, setTitle] = useState('');
  const editorRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = editorRef.current.getInstance().getMarkdown(); // 또는 getHTML()

    console.log('📄 작성된 FAQ:', { title, content });

    alert('FAQ가 등록되었습니다.');
    navigate('/admin/faqform');
  };

  return (
    <div className="faq-form">
      <h2>📄 FAQ 글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
          />
        </div>
        <div>
          <label>내용</label><br />
          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown" // wysiwyg도 가능
            useCommandShortcut={true}
          />
        </div>
        <button type="submit" className="write-button">등록</button>
      </form>
    </div>
  );
};

export default FAQForm;
