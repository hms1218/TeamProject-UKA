import StatusCard from "./StatusCard";

const OverviewPanel = ({ allRegionData, regionInfo = {} }) => {
  const today = new Date().toISOString().split("T")[0];

  // 🔐 allRegionData가 없으면 렌더링 자체를 막자
  if (!allRegionData || !allRegionData["전체"]) {
    return <div>요약 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="info-panel">
      <div className="info-top">
        <StatusCard
          title="전체 현황판"
          date={today}
          data={allRegionData["전체"]}
        />
        <StatusCard
          title="지역 현황판"
          date={today}
          region={regionInfo.name || "지역을 선택하세요"}
          data={regionInfo}
        />
      </div>
      <div className="info-bottom">
        {/* 추가 정보, 차트 등 배치 */}
      </div>
    </div>
  );
};

export default OverviewPanel;
