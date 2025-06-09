

const SliderBanner = ({ slides, currentSlide, onPrev, onNext, isPlaying, togglePlay }) => (
	<div className="slider-container">
		<div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
			{slides.map((text, index) => (
				<div key={index} className="slide">{text}</div>
			))}
		</div>
		<div className="slider-buttons">
			<button onClick={onPrev}>◀</button>
			<div className="indicator-dots">
				{slides.map((_, idx) => (
					<div key={idx} className={`dot ${currentSlide === idx ? "active" : ""}`} />
				))}
			</div>
			<button onClick={onNext}>▶</button>
			<button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
		</div>
	</div>
);

export default SliderBanner;
