import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">🌿</div>
            <span>ស្រីធា លក់ផ្លែឈើធម្មជាតិ</span>
          </div>
          <p className="footer-tagline">
            ដាំដុះដោយការយកចិត្តទុកដាក់ កាត់ប្រមូលផលដោយសេចក្តីស្រឡាញ់
          </p>
        </div>

        <div className="footer-info">
          <h4>Visit Us</h4>
          <ul>
            <li>📍 12.3724083,105.6192632</li>
            <li>📞 +855 90722287</li>
            <li>📞 +855 78734756</li>
          </ul>
        </div>

        <div className="footer-info">
          <h4>Quick Links</h4>
          <ul>
            <li
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=12.3724083,105.6192632`,
                  "_blank"
                )
              }
            >
              🧭 Get Directions
            </li>
            <li
              onClick={() =>
                window.open(
                  `https://waze.com/ul?ll=12.3724083,105.6192632&navigate=yes`,
                  "_blank"
                )
              }
            >
              🚗 Open in Waze
            </li>
            <li
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=12.3724083,105.6192632`,
                  "_blank"
                )
              }
            >
              🗺️ View on Google Maps
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear}. All rights reserved.</span>
        <span className="footer-made">Made with 🌱 for our community</span>
      </div>
    </footer>
  );
}