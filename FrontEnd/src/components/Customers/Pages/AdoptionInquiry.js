import { useState, useEffect } from 'react';
import { useAlert } from '../Context/AlertContext';
import './AdoptionInquiry.css';

const slideImages = [
  '/AdoptionImage/photo1.jpg',
  '/AdoptionImage/photo2.jpg',
  '/AdoptionImage/photo3.jpg',
  '/AdoptionImage/photo4.jpg',
  '/AdoptionImage/photo5.jpg',
  '/AdoptionImage/photo6.jpg',
];
const thumbnailImages = [
  '/AdoptionImage/image.png',
  // ...
];

const AdoptionInquiry = () => {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    setOpen(true);
  }, []);

  const openModal = (idx) => {
    setSlide(idx);
    setOpen(true);
    setChecked(false);
  };

  const next = () => setSlide((prev) => Math.min(prev + 1, slideImages.length - 1));
  const prev = () => setSlide((prev) => Math.max(prev - 1, 0));
  const closeModal = () => setOpen(false);

  // 체크박스
  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  // "확인" 버튼 눌렀을 때 showAlert
  const handleConfirm = async () => {
    await showAlert({
      title: "안내사항 확인 완료",
      text: "모든 안내를 확인하셨습니다.",
      imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: '좋았쓰',
      icon: "success",
    });
    setConfirmed(true);   // 확인 상태 저장
    closeModal();
  };

  return (
    <div className="adoption-inquiry">
      <h2 className="adoption-title"></h2>

      {/* 썸네일 리스트 */}
      <div className="slide-thumbnails">
        {thumbnailImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`썸네일${idx + 1}`}
            className="slide-thumb"
            // 썸네일 클릭시 특별한 행동 없음, 필요하면 팝업 띄우기 가능
          />
        ))}
      </div>

      {/* 다시 보기 버튼: confirmed면 노출 */}
      {confirmed && (
        <div style={{ textAlign: 'center', margin: '18px 0 0 0' }}>
          <button className="adopt-button" onClick={() => openModal(0)}>
            다시 보기
          </button>
        </div>
      )}

      {/* 슬라이드 팝업 모달 */}
      {open && (
        <div className="slide-modal">
          <div className="slide-modal-content">
            {/* (X 버튼 아예 없음) */}
              {confirmed && (
                <button className="close-btn" onClick={closeModal}>×</button>
              )}
            {/* 슬라이드: 버튼-이미지-버튼 */}
            <div
              className="slider-container"
              style={{
                width: 700,
                height: 700,
                margin: "0 auto",
                position: "relative",
                borderRadius: 16,
                background: "#fafcff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.13)"
              }}
            >
              {/* 메인 이미지 */}
              <img
                src={slideImages[slide]}
                alt={`사진${slide + 1}`}
                className="slide"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                  display: "block"
                }}
              />
              {/* 왼쪽 버튼 */}
              <button
                onClick={prev}
                disabled={slide === 0}
                className="slider-arrow-btn"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 16,
                  transform: "translateY(-50%)",
                  fontSize: 44,
                  background: "rgba(0,0,0,0.17)",
                  color: slide === 0 ? "#ccc" : "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  zIndex: 2,
                  cursor: slide === 0 ? "default" : "pointer",
                  transition: "color 0.18s, background 0.18s"
                }}
              >
                &lt;
              </button>
              {/* 오른쪽 버튼 */}
              <button
                onClick={next}
                disabled={slide === slideImages.length - 1}
                className="slider-arrow-btn"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 16,
                  transform: "translateY(-50%)",
                  fontSize: 44,
                  background: "rgba(0,0,0,0.17)",
                  color: slide === slideImages.length - 1 ? "#ccc" : "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  zIndex: 2,
                  cursor: slide === slideImages.length - 1 ? "default" : "pointer",
                  transition: "color 0.18s, background 0.18s"
                }}
              >
                &gt;
              </button>
            </div>

            {/* 이미지 아래 슬라이드 번호 */}
              <div style={{
                          textAlign: "center",
                          marginTop: 12,
                          fontWeight: 700,
                          fontSize: 20,
                        }}>
                          {slide + 1} / {slideImages.length}
                        </div>
                        {/* 마지막 사진에만 체크박스/확인버튼 */}
                        {slide === slideImages.length - 1 && !confirmed && (
                        <div style={{ marginTop: 24, textAlign: "center" }}>
                          <label style={{ fontWeight: "bold" }}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={handleCheckbox}
                            /> 모두 확인하셨나요?
                          </label>
                          <br />
                          <button
                            className="adopt-button"
                            style={{
                              marginTop: 8,
                              opacity: checked ? 1 : 0.5,
                              pointerEvents: checked ? 'auto' : 'none'
                            }}
                            disabled={!checked}
                            onClick={handleConfirm}
                          >확인</button>
                        </div>
                      )}

              </div>
              {/* 오버레이 클릭: confirmed면 닫힘, 아니면 무시 */}
              <div
                className="modal-overlay"
                onClick={() => {
                  if (confirmed) closeModal();
                }}
                style={{ cursor: confirmed ? "pointer" : "not-allowed" }}
              ></div>
            </div>
          )}


      {/* 기존 입양 안내 내용(그대로) */}
      <div className="steps-grid">
        {/* ...(네가 쓴 기존 안내 Steps)... */}
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
          onClick={async () => {
            await showAlert({
              title: '입양 상담 신청',
              text: '입양 상담 신청 준비 중입니다.',
              icon: 'info'
            });
          }}
        >
          📝 입양 상담 신청
        </button>
      </div>
    </div>
  );
};

export default AdoptionInquiry;
