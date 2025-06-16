import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import KoreaMap from "./koreaMap";
import test1 from '../../assets/test1.jpg';

const KoreaMapSection = ({ onRegionSelect, selectedRegionId, tooltipContent, setTooltipContent, regionInfo }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 631">
                {KoreaMap.map((city) => (
                    <path key={city.id}
                          className={`${city.className} ${selectedRegionId === city.id ? "selected-region" : ""}`}
                          d={city.d}
                          stroke="#333"
                          strokeWidth={0.5}
                          fill="#D1E5F4"
                          style={{ cursor: "pointer", outline: "none", }}
                          data-tooltip-id="region-tooltip"
                          onClick={() => onRegionSelect(city.id, city.koreaName)}
                          onMouseEnter={() => {
                              setTooltipContent({
                                  name: city.koreaName,
                                  centerCount:regionInfo.name === city.koreaName ? regionInfo.centerCount || 0 : 0,
                                  animalCount:regionInfo.name === city.koreaName ? regionInfo.animalCount || 0 : 0,
                              });
                          }}
                    />
                ))}
            </svg>

            <Tooltip id="region-tooltip" render={() => tooltipContent ? (
                <div style={{ padding: '8px' }}>
                    <strong>{tooltipContent.name}</strong>
                    <p>센터 : {tooltipContent.centerCount}</p>
                    <p>동물 수 : {tooltipContent.animalCount}</p>
                </div>
                ) : null
            }/>
        </>
    );
};

export default KoreaMapSection;
