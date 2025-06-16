import { useState, useEffect } from "react";
import './MainBody.css';
import { fetchRegionData } from "../../api/AnimalApiData";
import KoreaMapSection from "../Map/KoreaMapSection";
import OverviewPanel from "../Panel/OverviewPanel";
import SliderBanner from "../../shared/SliderBanner";

const slides = [
    "🐶 강아지 입양 캠페인 중!",
    "🐱 고양이 입양 시 사료 지원!",
    "📢 센터 자원봉사자 모집 중!",
];

const MainBodys = () => {
    const [selectedRegionId, setSelectedRegionId] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);
    const [regionInfo, setRegionInfo] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleRegionSelect = async (id, name) => {
        setSelectedRegionId(id);
        try {
            const data = await fetchRegionData(id);

            // 유기동물 보호소 이름 기준으로 센터 수 계산
            const centerSet = new Set(data.map(item => item.SHTER_NM));
            const centerCount = centerSet.size;

            // 전체 동물 수
            const animalCount = data.length;
            
            const dogs = data.filter(d => d.SPECIES_NM?.includes("개")).length;
            const cats = data.filter(d => d.SPECIES_NM?.includes("고양이")).length;
            const others = animalCount - dogs - cats;

            setRegionInfo({ name, centerCount, animalCount, dogs, cats, others });
            
        } catch (error) {
            console.error("지역 데이터 불러오기 실패", error);
            setRegionInfo({ name });
        }
    };

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <div className="map-panel">
                    <div className="info-box">🗺 지역을 선택해주세요</div>
                    <KoreaMapSection onRegionSelect={handleRegionSelect}
                                     selectedRegionId={selectedRegionId}
                                     tooltipContent={tooltipContent}
                                     setTooltipContent={setTooltipContent}
                                     regionInfo={regionInfo}
                    />
                    <div className="info-box">{regionInfo.name ? `${regionInfo.name} 를 선택하였습니다.` : "지역을 선택해주세요"}</div>
                </div>
                <OverviewPanel regionInfo={regionInfo} />
            </div>

            <div className="bottom-panel">
                <SliderBanner slides={slides}
                              currentSlide={currentSlide}
                              onPrev={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                              onNext={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                              isPlaying={isPlaying}
                              togglePlay={() => setIsPlaying((prev) => !prev)}
                />
            </div>
        </div>
    );
};

export default MainBodys;
