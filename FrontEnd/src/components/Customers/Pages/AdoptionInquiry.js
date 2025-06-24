import { useState, useEffect } from 'react';
import { useAlert } from '../Context/AlertContext';
import { useAdmin } from '../../../api/AdminContext';
import './AdoptionInquiry.css';

const DEFAULT_SLIDE_IMAGES = [
  '/AdoptionImage/photo1.jpg',
  '/AdoptionImage/photo2.jpg',
  '/AdoptionImage/photo3.jpg',
  '/AdoptionImage/photo4.jpg',
  '/AdoptionImage/photo5.jpg',
  '/AdoptionImage/photo6.jpg',
];
const thumbnailImages = [
  '/AdoptionImage/image.png',
];

const AdoptionInquiry = () => {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { showAlert } = useAlert();
  const [slideImages, setSlideImages] = useState(DEFAULT_SLIDE_IMAGES);
  const [thumbnailImage, setThumbnailImage] = useState('/AdoptionImage/image.png');
  const [photoManageOpen, setPhotoManageOpen] = useState(false);
  const [photoDraft, setPhotoDraft] = useState([...slideImages]);
  

  // 관리자 테스트
  const { isAdmin } = useAdmin();

  useEffect(() => {
    setOpen(true);
  }, []);

  // 모달 열 때 photoDraft에 복사
  const openPhotoManage = () => {
    setPhotoDraft([...slideImages]); // 현재 배열 복사
    setPhotoManageOpen(true);
  };

  // "수정된 내용 있음" 체크 (배열이 다르면 true)
  const isDirty = JSON.stringify(photoDraft) !== JSON.stringify(slideImages);

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
      title: "모든 안내를 확인하셨습니다.",
      // imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg',
      // imageWidth: 300,
      // imageHeight: 300,
      // imageAlt: '좋았쓰',
      icon: "success",
    });
    setConfirmed(true);   // 확인 상태 저장
    closeModal();
  };

// 관리자 사진 저장
const handleSave = async () => {
  const result = await showAlert({
    title: '저장하시겠습니까?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '저장',
    cancelButtonText: '취소'
  });
  if (!result || !result.isConfirmed) return;
  setSlideImages(photoDraft); // 실제 반영
  setPhotoManageOpen(false);
  await showAlert({
    title: '저장되었습니다.',
    icon: 'success',
    timer: 1200,
    showConfirmButton: false
  });
};

