import { useState, useEffect } from "react";
import "./MainBody.css";
import { fetchRegionData } from "../../api/AnimalApiData";
import KoreaMapSection from "../Map/KoreaMapSection";
import OverviewPanel from "../Panel/OverviewPanel";
import SliderBanner from "../../shared/SliderBanner";

import DogRun from "../../assets/DogRun.gif";
import CatRun from "../../assets/CatRun.gif";
import BirdFly from "../../assets/BirdFly.gif";

// 슬라이드 텍스트
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
    const [allRegionData, setAllRegionData] = useState({});

    const [loading, setLoading] = useState(true);

    // 전체 데이터 로드
    useEffect(() => {
        const loadData = async () => {
            try {
                // const allData = await fetchRegionData();
                // setAllRegionData(allData);
            } catch (error) {
                console.error("전체 데이터 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // 슬라이드 자동 전환
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    // 로딩 중 UI
    if (loading) {
        return (
            <div className="loading-container">
                <img src={DogRun} alt="로딩 중" />
                <img style={{ width:400, marginLeft : 40 }} src={CatRun} alt="로딩 중" />
                <img src={BirdFly} alt="로딩 중" />
                <p>🐾 데이터 사료를 물어오는 중이에요! 조금만 기다려주세요 🐾</p>
            </div>
        );
    }

    const handleRegionSelect = (id, name) => {
        setSelectedRegionId(id);

        const data = allRegionData[id] || [];
        const centerSet = new Set(data.map(item => item.careNm));
        const centerCount = centerSet.size;
        const animalCount = data.length;

        const dogs = data.filter(d => d.SPECIES_NM?.includes("개")).length;
        const cats = data.filter(d => d.SPECIES_NM?.includes("고양이")).length;
        const others = animalCount - dogs - cats;

        setRegionInfo({ name, centerCount, animalCount, dogs, cats, others });
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-main">
                <div className="map-panel">
                    <div className="info-box">🗺 지역을 선택해주세요</div>
                    <KoreaMapSection
                        onRegionSelect={handleRegionSelect}
                        selectedRegionId={selectedRegionId}
                        tooltipContent={tooltipContent}
                        setTooltipContent={setTooltipContent}
                        regionInfo={regionInfo}
                    />
                    <div className="info-box">
                        {regionInfo.name
                            ? `${regionInfo.name} 를 선택하였습니다.`
                            : "지역을 선택해주세요"}
                    </div>
                </div>
                <OverviewPanel regionInfo={regionInfo} />
            </div>

            <div className="bottom-panel">
                <SliderBanner
                    slides={slides}
                    currentSlide={currentSlide}
                    onPrev={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                    onNext={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                    isPlaying={isPlaying}
                    togglePlay={() => setIsPlaying(prev => !prev)}
                />
            </div>
        </div>
    );
};

export default MainBodys;
