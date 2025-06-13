const DataReset = () => {
  return (
    <div>
      <h2>🔄 데이터 새로고침</h2>
      <p>최신 데이터를 다시 불러오려면 아래 버튼을 클릭하세요.</p>
      <button
        onClick={() => {
          if (window.confirm('데이터 새로받기는 시간이 오래걸립니다.\n새로 받으시겠습니까?')) {
            window.location.reload(); // 나중에 fetchQnAs()로 교체
          }
        }}
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
