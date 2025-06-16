import { SidoApiData } from '../../../../../api/AnimalCommonApiData';

const DataReset = () => {
  const handleReset = async () => {
    const confirmSave = window.confirm('정말 데이터를 저장하시겠습니까?');
    if (!confirmSave) return;

    try {
      await SidoApiData();
      alert('데이터 저장 완료!');
    } catch (error) {
      alert('저장 실패!');
    }
  };

  return (
    <div>
      <h2>🔄 데이터 새로고침</h2>
      <p>최신 데이터를 다시 불러오려면 아래 버튼을 클릭하세요.</p>
      <button
        onClick={handleReset}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginTop: '16px',
          cursor: 'pointer',
        }}
      >
        데이터 새로 불러오기
      </button>
    </div>
  );
};

export default DataReset;
