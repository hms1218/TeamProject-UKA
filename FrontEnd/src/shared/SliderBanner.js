const SliderBanner = ({ slides, currentSlide, onPrev, onNext }) => (
	
    <div className="slider-container">
        <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides?.map((text, index) => (
                <div key={index} className="slide">{text}</div>
            ))}
        </div>
        <div className="slider-buttons">
            <button onClick={onPrev}>◀</button>
            <button onClick={onNext}>▶</button>
        </div>
    </div>
);

export default SliderBanner;
