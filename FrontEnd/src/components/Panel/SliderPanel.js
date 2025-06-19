import SliderBanner from "../../shared/SliderBanner";

const SliderPanel = ({
    MainSlides,
    currentSlide,
    onPrev,
    onNext,
}) => (
    <div className="bottom-panel">
        <div className="slider-panel-title">
            <span role="img" aria-label="paw">🐾</span>
            <span className="slider-title-text">새로 들어온 동물들</span>
        </div>
        <SliderBanner
            MainSlides={MainSlides}
            currentSlide={currentSlide}
            onPrev={onPrev}
            onNext={onNext}
        />
    </div>
);

export default SliderPanel;
