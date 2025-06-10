import React from 'react';

const AdoptionInquiry = () => {
  return (
    <div className="adoption-inquiry">
      <h2>입양 문의</h2>
      <p>입양 관련 궁금한 점이 있으신가요? 아래 방법을 참고해주세요.</p>

      <ul>
        <li>입양 절차 안내</li>
        <li>입양 자격 요건</li>
        <li>방문 상담 예약</li>
        <li>입양 서류 다운로드</li>
      </ul>

      <p>자세한 사항은 고객센터로 문의 주시거나 직접 방문해주세요.</p>
      <button className="write-button" onClick={() => alert('준비 중입니다.')}>
        입양 상담 신청
      </button>
    </div>
  );
};

export default AdoptionInquiry;