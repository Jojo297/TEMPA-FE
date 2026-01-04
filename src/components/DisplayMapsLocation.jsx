import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// --- PERBAIKAN IKON LEAFLET (Wajib) ---
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});
// -------------------------------------

const BATAM_CENTER = [1.13, 104.0]; // Koordinat pusat Batam

export function DisplayMapsLocation({ lat, lng }) {
  const position = lat && lng ? [lat, lng] : null;

  // Jika tidak ada posisi, jangan render peta
  if (!position) {
    return null;
  }

  return (
    <div className="p-1 rounded-md bg-[#F8FAFB] pointer-events-none">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "250px", width: "100%" }}
        className="z-0"
        dragging={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
