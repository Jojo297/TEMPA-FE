import React, { useState, useRef, useCallback, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Perbaikan Ikon Default Leaflet (PENTING untuk menampilkan ikon)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ onLocationSelect, initialPosition = null }) {
  // State untuk posisi Marker
  const [position, setPosition] = useState(initialPosition);
  // Ref untuk mengakses instance Marker Leaflet
  const markerRef = useRef(null);

  // 1. Tangani Event Klik Peta (Untuk Penempatan Awal)
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPos = [lat, lng];

      setPosition(newPos);
      onLocationSelect({ lat, lng });
    },
  });

  // 2. Tangani Event Drag Marker
  const eventHandlers = React.useMemo(
    () => ({
      // Dipanggil saat drag marker selesai
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          // Perbarui state dan kirim ke komponen induk
          setPosition([lat, lng]);
          onLocationSelect({ lat, lng });
        }
      },
    }),
    [onLocationSelect]
  );

  // Jika ada initialPosition (misalnya dari data yang sudah tersimpan), set posisi
  useEffect(() => {
    if (initialPosition && !position) {
      setPosition(initialPosition);
      // Pastikan onLocationSelect dipanggil jika ada posisi awal
      onLocationSelect({ lat: initialPosition[0], lng: initialPosition[1] });
    }
  }, [initialPosition, onLocationSelect, position]);

  // Jika posisi sudah ada, render Marker yang dapat di-drag
  return position === null ? null : (
    <Marker
      draggable={true} // <--- Kunci agar marker bisa di-drag
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}
