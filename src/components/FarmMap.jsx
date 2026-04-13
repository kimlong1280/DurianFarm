import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "./FarmMap.css";

const farmIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:36px;height:36px;
    background:#3B6D11;
    border:3px solid white;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

const FARM_LAT = 12.3724083;
const FARM_LNG = 105.6192632;

export default function FarmMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [address, setAddress] = useState("Fetching address...");
  const [coords, setCoords] = useState({
    lat: FARM_LAT.toFixed(4),
    lng: FARM_LNG.toFixed(4),
  });

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${FARM_LAT},${FARM_LNG}`,
      "_blank"
    );
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps?q=${FARM_LAT},${FARM_LNG}`,
      "_blank"
    );
  };

  const openWaze = () => {
    window.open(
      `https://waze.com/ul?ll=${FARM_LAT},${FARM_LNG}&navigate=yes`,
      "_blank"
    );
  };

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([FARM_LAT, FARM_LNG], 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    markerRef.current = L.marker([FARM_LAT, FARM_LNG], { icon: farmIcon })
      .addTo(map)
      .bindPopup("<strong>🌿​ ស្រីធា ម្ចាស់ចម្ការ ផ្លែឈើធម្មជាតិ </strong>")
      .openPopup();

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${FARM_LAT}&lon=${FARM_LNG}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const short = (data.display_name || "").split(",").slice(0, 4).join(",");
        setAddress(short || `${FARM_LAT}, ${FARM_LNG}`);
      })
      .catch(() => setAddress(`${FARM_LAT}, ${FARM_LNG}`));

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="map-section">
      <div className="map-section-header">
        <div>
          <h2></h2>
          <p></p>
        </div>
        <div className="coords-pill">
          
        </div>
      </div>

      <div className="map-wrapper">
        <div className="map-card">
          <div ref={mapRef} className="map-container" />
          <div className="map-footer">
            <div className="map-dot" />
            <span className="map-address">{address}</span>
          </div>

          {/* Direction Buttons */}
          <div className="direction-bar">
            <span className="direction-label">🧭 Get directions via</span>
            <div className="direction-buttons">
              <button className="dir-btn google" onClick={openDirections}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Google Maps
              </button>
              <button className="dir-btn waze" onClick={openWaze}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
                Waze
              </button>
              <button className="dir-btn osm" onClick={openGoogleMaps}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                </svg>
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}