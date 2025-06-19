import React from "react";
import "./SliderBanner.css";

const SliderBanner = ({ currentSlide, onPrev, onNext, MainSlides }) => {
    const visibleCount = 2; // 한 번에 보여줄 슬라이드 수

    return (
        <div className="main-slider-container">
            <button className="main-slider-button prev" onClick={onPrev} aria-label="Previous Slide">
                ◀
            </button>

            <div
                className="slider-content"
                style={{
                    transform: `translateX(-${currentSlide * (100 / visibleCount)}%)`,
                }}
            >
                {MainSlides.map((slide) => (
                    <div className="slide" key={slide.desertionNo}>
                        <div className="slide-image-wrapper">
                        <img
                            src={slide.popfile1}
                            alt={slide.kindNm}
                            className="slide-image"
                        />
                        </div>
                            <div className="slide-info">
                            <h3>{slide.kindFullNm}</h3>
                            <p><strong>발견장소 : </strong>{slide.happenPlace}</p>
                            <p><strong>특이사항 : </strong>{slide.specialMark}</p>
                            <p><strong>보호장소 : </strong> {slide.careAddr}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="main-slider-button next" onClick={onNext} aria-label="Next Slide">
                ▶
            </button>
        </div>
    );
};

export default SliderBanner;
