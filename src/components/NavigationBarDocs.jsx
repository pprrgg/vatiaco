import React, { useMemo, useState, useEffect } from 'react';
import {
  Container,
  TextField, AppBar, Box, Toolbar, Typography,
  InputAdornment, MenuItem, Select, FormControl, InputLabel, Grid, Card, Divider, Accordion,
  AccordionSummary,
  AccordionDetails,
  Link
} from '@mui/material';

import Catalogo from './Catalogo.json';
import ScrollToTop from './ScrollToTop';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from './firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import InboxIcon from '@mui/icons-material/Inbox';
const fuchsiaColor = "#D100D1"; // Código de color fucsia
const primaryColor = "#1976d2";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Función para generar color desde string
const stringToColor = (str, alpha = "22") => {
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

const Fichas = () => {
  const theme = useTheme();
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(sessionStorage.getItem('searchText') || '');
  const [selectedGroup, setSelectedGroup] = useState(sessionStorage.getItem('selectedGroup') || '');
  const [selectedSector, setSelectedSector] = useState(sessionStorage.getItem('selectedSector') || '');
  const [tempSheets, setTempSheets] = useState(null);
  const navigate = useNavigate();

  const availableGroups = useMemo(() => {
    const groups = [...new Set(Catalogo.map(item => item.grupo))];
    return [''].concat(groups);
  }, []);

  useEffect(() => {
    setData(Catalogo);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedGroup', selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    sessionStorage.setItem('selectedSector', selectedSector);
  }, [selectedSector]);

  useEffect(() => {
    sessionStorage.setItem('searchText', searchText);
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setSelectedSector('');
  };

  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  const availableSectors = useMemo(() => {
    return selectedGroup
      ? ['', ...new Set(Catalogo.filter(item => item.grupo === selectedGroup).map(item => item.sector))]
      : [];
  }, [selectedGroup]);

  const filteredData = useMemo(() => {
    return Catalogo.filter(item =>
      !item.codigo.includes('jlkjldsakjflkjlkjlkjlkj987978')
    ).filter(item =>
      (!selectedGroup || item.grupo === selectedGroup) &&
      (!selectedSector || item.sector === selectedSector) &&
      (!searchText ||
        item.codigo.toLowerCase().includes(searchText) ||
        item.sector.toLowerCase().includes(searchText) ||
        item.grupo.toLowerCase().includes(searchText)
      )
    );
  }, [Catalogo, searchText, selectedGroup, selectedSector]);

  const loadDataFromExcel = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetsData = workbook.SheetNames.reduce((acc, sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        acc[sheetName] = sheet.filter(row => row.some(cell => cell != null && cell !== ""));
        return acc;
      }, {});

      sessionStorage.setItem("excelData", JSON.stringify(sheetsData));
      setTempSheets(sheetsData);
    } catch (err) {
      console.error("Error al cargar el archivo de la carpeta public", err);
    }
  };

  const handleFichaClick = (ficha) => {
    sessionStorage.setItem('selectedFicha', JSON.stringify(ficha));
    loadDataFromExcel(`routers/${ficha.grupo}/${ficha.sector}/${ficha.cod}.xlsx`);
    navigate(`/doc`);
  };


  const groupedData = useMemo(() => {
    const grouped = {};
    filteredData.forEach(item => {
      if (!grouped[item.grupo]) {
        grouped[item.grupo] = {};
      }
      if (!grouped[item.grupo][item.sector]) {
        grouped[item.grupo][item.sector] = [];
      }
      grouped[item.grupo][item.sector].push(item);
    });
    return grouped;
  }, [filteredData]);

  return (
    <>

      <div id="inicio">
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "#f5f7fa",
            borderRadius: 2,
            position: "relative",
          }}
        >

          <AppBar position="static" sx={{ bgcolor: "transparent", color: "black", width: "100%", mt: "55px" }}>
            <Toolbar>
              <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel shrink={!!selectedGroup}>Grupo</InputLabel>
                    <Select
                      value={selectedGroup}
                      onChange={handleGroupChange}
                      label="Grupo"
                      sx={{
                        bgcolor: selectedGroup ? stringToColor(selectedGroup, "22") : 'white',
                        '&:hover': {
                          bgcolor: selectedGroup ? stringToColor(selectedGroup, "44") : '#f0f0f0',
                        }
                      }}
                    >
                      <MenuItem value="">*</MenuItem>
                      {availableGroups.slice(1).map(group => (
                        <MenuItem
                          key={group}
                          value={group}
                          sx={{
                            bgcolor: stringToColor(group, "11"),
                            '&:hover': {
                              bgcolor: stringToColor(group, "33"),
                            }
                          }}
                        >
                          {group.replaceAll('_', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth disabled={!selectedGroup}>
                    <InputLabel>Subgrupo</InputLabel>
                    <Select
                      value={selectedSector}
                      onChange={handleSectorChange}
                      label="Subgrupo"
                    >
                      <MenuItem value="">*</MenuItem>
                      {availableSectors.slice(1).map(sector => (
                        <MenuItem key={sector} value={sector}>{sector.replaceAll('_', ' ')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Buscar"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Container>


      </div>

      <div id="inicio">
        <Container
          sx={{
            py: 6,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 2,
            position: "relative",
          }}
        >
          <Box sx={{ padding: 2 }}>
            {/* 🟢 MODIFICADO: iterar por grupos */}
            {Object.entries(groupedData).map(([grupo, sectores]) => {
              const groupBgColor = stringToColor(grupo, "0A"); // ← más claro

              return (
                <Box
                  key={grupo}
                  sx={{
                    mb: 6,
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: groupBgColor,
                    boxShadow: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: primaryColor,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                      whiteSpace: 'normal',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {grupo.replaceAll('_', ' ')}
                  </Typography>
                  {Object.entries(sectores).map(([sector, fichas]) => (
                    <Box
                      key={sector}
                      sx={{
                        mb: 4,
                        pl: 2,
                        py: 2,
                        backgroundColor: stringToColor(sector, "0A"), // ← más claro
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: primaryColor,
                          mb: 1,
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          whiteSpace: 'normal',
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {sector.replaceAll('_', ' ')}
                      </Typography>

                      <Grid container spacing={2} justifyContent="center">
                        {fichas.map((item) => {
                          const colorBase = stringToColor(item.grupo, "22");
                          const hoverColor = stringToColor(item.grupo, "44");

                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.codigo}>
                              <Box
                                component="div"
                                onClick={() => handleFichaClick(item)}
                                sx={{
                                  cursor: 'pointer',
                                  transition: '0.3s',
                                  '&:hover .hoverCard': {
                                    bgcolor: hoverColor,
                                  },
                                }}
                              >
                                <Card
                                  className="hoverCard"
                                  sx={{
                                    height: '100%',
                                    bgcolor: colorBase,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    padding: 1.5,
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                  }}
                                  elevation={4}
                                >
                                  <Box
                                    sx={{
                                      width: '100%',
                                      height: 70,
                                      borderRadius: 2,
                                      overflow: 'hidden',
                                      position: 'relative',
                                      mb: 1,
                                      '&:hover .image-zoom': {
                                        transform: 'scale(1.1)',
                                      }
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      className="image-zoom"
                                      src={`/img/${item.grupo}.jpeg`}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/img/default.jpeg";
                                        e.target.style.objectFit = 'contain';
                                      }}
                                      alt={item.grupo}
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

                                  <Box sx={{ px: 1, width: '100%' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: 1.2, mb: 0.5 }}>
                                    {/* {item.cod.split(" ").slice(1).join(" ")} */}
                                    {item.cod.replace(/_/g, ' ')}

                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.1, fontSize: '0.8rem' }}>
                                      {`${item.codigo.split(" ")[0]}`}
                                    </Typography>
                                  </Box>
                                </Card>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        </Container>
      </div>
      <ScrollToTop />
      <ToastContainer />
    </>
  );
};

export default Fichas;
