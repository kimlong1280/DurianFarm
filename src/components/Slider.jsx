import { useState, useEffect, useRef } from "react";
import "./Slider.css";

const slides = [
  {
    img: "/src/assets/slide1.jpg",
    
  },
  {
    img: "/src/assets/slide2.jpg",
    
  },
  {
    img: "/src/assets/slide3.jpg",
    
  },
  {
    img: "/src/assets/slide4.jpg",
   
  },
];

const INTERVAL = 3000;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL);
  };

  const goTo = (idx) => {
    setCurrent((idx + slides.length) % slides.length);
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
            <img className="slide-img" src={slide.img} alt={slide.title} />
            <div className="slide-overlay" />
            <div className="slide-content">
              <span className="slide-tag">{slide.tag}</span>
              <div className="slide-title">{slide.title}</div>
              <div className="slide-sub">{slide.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-nav">
        <button className="slider-btn" onClick={() => goTo(current - 1)}>←</button>
        <button className="slider-btn" onClick={() => goTo(current + 1)}>→</button>
      </div>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div key={progressKey} className="slider-progress"
        style={{ animationDuration: `${INTERVAL}ms` }} />
    </div>
  );
}