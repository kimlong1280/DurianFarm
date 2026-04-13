import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Slider from "./components/Slider";
import FarmMap from "./components/FarmMap";
import "./App.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Marquee />
      <Slider />
      <FarmMap />
      <Footer/>
    </div>
  );
}