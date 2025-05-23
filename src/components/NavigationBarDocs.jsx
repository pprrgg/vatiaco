import React, { useMemo, useState, useEffect } from 'react';
import {
    TextField, AppBar, Box, Toolbar, List, ListItem, ListItemText, Typography,
    Divider, InputAdornment, MenuItem, Select, FormControl, InputLabel, Grid
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
            const response = await fetch(filePath); // ← ahora se usa el parámetro filePath
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
        // Actualizar sessionStorage antes de la navegación
        sessionStorage.setItem('selectedFicha', JSON.stringify(ficha));
        loadDataFromExcel(`routers/${ficha.grupo}/${ficha.sector}/${ficha.cod}.xlsx`);
        
        navigate(`/doc`);
    };

    const categoriaColores = {
        libre: alpha(theme.palette.primary.main, 0.2),
        premium: "rgba(255, 215, 0, 0.2)",
        extra: "rgba(255, 99, 71, 0.2)"
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
                                >
                                    <MenuItem value="">*</MenuItem>
                                    {availableGroups.slice(1).map(group => (
                                        <MenuItem key={group} value={group}>{group.replaceAll('_', ' ')}</MenuItem>
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
                    {filteredData.map((item) => (
                        <React.Fragment key={item.codigo}>
                            <ListItem
                                button
                                onClick={() => handleFichaClick(item)}
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: categoriaColores[item.categoria] || "white",
                                    "&:hover": {
                                        bgcolor: categoriaColores[item.categoria]
                                            ? `${categoriaColores[item.categoria]}AA`
                                            : "#f0f0f0"
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" component="span">
                                            {item.codigo.split(" ").slice(1).join(" ")}
                                        </Typography>
                                    }
                                    secondary={`${item.codigo.split(" ")[0]} / ${item.grupo.replaceAll('_', ' ')} / ${item.sector.replaceAll('_', ' ')}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <ScrollToTop />
            <ToastContainer />
        </>
    );
};

export default Fichas;
