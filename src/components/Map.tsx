'use client';

import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState } from 'react';

export default function MapLibreMap() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Map
        initialViewState={{
          longitude: 2.3522,
          latitude: 48.8566,
          zoom: 13,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          longitude={2.3522}
          latitude={48.8566}
          anchor="bottom"
        >
          <img
            src="/map-marker.svg"
            alt="marker"
            style={{ width: 25, height: 25, cursor: 'pointer' }}
            onClick={() => setShowPopup(true)}
          />
        </Marker>

        {showPopup && (
          <Popup
            longitude={2.3522}
            latitude={48.8566}
            onClose={() => setShowPopup(false)}
            closeOnClick={false}
          >
            <div>Paris, France</div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
