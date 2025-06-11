import React from 'react';
import './AdoptionInquiry.css';

const AdoptionInquiry = () => {
  return (
    <div className="adoption-inquiry">
      <h2 className="adoption-title">입양 문의</h2>
      <div className="steps-grid">
        {/* Step 1 */}
        <div className="step-item">
          <div className="step-circle">Ⅰ</div>
          <div className="step-label">입양 절차 안내</div>
          <div className="step-description">
            <ul>
              <li>보호소 방문 및 상담</li>
              <li>입양 희망 동물 선택</li>
              <li>입양 신청서 작성</li>
              <li>입양 심사 및 승인</li>
              <li>입양 완료 및 후속 관리 안내</li>
            </ul>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-item">
          <div className="step-circle">Ⅱ</div>
          <div className="step-label">입양 자격 요건</div>
          <div className="step-description">
            <ul>
              <li>만 20세 이상 성인</li>
              <li>가족 구성원 모두 동의</li>
              <li>책임감 있는 반려생활 유지 가능자</li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-item">
          <div className="step-circle">Ⅲ</div>
          <div className="step-label">방문 상담 예약</div>
          <div className="step-description">
            <ul>
              <li>전화 및 온라인 상담 예약 가능</li>
              <li>운영 시간: 평일 10:00~17:00</li>
              <li>사전 예약 필수</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="adoption-buttons">
        <a
          href="/Files/동물입양신청서.pdf"
          className="adopt-button"
          download="동물입양신청서.pdf"
        >
          📄 입양 서류 다운로드
        </a>
        <button
          className="adopt-button"
          onClick={() => alert('입양 상담 신청 준비 중입니다.')}
        >
          📝 입양 상담 신청
        </button>
      </div>
    </div>
  );
};

export default AdoptionInquiry;
