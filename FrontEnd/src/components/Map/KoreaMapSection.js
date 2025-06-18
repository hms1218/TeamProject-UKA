import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const KoreaMapSection = ({
  regionList = [],           // undefined 대신 빈 배열
  onRegionSelect = () => {}, // 클릭 핸들러 기본값
  setRegionNm = null,
  tooltipContent = null,
  setTooltipContent = () => {},
  allRegionData = {},        // undefined 대신 빈 객체
}) => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 631">
      {regionList.map((city) => (
        <path
          key={city.orgCd}
          className={`${city.className} ${setRegionNm === city.orgNm ? "selected-region" : ""}`}
          d={city.d}
          stroke="#333"
          strokeWidth={0.5}
          fill="#D1E5F4"
          style={{ cursor: "pointer", outline: "none" }}
          data-tooltip-id="region-tooltip"
          onClick={() => onRegionSelect(city.orgdownNm)}
          onMouseEnter={() => {
            const regionData = allRegionData[city.orgCd] || {};
            setTooltipContent({
              name: city.orgdownNm,
              centerCount: regionData.centerCount || 0,
              animalCount: regionData.animalCount || 0,
              dogs: regionData.dogs || 0,
              cats: regionData.cats || 0,
              others: regionData.others || 0,
            });
          }}
          onMouseLeave={() => setTooltipContent(null)}
        />
      ))}
    </svg>
    <Tooltip
      id="region-tooltip"
      render={() =>
        tooltipContent ? (
          <div style={{ padding: "8px" }}>
            <strong>{tooltipContent.name}</strong>
            <p>센터 : {tooltipContent.centerCount}</p>
            <p>동물 수 : {tooltipContent.animalCount}</p>
            <p>강아지: {tooltipContent.dogs}</p>
            <p>고양이: {tooltipContent.cats}</p>
            <p>기타: {tooltipContent.others}</p>
          </div>
        ) : null
      }
    />
  </>
);

export default KoreaMapSection;
