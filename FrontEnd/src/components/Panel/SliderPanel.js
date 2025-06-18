import SliderBanner from "../../shared/SliderBanner";
import { MainSlides } from "../../data/constants";

const SliderPanel = ({
    currentSlide,
    onPrev,
    onNext,
}) => (
    <div className="bottom-panel">
        <SliderBanner
            slides={MainSlides}
            currentSlide={currentSlide}
            onPrev={onPrev}
            onNext={onNext}
        />
    </div>
);

export default SliderPanel;
