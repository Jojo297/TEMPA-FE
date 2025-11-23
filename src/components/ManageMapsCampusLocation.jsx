import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

// --- DATA GEOGRAFIS BATAM ---
const BATAM_BOUNDS = [
  [1.25, 103.8], // Sudut Barat Laut
  [1.0, 104.1], // Sudut Tenggara
];

const BATAM_CENTER = [1.13, 104.0]; // Koordinat pusat Batam
// ------------------------------

function LocationMarker({ onLocationSelect, initialPosition }) {
  // Gunakan initialPosition sebagai nilai awal state
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef(null);

  // Hook untuk mendengarkan event klik
  useMapEvents({
    click(e) {
      // Pastikan e.latlng tidak null sebelum diakses
      if (e.latlng) {
        const { lat, lng } = e.latlng;
        const newPos = [lat, lng];

        setPosition(newPos);
        onLocationSelect({ lat, lng });
      }
    },
  });

  // Jika Anda ingin mengaktifkan drag:
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
          onLocationSelect({ lat, lng });
        }
      },
    }),
    [onLocationSelect]
  );

  return position === null ? null : (
    <Marker
      draggable={true} // <-- Aktifkan drag
      eventHandlers={eventHandlers} // <-- Handle dragend
      position={position}
      ref={markerRef}
    />
  );
}

export function ManageMapsCampusLocation({
  onLocationSelect,
  initialLat,
  initialLng,
}) {
  const initialPosition =
    initialLat && initialLng ? [initialLat, initialLng] : null;

  // SOLUSI UTAMA: mapCenter harus berupa koordinat tunggal
  const mapCenter = initialPosition || BATAM_CENTER;

  return (
    <div className="p-1 rounded-md bg-[#F8FAFB] ">
      <MapContainer
        // Menggunakan mapCenter yang sudah divalidasi
        center={mapCenter}
        zoom={12}
        minZoom={10}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          onLocationSelect={onLocationSelect}
          initialPosition={initialPosition}
        />
      </MapContainer>
    </div>
  );
}