// 관리자 사진 관리 닫기
const handleClose = async () => {
  if (JSON.stringify(photoDraft) === JSON.stringify(slideImages)) {
    setPhotoManageOpen(false); // 그냥 닫기
    return;
  }
  const result = await showAlert({
    title: '수정사항이 저장되지 않았습니다. 취소하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  });
  setPhotoManageOpen(false); // 예/아니오 모두 닫기
};

  return (
    <div className="customer-adoption-inquiry">
        {/* 썸네일 리스트 */}
        <div className="customer-slide-thumbnails">
            {thumbnailImages.map((src, idx) => (
                <img
                    key={src}
                    src={thumbnailImage}
                    alt={`썸네일${idx + 1}`}
                    className="customer-slide-thumb"
                    // 썸네일 클릭시 특별한 행동 없음, 필요하면 팝업 띄우기 가능
                />
            ))}
        </div>
        {isAdmin && (
            <div style={{ textAlign: "center", margin: "24px 0" }}>
                <button
                    className="customer-adopt-button"
                    onClick={openPhotoManage}
                >
                    팝업 사진 관리
                </button>
            </div>
        )}
        {/* 관리자만 썸네일 변경 버튼 노출 */}
        {isAdmin && (
            <div style={{ textAlign: 'center', }}>
                <label className='customer-adopt-button' style={{ fontWeight: 700, cursor: 'pointer',marginRight: '18px' }}>
                    썸네일 변경
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={e => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const url = URL.createObjectURL(file);
                        setThumbnailImage(url);
                        }}
                    />
                </label>
                {/* 저장 버튼 바로 옆에 붙이기 */}
                <label style={{ fontWeight: 700, cursor: 'pointer' }}>
                    <button className='customer-adopt-button' 
                        onClick={async () => {
                        await showAlert({
                        title: '썸네일이 저장되었습니다.',
                        imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg',   // ← 확장자 포함!
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: '좋았쓰',
                        icon: 'info'
                        });
                        }}
                    >
                        저장
                    </button>
                </label>
            </div>
        )}

        {/* 다시 보기 버튼: confirmed면 노출 */}
        <div style={{ textAlign: 'center', margin: '18px 0 0 0' }}>
            <button className="customer-adopt-button" onClick={() => openModal(0)}>
                다시 보기
            </button>
        </div>

        {/*  */}
        {photoManageOpen && (
            <div className="customer-slide-modal">
                <div className="customer-slide-modal-content">
                    <h3 style={{ marginBottom: 16, textAlign: "center" }}>팝업 사진 관리</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                        {photoDraft.map((img, idx) => (
                            <div key={idx} style={{ textAlign: "center" }}>
                                <img
                                    src={img}
                                    alt={`팝업${idx + 1}`}
                                    style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 8,
                                    objectFit: "cover",
                                    border: "1px solid #ddd",
                                    marginBottom: 8,
                                    }}
                                />
                                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                    {/* 파일 교체 */}
                                    <label style={{ fontWeight: 600, cursor: "pointer", color: "#5548c8" }}>
                                        수정
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={e => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const url = URL.createObjectURL(file);
                                            setPhotoDraft(arr => arr.map((v, i) => i === idx ? url : v));
                                            }}
                                        />
                                    </label>
                                    {/* 삭제 */}
                                    <button
                                        style={{
                                            fontWeight: 600,
                                            color: "#fff",
                                            background: "#ff7676",
                                            border: "none",
                                            borderRadius: 5,
                                            padding: "2px 10px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            setPhotoDraft(arr => arr.filter((_, i) => i !== idx))
                                        }
                                        disabled={photoDraft.length <= 1}
                                        title={photoDraft.length <= 1 ? "사진 1장은 남겨야 함" : "삭제"}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        
                        ))}
                            {/* 사진 추가 */}
                            <div style={{ textAlign: "center", width: 120 }}>
                                <label
                                style={{
                                    display: "inline-block",
                                    width: 120,
                                    height: 120,
                                    border: "2px dashed #bbb",
                                    borderRadius: 8,
                                    lineHeight: "120px",
                                    fontSize: 32,
                                    color: "#bbb",
                                    cursor: "pointer",
                                }}
                                >
                                +
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={e => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const url = URL.createObjectURL(file);
                                    setPhotoDraft(arr => [...arr, url]);
                                    }}
                                />
                                </label>
                                <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>사진 추가</div>
                            </div>
                    </div>
                        {/* 저장, 닫기 버튼 */}
                        <div style={{ textAlign: "center", marginTop: 24 }}>
                            <button
                                className="customer-adopt-button"
                                style={{ marginRight: 16 }}
                                onClick={handleSave}
                            >
                                저장
                            </button>
                            <button
                                className="customer-adopt-button"
                                onClick={handleClose}
                            >
                                닫기
                            </button>
                        </div>
                        {/* 오버레이 클릭 시 닫기 */}
                        <div
                            className="customer-modal-overlay"
                            onClick={() => setPhotoManageOpen(false)}
                            style={{ cursor: "pointer" }}
                        />
                </div>
            </div>

        )}
      {/* 슬라이드 팝업 모달 */}
      {open && (
        <div className="customer-slide-modal">
          <div className="customer-slide-modal-content">
            {/* (X 버튼: 관리자는 항상 보임, 일반은 confirmed일 때만 보임) */}
            {(isAdmin || confirmed) && (
              <button className="customer-close-btn" onClick={closeModal}>×</button>
            )}
            {/* 슬라이드: 버튼-이미지-버튼 */}
            <div
              className="customer-slider-container"
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
                className="customer-slide"
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
                className="customer-slider-arrow-btn"
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
                className="customer-slider-arrow-btn"
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
                            className="customer-adopt-button"
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
                className="customer-modal-overlay"
                onClick={() => {
                  if (confirmed) closeModal();
                }}
                style={{ cursor: confirmed ? "pointer" : "not-allowed" }}
              ></div>
            </div>
          )}

      <div className="customer-adoption-buttons">
        <a
          href="/Files/동물입양신청서.pdf"
          className="customer-adopt-button"
          download="동물입양신청서.pdf"
        >
          📄 입양 서류 다운로드
        </a>
        <button
          className="customer-adopt-button"
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
