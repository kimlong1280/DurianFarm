import { useState, useEffect, useRef } from "react";
import "./Slider.css";

// ✅ Correct image import (fix GitHub issue)
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";

const slides = [
  {
    img: slide1,
    tag: "Nature",
    title: "Beautiful Landscape",
    sub: "Enjoy peaceful scenery",
  },
  {
    img: slide2,
    tag: "Travel",
    title: "Adventure Awaits",
    sub: "Explore the world",
  },
  {
    img: slide3,
    tag: "City",
    title: "Urban Lifestyle",
    sub: "Modern living experience",
  },
  {
    img: slide4,
    tag: "Ocean",
    title: "Blue Horizon",
    sub: "Relax by the sea",
  },
];

const INTERVAL = 3000;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  // Auto slide
  const startAuto = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL);
  };

  // Manual navigation
  const goTo = (index) => {
    setCurrent((index + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
    startAuto();
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="slider-wrapper">
      <div
        className="slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="slide" key={i}>
            <img src={slide.img} className="slide-img" alt={slide.title} />

            <div className="slide-overlay" />

            <div className="slide-content">
              <span className="slide-tag">{slide.tag}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-sub">{slide.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="slider-nav">
        <button className="slider-btn" onClick={() => goTo(current - 1)}>
          ←
        </button>
        <button className="slider-btn" onClick={() => goTo(current + 1)}>
          →
        </button>
      </div>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        key={progressKey}
        className="slider-progress"
        style={{ animationDuration: `${INTERVAL}ms` }}
      />
    </div>
  );
}