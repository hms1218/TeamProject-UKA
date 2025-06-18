import { useState, useCallback } from "react";

/* 화면 */
import OverviewPanel from "../Panel/OverviewPanel";
import MapPanel from "../Panel/MapPanel";
import SliderPanel from "../Panel/SliderPanel";

/* 데이터 */
import { MainSlides } from "../../data/constants";
import KoreaMap from "../Map/koreaMap";

/* 훅 */
import useRegionData from "../../hook/useRegionData";
import useSliderAutoPlay from "../../hook/useSliderAutoPlay";

/* 공통 */
import Loading from "../Common/Loading";
import Error from "../Common/Error";

/* 스타일 */
import "./MainBody.css";

const MainBodys = () => {
    // 현재 선택된 지역 orgNm
    const [regionNm, setRegionNm] = useState(null);
    
    // 툴팁 정보
    const [tooltipContent, setTooltipContent] = useState(null);

    // 슬라이드 관련
    const [currentSlide, setCurrentSlide] = useState(0);

    // DB에서 전체 데이터 호출
    const { allRegionData, regionData, loading, error } = useRegionData();

    // 슬라이드 자동 전환 훅
    useSliderAutoPlay(setCurrentSlide, MainSlides.length);

    // 슬라이드 전환
    const handlePrev = useCallback(() => setCurrentSlide(prev => (prev - 1 + MainSlides.length) % MainSlides.length), []);
    const handleNext = useCallback(() => setCurrentSlide(prev => (prev + 1) % MainSlides.length), []);

    // 지도 지역 클릭 시
    const handleRegionSelect = (orgNm) => {
        console.log("Selected Region Nm:", orgNm);
        setRegionNm(orgNm);
    };

    if (loading) return <Loading />;
    if (error) return <Error type={error.type} detail={error.detail} />;

    return (
        <div className="dashboard-container">
        <div className="dashboard-main">
            <MapPanel
                regionList={KoreaMap}
                onRegionSelect={handleRegionSelect}
                setRegionNm={setRegionNm}
                tooltipContent={tooltipContent}
                setTooltipContent={setTooltipContent}
                allRegionData={allRegionData}
            />
            <OverviewPanel 
                allRegionData={allRegionData} 
                regionData={regionData} 
                regionNm={regionNm}
                setRegionNm={setRegionNm}
                loading={loading} 
                error={error}
            />
        </div>
        <SliderPanel
            currentSlide={currentSlide}
            onPrev={handlePrev}
            onNext={handleNext}
        />
        </div>
    );
};

export default MainBodys;
