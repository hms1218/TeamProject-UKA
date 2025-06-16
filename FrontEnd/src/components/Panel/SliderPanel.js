import SliderBanner from "../../shared/SliderBanner";
import { MainSlides } from "../../data/constants";

const SliderPanel = ({
    currentSlide,
    onPrev,
    onNext,
    isPlaying,
    togglePlay,
    }) => (
        <div className="bottom-panel">
            <SliderBanner
                slides={MainSlides}
                currentSlide={currentSlide}
                onPrev={onPrev}
                onNext={onNext}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
            />
        </div>
);

export default SliderPanel;
