import KoreaMapSection from "../Map/KoreaMapSection";

const MapPanel = ({
  regionList = [],
  onRegionSelect,
  selectedRegionId,
  tooltipContent,
  setTooltipContent,
  allRegionData = {},
  regionInfo,
}) => (
  <div className="map-panel">
    <div className="info-box">🗺 지역을 선택해주세요</div>
    <KoreaMapSection
      regionList={regionList}
      onRegionSelect={onRegionSelect}
      selectedRegionId={selectedRegionId}
      tooltipContent={tooltipContent}
      setTooltipContent={setTooltipContent}
      allRegionData={allRegionData}
    />
    <div className="info-box">
      {regionInfo.name
        ? `${regionInfo.name} 를 선택하였습니다.`
        : "지역을 선택해주세요"}
    </div>
  </div>
);

export default MapPanel;
