import React, { useEffect, useState } from 'react';

const dummyFaqs = [
  { id: 1, question: '입양 절차는 어떻게 되나요?', answer: '입양 절차는 상담 → 서류 작성 → 방문 순입니다.' },
  { id: 2, question: '봉사 신청은 어디서 하나요?', answer: '봉사 신청은 마이페이지 → 봉사 신청 탭에서 가능합니다.' },
  { id: 3, question: '후원은 어떻게 하나요?', answer: '후원은 후원하기 메뉴를 통해 가능합니다.' },
];

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null); // 드롭다운 상태 관리

  useEffect(() => {
    setFaqs(dummyFaqs);
  }, []);

  const toggleFAQ = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="faq-list">
      <h2>자주 묻는 질문 (FAQ)</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {faqs.map((faq) => (
          <li key={faq.id} className="faq-item" style={{ marginBottom: '12px', cursor: 'pointer' }}>
            <div onClick={() => toggleFAQ(faq.id)} style={{ fontWeight: 'bold' }}>
              Q. {faq.question}
            </div>
            {openId === faq.id && (
              <p style={{ marginTop: '8px', paddingLeft: '12px' }}>
                A. {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQList;