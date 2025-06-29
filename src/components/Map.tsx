'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix l'icône manquante
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function Map() {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.8566, 2.3522]}>
        <Popup>Paris, France</Popup>
      </Marker>
    </MapContainer>
  );
}
