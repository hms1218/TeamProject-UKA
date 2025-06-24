import { useCallback } from "react";
import "./ScrollArrowButtons.css";

export default function ScrollArrowButtons() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    return (
        <div className="scroll-arrow-buttons">
            <button className="arrow-btn up" onClick={scrollToTop} aria-label="맨 위로">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <polyline points="5 12 10 7 15 12" fill="none" stroke="#222" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="arrow-btn down" onClick={scrollToBottom} aria-label="맨 아래로">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <polyline points="5 8 10 13 15 8" fill="none" stroke="#222" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
}
