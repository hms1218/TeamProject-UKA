const SliderBanner = ({ slides, currentSlide, onPrev, onNext, isPlaying, togglePlay }) => (
	
    <div className="slider-container">
        <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {/* slides가 undefined 또는 null이면 map이 호출되지 않음 */}
            {slides?.map((text, index) => (
                <div key={index} className="slide">{text}</div>
            ))}
        </div>
        <div className="slider-buttons">
            <button onClick={onPrev}>◀</button>
            <div className="indicator-dots">
                {/* 마찬가지로 slides가 undefined 또는 null이면 map이 호출되지 않음 */}
                {slides?.map((_, idx) => (
                    <div key={idx} className={`dot ${currentSlide === idx ? "active" : ""}`} />
                ))}
            </div>
            <button onClick={onNext}>▶</button>
            <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
        </div>
    </div>
);

export default SliderBanner;