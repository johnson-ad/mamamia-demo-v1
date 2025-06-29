'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction de l'erreur d'icône avec typage TypeScript
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  return (
    <MapContainer 
      center={[48.8566, 2.3522]} 
      zoom={13} 
      style={{ height: '400px', width: '100%' }}
    >
      {/* Correction des props TileLayer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <Marker position={[48.8566, 2.3522]}>
        <Popup>Paris, France</Popup>
      </Marker>
    </MapContainer>
  );
}
