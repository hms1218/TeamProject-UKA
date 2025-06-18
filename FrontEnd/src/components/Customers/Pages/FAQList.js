import { useState } from 'react';
import './FAQList.css';

const dummyFaqs = [
  { id: 1, question: '입양 절차는 어떻게 되나요?', answer: '입양 절차는 상담 → 서류 작성 → 방문 순입니다.' },
  { id: 2, question: '봉사 신청은 어디서 하나요?', answer: '봉사 신청은 마이페이지 → 봉사 신청 탭에서 가능합니다.' },
  { id: 3, question: '입양 시 준비물은 무엇이 있나요?', answer: '배변패드, 침대쿠션, 밥그릇, 물그릇, 이전에 먹던 사료, 약간의 간식 등이 있습니다.' },
  { id: 4, question: '제게 맞는 견종은 어떻게 알 수 있나요?', answer: '입양하기에서 자체 진단표를 통해 확인하실 수 있습니다.' },
  { id: 5, question: '입양 시 서류는 무엇이 필요한가요?', answer: '반려동물 매매계약서를 비롯해 허가증을 보아야 합니다.' },
  { id: 6, question: '반려동물을 데려온 후 피해를 입었어요', answer: '- 데려온 날로부터 15일 이내 폐사 시\n같은 종류의 반려동물로 교환 또는 입양 비용 환불\n\n- 데려온 날로부터 15일 이내 질병 발생 시\n판매업소(사업자)가 제반 비용을 부담해서 회복시킨 후 소비자에게 인도 하는 방법이 있습니다.' },
  { id: 7, question: '반려동물 수수료는 어떻게 되나요?', answer: '- 내장형 등록 인식표｜무료~8만원(서울시 1만원)\n- 외장형 등록 인식표｜4만원 이내로 예상됩니다.' },
  { id: 8, question: '주민등록상 거주지가 아닌 곳에서도 동물등록신청이 가능한가요?', answer: '타 지역 거주민이 신청을 하는 경우에도 신청을 받은 시·군·구청에서 동물등록 처리 및 동물등록증 발급 가능합니다.' },
  { id: 9, question: '반려동물을 데려오고 나서 가족의 반대가 있어서 파양해야 할 것 같아요', answer: '반려동물 파양은 신중하게 결정해야 할 문제입니다.\n부득이한 사정으로 파양하게 될 경우 동물보호소 연락, 주변 지인에게 무료 분양 등을 활용하여 주시길 바랍니다.' },
  // { id: 10, question: '', answer: '' },
  // { id: 11, question: '', answer: '' },
  // { id: 12, question: '', answer: '' },
  // { id: 13, question: '', answer: '' },
];

const FAQList = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className='faq-container'>
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
    </div>
  );
};

export default FAQList;
