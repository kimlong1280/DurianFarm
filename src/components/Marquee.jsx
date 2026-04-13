import "./Marquee.css";

const messages = [
  "ស្រីធា ម្ចាស់ចម្ការ ផ្លែឈើធម្មជាតិ",
  "ផ្លែឈើធម្មជាតិ 100%",
  "ស្រីធា ម្ចាស់ចម្ការ ផ្លែឈើធម្មជាតិ",
  "ផ្លែឈើធម្មជាតិ 100%",
  "ស្រីធា ម្ចាស់ចម្ការ ផ្លែឈើធម្មជាតិ",
  "ផ្លែឈើធម្មជាតិ 100%",
  
];

export default function Marquee() {
  const doubled = [...messages, ...messages];
  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {doubled.map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </div>
    </div>
  );
}