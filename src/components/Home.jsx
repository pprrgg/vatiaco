import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Accordion,
  AccordionSummary,
  AccordionDetails, Divider, Link, Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import CropSquareIcon from "@mui/icons-material/CropSquare";
import FlashOnIcon from "@mui/icons-material/FlashOn"
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';

import EvStationIcon from '@mui/icons-material/EvStation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
const fuchsiaColor = "#D100D1"; // Código de color fucsia
import StarIcon from "@mui/icons-material/Star"; // Puedes cambiar por otro ícono decorativo
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import BoltIcon from "@mui/icons-material/Bolt";
import Catalogo from "./Catalogo.json";

import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SecurityIcon from '@mui/icons-material/Security';
import CopyrightIcon from '@mui/icons-material/Copyright';


const groupedData = Catalogo.reduce((acc, item) => {
  if (!acc[item.grupo]) acc[item.grupo] = [];
  acc[item.grupo].push(item);
  return acc;
}, {});


const HomePage = () => {

  const icons = [
    LanguageIcon,
    EnergySavingsLeafIcon,
    BoltIcon,
    DescriptionIcon,
    SecurityIcon,
    CopyrightIcon
  ];

  const texts = [
    <>
      <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
        Plataforma web interactiva
      </Box>
    </>,
    <>

      Dedicada a explicar, asesorar y acompañar a personas, comunidades y empresas en la comprensión y mejora de su gasto energético.
    </>,
    "Desde analizar una factura hasta evaluar la viabilidad de una instalación solar, el objetivo es ofrecer contenido claro, técnico y confiable.",
    <>
      Colección de documentos técnicos de uso libre y gratuito, personalizables en línea, para apoyar el análisis y la planificación energética.
    </>,
    "No es necesario registrarse, tampoco se almacena ni se cede la información técnica aportada."
    ,
    <>
      Licencia Creative Commons con atribución requerida.{" "}
      <Link
        href="https://creativecommons.org/licenses/by/4.0/deed.es"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        <img
          src="https://licensebuttons.net/l/by/4.0/88x31.png"
          alt="Creative Commons Attribution 4.0 License"
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
      </Link>
    </>,
  ];

  const textsIngles = [
    <>
      <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
        Interactive web platform
      </Box>
    </>,
    <>
      Dedicated to explain, advise, and support individuals, communities, and businesses in understanding and improving their energy consumption.
    </>,
    "From analyzing a bill to assessing the feasibility of a solar installation, the goal is to provide clear, technical, and reliable content.",
    <>
      A collection of technical documents is available for free use
      , customizable online, to support energy analysis and planning.
    </>,
    "No registration is required, nor is the technical information provided stored or shared."
    ,
    <>
      Creative Commons license with attribution required.{" "}
      <Link
        href="https://creativecommons.org/licenses/by/4.0/deed.en"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        <img
          src="https://licensebuttons.net/l/by/4.0/88x31.png"
          alt="Creative Commons Attribution 4.0 License"
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
      </Link>
    </>,
  ];


  // Función para generar color desde string (la defines fuera del componente)
  const stringToColor = (str, alpha = "99") => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += (`00${value.toString(16)}`).slice(-2);
    }

    return color + alpha;
  };

  const navigate = useNavigate();

  const theme = useTheme();
  const primaryColor = "#1976d2";

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  const accordionData = [
    {
      title_es: "¿Qué es un CAE?",
      title_en: "What is a CAE?",
      content_es: "Un Certificado de Ahorro Energético cuantifica mejoras energéticas.",
      content_en: "An Energy Saving Certificate quantifies energy improvements.",
      link: "/Docs",
      group: "Asesoría_Energética",
      sector: "",
      searchtext: "",
    },
    {
      title_es: "¿Con quiénes se puede crear una comunidad energética?",
      title_en: "Who can create an energy community?",
      content_es:
        "Una comunidad energética puede estar formada por ciudadanos, pymes, ayuntamientos o entidades locales que colaboran para generar, consumir y gestionar energía de forma colectiva.",
      content_en:
        "An energy community can be formed by citizens, SMEs, municipalities or local entities collaborating to collectively generate, consume, and manage energy.",
      link: "/Docs",
      group: "Con_quienes_se_puede_crear_una_comunidad_energetica",
      sector: "",
      searchtext: "",
    },
    {
      title_es: "¿Qué es una auditoría energética?",
      title_en: "What is an energy audit?",
      content_es: "Evaluación completa del consumo energético para identificar mejoras.",
      content_en: "Comprehensive evaluation of energy consumption to identify improvements.",
      link: "/Docs",
      group: "Que_es_una_auditoria_energetica",
      sector: "",
      searchtext: "",
    },
    {
      title_es: "¿Cómo optimizar la potencia contratada?",
      title_en: "How to optimize contracted power?",
      content_es: "Análisis y ajustes para reducir costos y evitar penalizaciones.",
      content_en: "Analysis and adjustments to reduce costs and avoid penalties.",
      link: "/Docs",
      group: "Como_optimizar_la_potencia_contratada",
      sector: "",
      searchtext: "",
    },
    {
      title_es: "¿Qué tecnologías puedo implementar para ahorrar energía?",
      title_en: "What technologies can I implement to save energy?",
      content_es: "LED, HVAC eficiente, almacenamiento en baterías y más.",
      content_en: "LED, efficient HVAC, battery storage and more.",
      link: "/Docs",
      group: "Que_tecnologias_puedo_implementar_para_ahorrar_energia",
      sector: "",
      searchtext: "",
    },
    {
      title_es: "¿Cómo funciona la recarga de coches eléctricos?",
      title_en: "How does electric vehicle charging work?",
      content_es: "Sistemas y recomendaciones para cargar vehículos eléctricos de forma segura.",
      content_en: "Systems and recommendations to safely charge electric vehicles.",
      link: "/Docs",
      group: "Como_funciona_la_recarga_de_coches_electricos",
      sector: "",
      searchtext: "",
    },
  ];

  // Sección informativa alternada con más temas
  const alternatingData = [
    {
      title_es: "Instalaciones Eficientes",
      title_en: "Efficient Installations",
      text_es: "Mejora el rendimiento energético de tus sistemas eléctricos.",
      text_en: "Improve the energy performance of your electrical systems.",
      image: "/img/eie010.png",
      link: "/docs/instalaciones",
    },
    {
      title_es: "Ahorro Sostenible",
      title_en: "Sustainable Savings",
      text_es: "Calcula y documenta los ahorros con nuestras plantillas.",
      text_en: "Calculate and document savings with our templates.",
      image: "/img/cae.png",
      link: "/docs/ahorro",
    },
    {
      title_es: "Auditorías Energéticas",
      title_en: "Energy Audits",
      text_es: "Diagnóstico detallado para optimizar el consumo energético.",
      text_en: "Detailed diagnosis to optimize energy consumption.",
      image: "/img/auditoria.png",
      link: "/docs/auditorias",
    },
    {
      title_es: "Gestión y Monitoreo",
      title_en: "Management & Monitoring",
      text_es: "Supervisa y analiza el uso energético en tiempo real.",
      text_en: "Monitor and analyze energy usage in real-time.",
      image: "/img/monitoring.png",
      link: "/docs/gestion-energia",
    },
    {
      title_es: "Almacenamiento de Energía",
      title_en: "Energy Storage",
      text_es: "Baterías de litio para maximizar la eficiencia y ahorro.",
      text_en: "Lithium batteries to maximize efficiency and savings.",
      image: "/img/baterias.png",
      link: "/docs/almacenamiento-baterias",
    },
    {
      title_es: "Recarga de Vehículos Eléctricos",
      title_en: "Electric Vehicle Charging",
      text_es: "Infraestructura y soluciones para movilidad eléctrica.",
      text_en: "Infrastructure and solutions for electric mobility.",
      image: "/img/ev_charging.png",
      link: "/docs/recarga-vehiculos",
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    sessionStorage.setItem("selectedGroup", selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    sessionStorage.setItem("selectedSector", selectedSector);
  }, [selectedSector]);

  useEffect(() => {
    sessionStorage.setItem("searchText", searchText);
  }, [searchText]);

  const handleButtonClick = (grupo, sector, searchtext, link) => {
    setSelectedGroup(grupo);
    setSelectedSector("");
    setSearchText("");
    navigate("/Docs");
  };


  return (
    <div>
      {1 && (<div id="carrusel">
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#f5f7ff",
            borderRadius: 2,
            position: "relative",
          }}
        >

          <Slider {...carouselSettings}>
            {Object.entries(groupedData).map(([grupo, items]) => {
              const card = items[0]; // Usa el primer ítem del grupo como representativo

              return (
                <div key={grupo}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      height: { xs: "auto", md: "400px" },
                      border: "1px solid",
                      borderColor: primaryColor,
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: stringToColor(grupo, "22"),
                      color: "white",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: stringToColor(grupo, "44"),
                      },
                    }}
                  >
                    {/* Texto y botón */}
                    <Box
                      sx={{
                        flex: 1,
                        padding: { xs: "20px", md: "20px 40px" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        textAlign: "left",
                        color: "black",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                        {card.title_es || grupo.replaceAll("_", " ")}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontStyle: "italic", mb: 1, opacity: 0.7 }}>
                        {card.title_en || ""}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {card.description_es || ""}
                      </Typography>
                      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 3, opacity: 0.7 }}>
                        {card.description_en || ""}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleButtonClick(card.grupo, card.sector, card.searchtext, card.link)
                        }
                      >
                        Ver más / See more
                      </Button>
                    </Box>

                    {/* Imagen */}
                    <Box
                      sx={{
                        flex: 1,
                        width: "100%",
                        height: { xs: "200px", md: "100%" },
                        backgroundColor: "transparent",
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={`/img/${grupo}.jpeg`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/img/default.jpeg";
                          // e.target.style.objectFit = 'contain';
                        }}
                        alt={grupo}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          clipPath: "inset(3% round 0px)",
                        }}
                      />
                    </Box>
                  </Box>
                </div>
              );
            })}
          </Slider>


        </Container>
      </div>)}

      {1 && (<div id="inicio">
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#f5f7fa",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            <Box component="span" sx={{ fontWeight: 900 }}>
              Soluciones energéticas
            </Box>{" "}
            que ahorran hoy y transforman el mañana.
          </Typography>

          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontWeight: 400, fontStyle: "italic" }}
          >
            <Box component="span" sx={{ fontWeight: 600 }}>
              Energy solutions
            </Box>{" "}
            that save today and transform tomorrow.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: 6,
              gap: 1.5,
            }}
          >
            <Divider sx={{ width: "60%" }} />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <SolarPowerIcon color="warning" fontSize="small" />
              <EnergySavingsLeafIcon color="success" fontSize="small" />
              <BoltIcon color="primary" fontSize="small" />
            </Box>

            <Divider sx={{ width: "60%" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                padding: "16px 32px", // duplicado respecto al original
                backgroundColor: "#0066cc",
                borderRadius: "16px", // duplicado
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2" // era h4
                component="div"
                sx={{
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                  fontWeight: 900,
                  textTransform: "capitalize",
                  color: "white",
                  lineHeight: 1.1,
                  letterSpacing: "0.1em", // duplicado
                }}
              >
                Vatiaco
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: "0.7rem", // duplicado desde 0.55rem
                  fontWeight: 300,
                  textTransform: "uppercase",
                  color: "white",
                  mt: "-10px", // duplicado
                  lineHeight: 1,
                  letterSpacing: "1.1em", // duplicado
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                }}
              >
                Ingenieros
              </Typography>
            </Box>
          </Box>
        </Container>
      </div>)}



      {1 && (
        <div id="descripcion">
          <Container
            sx={{
              py: 6,
              textAlign: "center",
              backgroundColor: "#f5f7fa",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 800,
                mx: "auto",
                p: 2,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 5,  // más separación vertical
                mt: 4,
                boxSizing: "border-box",
              }}
            >
              {texts.map((item, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <Card key={index} sx={{ width: "100%", p: 2, boxSizing: "border-box" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <Icon fontSize="large" />
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: '1.3rem' }}>
                      {item}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        color: "gray",
                        fontSize: "0.85rem",
                        mt: 1
                      }}
                    >
                      {textsIngles[index]}
                    </Typography>
                  </Card>
                );
              })}
            </Box>
          </Container>
        </div>
      )}


      {1 && (<div id="servicios">
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#f5f7fa",
            borderRadius: 2,
            position: "relative",
          }}
        >

          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}
          >
            Servicios / Services
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {Object.entries(groupedData).map(([grupo, items]) => {
              const card = items[0]; // Usa el primer elemento del grupo para representar la tarjeta
              return (
                <Grid item key={grupo} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() =>
                      handleButtonClick(
                        card.grupo,
                        card.sector,
                        card.searchtext,
                        card.link
                      )
                    }
                    sx={{
                      position: "relative",
                      height: "auto",
                      minHeight: 320,
                      border: "1px solid",
                      borderColor: primaryColor,
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      py: 2,
                      px: 2,
                      textAlign: "center",
                      boxSizing: "border-box",
                      backgroundColor: stringToColor(grupo, "22"),
                      color: "black",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                        backgroundColor: stringToColor(grupo, "44"),
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        mb: 2,
                        '&:hover .image-zoom': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        className="image-zoom"
                        src={`/img/${grupo}.jpeg`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/img/default.jpeg";
                          // e.target.style.objectFit = 'contain';
                        }}
                        alt={grupo}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                        {grupo.replaceAll("_", " ")}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontStyle: "italic", color: "text.secondary", mb: 2 }}
                      >
                        {card.title_en || ""}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {card.description_es || ""}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontStyle: "italic", color: "text.secondary" }}
                      >
                        {card.description_en || ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

          </Grid>
        </Container>

      </div>)}

      {1 && (<div id="faq">
        {/* Preguntas frecuentes bilingües */}
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#f5fffa",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}
          >
            Preguntas frecuentes / Frequently Asked Questions
          </Typography>

          {accordionData.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {item.title_es} / <em>{item.title_en}</em>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ mb: 1 }}>{item.content_es}</Typography>
                <Typography sx={{ fontStyle: "italic", mb: 2 }}>{item.content_en}</Typography>
                {item.link && (
                  <Button size="small" variant="outlined" href={item.link}>
                    Leer más / Read more
                  </Button>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>)}

      {0 && (<div id="informacion">
        {/* Sección informativa alternada bilingüe */}
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#fff7fa",
            borderRadius: 2,
            position: "relative",
          }}
        >

          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}
          >
            ¿Qué puedes encontrar aquí? / What can you find here?
          </Typography>
          {alternatingData.map((item, index) => (
            <Grid
              container
              spacing={4}
              alignItems="center"
              direction={index % 2 === 0 ? "row" : "row-reverse"}
              key={index}
              sx={{ mb: 4 }}
            >
              <Grid item xs={12} md={6}>
                <img
                  src={item.image}
                  alt={item.title_es}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
                <Typography variant="h5" gutterBottom>
                  {item.title_es}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontStyle: "italic", mb: 2, color: "text.secondary" }}>
                  {item.title_en}
                </Typography>
                <Typography variant="body1">{item.text_es}</Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic", mb: 2, color: "text.secondary" }}>
                  {item.text_en}
                </Typography>
                {item.link && (
                  <Button variant="contained" color="secondary" href={item.link}>
                    Saber más / Learn more
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
        </Container>
      </div>)}

      {1 && (<div id="contacto">
        <Container
          sx={{
            py: 6,
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            mt: 6,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: primaryColor, fontWeight: "bold", mb: 3 }}
            align="center"
          >
            Contáctanos / Contact Us
          </Typography>
          <Grid container spacing={4}>
            {/* Formulario de Google */}
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "100%", height: "1200px", border: 0 }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdkEMjvtRgogRAhKr2bGcf05CxZwt5LNqQKiVxWOfHciIH5lw/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Formulario de contacto"
                >
                  Cargando…
                </iframe>
              </Box>
            </Grid>

            {/* Información, mapa e imagen */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { md: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Dirección / Address:
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  C. Moby Dick, 30. 29004, Málaga
                </Typography>

                {/* Mapa de OpenStreetMap */}
                <Box sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                  <iframe
                    title="Mapa de España"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-18.0,27.5,4.5,44.5&layer=mapnik&marker=36.664204058113256,-4.4586367222617245"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </Box>

                {/* Imagen de la sede */}
                <Box>
                  <img
                    src="/img/sede.jpeg"
                    alt="Foto de la sede"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>

                {/* Teléfono y email */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Teléfono / Phone:
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    +34 951 73 34 91
                  </Typography>

                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Email:
                  </Typography>
                  <Typography variant="body1">
                    <a href="mailto:info@vatiaco.com" style={{ color: primaryColor }}>
                      info@vatiaco.com
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>)}



    </div>
  );
};

export default HomePage;
