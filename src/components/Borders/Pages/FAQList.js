import { useState } from 'react';
import './FAQList.css';

const dummyFaqs = [
  { id: 1, question: '입양 절차는 어떻게 되나요?', answer: '입양 절차는 상담 → 서류 작성 → 방문 순입니다.' },
  { id: 2, question: '봉사 신청은 어디서 하나요?', answer: '봉사 신청은 마이페이지 → 봉사 신청 탭에서 가능합니다.' },
  { id: 3, question: '후원은 어떻게 하나요?', answer: '후원은 후원하기 메뉴를 통해 가능합니다.' },
];

const FAQList = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="faq-list">
      {dummyFaqs.map((faq) => (
        <div key={faq.id} className="faq-item">
          <div className="faq-question" onClick={() => toggle(faq.id)}>
            <div className="faq-question-left">
              <span className="faq-label">Q</span>
              <span className="faq-text">{faq.question}</span>
            </div>
            <button
              className={`faq-toggle-button ${openId === faq.id ? 'open' : ''}`}
              aria-label="토글"
            >
              {openId === faq.id ? '▲' : '▼'}
            </button>
          </div>

          {openId === faq.id && (
            <div className="faq-answer">
              <span className="faq-label">A</span>
              <span className="faq-text">{faq.answer}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
