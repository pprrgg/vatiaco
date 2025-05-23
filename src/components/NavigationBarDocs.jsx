import React, { useMemo, useState, useEffect } from 'react';
import {
  TextField, AppBar, Box, Toolbar, List, ListItem, ListItemText, Typography,
  Divider, InputAdornment, MenuItem, Select, FormControl, InputLabel, Grid, ListItemIcon
} from '@mui/material';

import Catalogo from './Catalogo.json';
import ScrollToTop from './ScrollToTop';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from './firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { alpha, useTheme } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import InboxIcon from '@mui/icons-material/Inbox';

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

  return (
    <>
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

      <Box sx={{ padding: 2 }}>
        <List>
          {filteredData.map((item) => {
            const colorBase = stringToColor(item.grupo, "22");
            const hoverColor = stringToColor(item.grupo, "44");

            return (
              <React.Fragment key={item.codigo}>
                <ListItem
                  button
                  onClick={() => handleFichaClick(item)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: colorBase,
                    "&:hover": {
                      bgcolor: hoverColor
                    },
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ textAlign: 'center', width: '100%' }}
                      >
                        {item.codigo.split(" ").slice(1).join(" ")}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                        sx={{ textAlign: 'center', width: '100%', mt: 0.5 }}
                      >
                        {`${item.codigo.split(" ")[0]} / ${item.grupo.replaceAll('_', ' ')} / ${item.sector.replaceAll('_', ' ')}`}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      <ScrollToTop />
      <ToastContainer />
    </>
  );
};

export default Fichas;

