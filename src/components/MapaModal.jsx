import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  zIndex: 1300,
};

function MapaModal({ open, cerrarModal }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (open) {
      // Esperar un poco para asegurar que el modal se renderice
      const timeoutId = setTimeout(() => {
        const mapContainer = document.getElementById('map');
        
        if (!mapContainer) {
          console.error("¡El contenedor del mapa no se encontró!");
          return;
        }

        // Eliminar instancias previas si existen
        if (map) {
          map.remove();
          setMap(null);
        }

        // Crear un nuevo mapa solo si el modal está abierto
        const newMap = L.map(mapContainer).setView([33, -3], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        let marker = null;
        const excelData = JSON.parse(sessionStorage.getItem('excelData'));

        if (excelData && excelData.Coordenadas) {
          const lat = excelData.Coordenadas[1][1];
          const lng = excelData.Coordenadas[2][1];
          marker = L.marker([lat, lng]).addTo(newMap)
            .bindPopup(`Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
        }

        newMap.on('click', (e) => {
          const { lat, lng } = e.latlng;
          setSelectedPoint({ lat, lng });

          const newExcelData = JSON.parse(sessionStorage.getItem('excelData')) || {};
          newExcelData.Coordenadas = [
            ["Parámetro", "Valor"],
            ["lat", lat],
            ["lng", lng],
          ];
          sessionStorage.setItem('excelData', JSON.stringify(newExcelData));

          if (marker) {
            newMap.removeLayer(marker);
          }

          marker = L.marker([lat, lng]).addTo(newMap)
            .bindPopup(`Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
        });

        setMap(newMap);
      }, 100);

      return () => clearTimeout(timeoutId);
    } else {
      // Eliminar el mapa cuando el modal se cierra
      if (map) {
        map.remove();
        setMap(null);
      }
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={cerrarModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 1300 }}
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={cerrarModal}
          sx={{
            position: 'absolute',
            right: 3,
            top: 3,
            color: 'text.primary',
          }}
        >
          <CloseIcon />
        </IconButton>
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </Box>
    </Modal>
  );
}

export default MapaModal;
