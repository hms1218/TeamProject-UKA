import { SidoApiData } from '../../../../../api/AnimalCommonApiData';
import { useAlert } from '../../../Context/AlertContext'; // AlertContext 위치에 맞게 import
import './AdminDetail.css';

const SIDOS = [
  { name: "전체", code: "all" },
  { name: "서울", code: "seoul" },
  { name: "인천", code: "incheon" },
  { name: "경기", code: "gyeonggi" },
  { name: "강원", code: "gangwon" },
  { name: "세종", code: "sejong" },
  { name: "대전", code: "daejeon" },
  { name: "충북", code: "chungbuk" },
  { name: "충남", code: "chungnam" },
  { name: "대구", code: "daegu" },
  { name: "광주", code: "gwangju" },
  { name: "전북", code: "jeonbuk" },
  { name: "전남", code: "jeonnam" },
  { name: "울산", code: "ulsan" },
  { name: "부산", code: "busan" },
  { name: "경북", code: "gyeongbuk" },
  { name: "경남", code: "gyeongnam" },
  { name: "제주", code: "jeju" }
];

const DataReset = () => {
  const { showAlert } = useAlert();

  const handleReset = async (sidoCode, sidoName) => {
    const result = await showAlert({
      title: `${sidoName} 데이터를 새로 불러오시겠습니까?`,
      text: '진행하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      imageUrl: process.env.PUBLIC_URL + '/img/code.jpg', // 사진도 넣고 싶으면 추가
      imageWidth: 300,
      imageHeight: 250,
      imageAlt: '코딩',
    });
    if (!result || !result.isConfirmed) return;

    try {
      await SidoApiData(sidoCode); // 필요시 파라미터 사용!
      await showAlert({
        title: `${sidoName} 데이터 불러오기 완료!`,
        imageUrl: process.env.PUBLIC_URL + '/img/goodCat.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: '좋았쓰',
        icon: 'success'
      });
    } catch (error) {
      await showAlert({
        title: `${sidoName} 데이터 불러오기 실패!`,
        text: '데이터 불러오기에 실패했습니다.',
        imageUrl: process.env.PUBLIC_URL + '/img/badCat.jpg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: '조졌쓰',
        icon: 'error'
      });
    }
  };

  return (
    <div>
      <h2>🔄 데이터 새로고침</h2>
      <p>최신 데이터를 다시 불러오려면 아래 버튼을 클릭하세요.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
        {SIDOS.map((sido) => (
          <button
            key={sido.code}
            onClick={() => handleReset(sido.code, sido.name)}
            className="data-write-btn"
            style={{
              minWidth: 95,
              padding: '8px 12px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: 7,
              marginBottom: 8,
              cursor: 'pointer'
            }}
          >
            {sido.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataReset;