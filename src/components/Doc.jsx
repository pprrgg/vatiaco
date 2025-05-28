import React, { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseConfig";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import {
  Box,
  Tooltip,
  Backdrop,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import config from "./configURL";
import XLSXUploaderStoragePrecargaxDefectoHojaModal from "./XLSXUploaderStoragePrecargaxDefectoHojaModal";
import TuneIcon from "@mui/icons-material/Tune";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
pdfjsLib.GlobalWorkerOptions.workerSrc = `/workers/3.11.174/pdf.worker.min.js`;

const PDFRenderer = () => {
  const capitalizar = (str) => {
    if (!str) return "";
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const ep = JSON.parse(sessionStorage.getItem("selectedFicha") || "null");
  const ENDPOINT = `${ep.grupo}/${ep.sector}/${ep.cod}/f`;

  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);

  const [openx, setOpenx] = useState(false);
  const abrirModalx = useCallback(() => setOpenx(true), []);
  const cerrarModalx = useCallback(() => setOpenx(false), []);

  const mensajes = [
    "Conectando al servidor, por favor espere...",
    "Conectando al servidor, por favor espere...",
    "Cargando las primeras configuraciones...",
    "Conectando al servidor, por favor espere...",
    "Cargando las primeras configuraciones...",
    "Inicializando el proceso de simulación...",
    "Verificando los datos iniciales...",
    "Simulando operación, esto tomará unos segundos...",
    "Procesando información en segundo plano...",
    "Generando el documento solicitado...",
    "Aplicando formato y realizando validaciones...",
    "Revisando errores y completando los últimos detalles...",
    "Cargando resultados finales y finalizando el proceso...",
    "Estableciendo comunicación segura con el servidor...",
    "Optimización de parámetros en curso...",
    "Consolidando datos para la presentación...",
    "Finalizando tareas pendientes y liberando recursos...",
  ];

  const [textoActual, setTextoActual] = useState(mensajes[0]);

  useEffect(() => {
    if (!loading) return;

    let index = 0;
    let intervaloId;

    const cambiarTexto = () => {
      index = (index + 1) % mensajes.length;
      setTextoActual(mensajes[index]);
      const tiempoAleatorio = Math.floor(Math.random() * 3000) + 10;
      intervaloId = setTimeout(cambiarTexto, tiempoAleatorio);
    };

    cambiarTexto();

    return () => clearTimeout(intervaloId);
  }, [loading]);

  const getExcelDataFromSessionStorage = () => {
    const data = sessionStorage.getItem("excelData");
    try {
      return data ? JSON.parse(data) : {};
    } catch (err) {
      console.error("Error al parsear excelData desde sessionStorage:", err);
      return {};
    }
  };

  const renderPdfBlob = useCallback(async (arrayBuffer) => {
    try {
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      if (pdf.numPages === 0) throw new Error("El PDF no tiene páginas");

      const pages = await Promise.all(
        Array.from({ length: pdf.numPages }, async (_, i) => {
          const page = await pdf.getPage(i + 1);
          const viewport = page.getViewport({ scale: 2.5 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page
            .render({
              canvasContext: canvas.getContext("2d"),
              viewport,
            })
            .promise;
          return canvas.toDataURL("image/png");
        })
      );

      setPdfBlob(blob); // ✅ solo seteamos si todo lo anterior salió bien
      setImages(pages);
    } catch (err) {
      setError(`Error al renderizar el PDF: ${err.message}`);
    }
  }, []);


  const renderLocalPdf = useCallback(async () => {
    setLoading(true);
    try {
      console.log(`/routers/${ENDPOINT.slice(0, -2)}.pdf`)
      const response = await fetch(`/routers/${ENDPOINT.slice(0, -2)}.pdf`);
      const arrayBuffer = await response.arrayBuffer();
      await renderPdfBlob(arrayBuffer);
    } catch (err) {
      setError(`Error al cargar PDF local: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [renderPdfBlob]);

  const renderPdfFromUrl = useCallback(async () => {
    setLoading(true);
    const parametros = getExcelDataFromSessionStorage();
    const PDF_API_URL = `${config.API_URL}/${ENDPOINT}?timestamp=${new Date().getTime()}`;

    try {
      const response = await axios.post(PDF_API_URL, parametros, {
        responseType: "arraybuffer",
      });

      if (response.status !== 200) {
        throw new Error("Error al obtener el PDF desde la API");
      }

      await renderPdfBlob(response.data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [ENDPOINT, renderPdfBlob]);

  useEffect(() => {
    renderLocalPdf();
  }, [renderLocalPdf]);

  const handleDownload = () => {
    if (!pdfBlob) return;

    const ep = JSON.parse(sessionStorage.getItem('selectedFicha') || 'null');
    const fileName = `WB_${ep?.cod || 'documento'}.pdf`;

    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRecalculate = async () => {
    setLoading(true);         // mostramos el loader
    cerrarModalx();           // cerramos el modal

    try {
      await renderPdfFromUrl(); // hacemos la llamada a la API
    } catch (err) {
      setError(`Error al recalcular: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ position: "relative" }}>
      <Backdrop open={loading} style={{ zIndex: 1201, color: "#000" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ color: "white", marginTop: 2 }}>
            {textoActual}
          </Typography>
        </div>
      </Backdrop>

      {error && (
        <Typography align="center" color="error">
          {error}
        </Typography>
      )}

      {pdfBlob && (
        <>
          <Tooltip title='Descargar en pdf'>
            <Button
              variant="outlined"
              onClick={handleDownload}
              style={{
                position: "fixed",
                top: "120px",
                right: "16px",
                zIndex: 1300,
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                borderRadius: "18px",
                minWidth: "48px",
                padding: "8px",
              }}
            >
              <PictureAsPdfIcon style={{ color: "#d32f2f" }} />
            </Button>
          </Tooltip>

          <Tooltip title='Ajustar las variables'>
            <Button
              variant="outlined"
              color="secondary"
              onClick={abrirModalx}
              style={{
                position: "fixed",
                top: "200px",
                right: "16px",
                zIndex: 1300,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "18px",
                minWidth: "48px",
                padding: "8px",
              }}
            >
              <TuneIcon />
            </Button>
          </Tooltip>

        </>
      )}

      <Box display="flex" flexDirection="column" alignItems="flex-start">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Página ${index + 1}`}
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          />
        ))}
      </Box>

      <XLSXUploaderStoragePrecargaxDefectoHojaModal
        openx={openx}
        cerrarModalx={cerrarModalx}
        handleRecalculate={handleRecalculate}
      />

      <ToastContainer />

    </div>
  );
};

export default PDFRenderer;
