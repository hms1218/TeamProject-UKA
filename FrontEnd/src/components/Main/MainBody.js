import { useState, useCallback, useEffect } from "react";

/* 화면 */
import OverviewPanel from "../Panel/OverviewPanel";
import MapPanel from "../Panel/MapPanel";
import SliderPanel from "../Panel/SliderPanel";

/* 데이터 */
import { MainSlides } from "../../data/constants";
// import { SidoApiData } from "../../api/AnimalCommonApiData";
import KoreaMap from "../Map/koreaMap";

/* 훅 */
import useRegionData from "../../hook/useRegionData";
import useSliderAutoPlay from "../../hook/useSliderAutoPlay";

/* 공통 */
import Loading from "../Common/Loading";
import Error from "../Common/Error";
import "./MainBody.css";

const MainBodys = () => {
    // 현재 선택된 지역 orgCd
    const [selectedRegionId, setSelectedRegionId] = useState(null);

    // OverviewPanel에서 쓸 지역 현황(기본은 전체현황)
    const [regionInfo, setRegionInfo] = useState({});
    
    // 툴팁 정보
    const [tooltipContent, setTooltipContent] = useState(null);

    // 슬라이드 관련
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // DB에서 전체 데이터 호출
    const { allRegionData, loading, error } = useRegionData();

    // 슬라이드 자동 전환 훅
    useSliderAutoPlay(isPlaying, setCurrentSlide, MainSlides.length);

    // 3. 슬라이드 전환
    const handlePrev = useCallback(() => setCurrentSlide(prev => (prev - 1 + MainSlides.length) % MainSlides.length), []);
    const handleNext = useCallback(() => setCurrentSlide(prev => (prev + 1) % MainSlides.length), []);

    // 4. 전체 데이터로 초기화 (첫 진입)
    useEffect(() => {
        if (allRegionData && Object.keys(allRegionData).length > 0) {
            setRegionInfo({ ...allRegionData }); // 전체 현황으로
        }
    }, [allRegionData]);

    // 5. 지도 지역 클릭 시
    const handleRegionSelect = (regionId) => {
        setSelectedRegionId(regionId);
        // koreaMap에서 id로 orgCd 찾기
        const region = KoreaMap.find(r => r.id === regionId);
        if (region && allRegionData[region.orgCd]) {
            setRegionInfo({ ...allRegionData[region.orgCd], name: region.orgdownNm });
        }
    };

    if (loading) return <Loading />;
    if (error) return <Error type={error.type} detail={error.detail} />;

    return (
        <div className="dashboard-container">
        <div className="dashboard-main">
            <MapPanel
            regionList={KoreaMap}
            onRegionSelect={handleRegionSelect}
            // onRegionHover={handleRegionHover}
            selectedRegionId={selectedRegionId}
            tooltipContent={tooltipContent}
            setTooltipContent={setTooltipContent}
            allRegionData={allRegionData}
            regionInfo={regionInfo}
            />
            <OverviewPanel allRegionData={allRegionData} regionInfo={regionInfo} />
        </div>
        <SliderPanel
            currentSlide={currentSlide}
            onPrev={handlePrev}
            onNext={handleNext}
            isPlaying={isPlaying}
            togglePlay={() => setIsPlaying(prev => !prev)}
        />
        </div>
    );
    };

    export default MainBodys;
