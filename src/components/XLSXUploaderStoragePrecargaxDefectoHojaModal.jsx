import React, { useState, useEffect } from "react";
import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    IconButton,
    Menu,
    MenuItem,
    Tabs,
    Tab,
    Backdrop,
    Select,
    AppBar,
    Toolbar,
    Container,
    useMediaQuery,
} from "@mui/material";

import * as XLSX from "xlsx";
import {
    Calculate as CalculateIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
    CloudDownload as CloudDownloadIcon,
    CloudUpload as CloudUploadIcon,
    Map as MapIcon,
} from "@mui/icons-material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapaModal from "./MapaModal";

const ExcelUploaderStorage = ({ openx, cerrarModalx, handleRecalculate }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMobile = useMediaQuery("(max-width: 600px)");
    const [activeTab, setActiveTab] = useState(0);
    const [openMapaModal, setOpenMapaModal] = useState(false);
    const [excelDataFromSession, setExcelDataFromSession] = useState(null);
    const formattedDate = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, "");

    useEffect(() => {
        const sessionData = sessionStorage.getItem("excelData");
        if (sessionData) {
            setExcelDataFromSession(JSON.parse(sessionData));
        }
    }, [openx]);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleTabChange = (event, newValue) => setActiveTab(newValue);
    const handleOpenMapaModal = () => setOpenMapaModal(true);
    const handleCloseMapaModal = () => setOpenMapaModal(false);
    const handleFileUpload = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetsData = {};

            workbook.SheetNames.forEach((sheetName) => {
                const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
                const filledSheet = sheet.map((row) => row.map((cell) => (cell === null || cell === undefined ? " " : cell)));
                const filteredSheet = filledSheet.filter((row) => row.some((cell) => cell !== ""));
                sheetsData[sheetName] = filteredSheet;
            });

            // Guardar los datos originales sin modificar
            sessionStorage.setItem("excelData", JSON.stringify(sheetsData));
            setExcelDataFromSession(sheetsData);
            toast.success("¡Archivo cargado correctamente!");
        };

        reader.readAsArrayBuffer(file);
    };

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    const handleImportar = () => {
        const ep = JSON.parse(sessionStorage.getItem('selectedFicha') || 'null');

        if (!ep || !ep.cod) {
            toast.error("No se encontró el código de referencia para validar el archivo.");
            return;
        }

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".xlsx, .xls";
        fileInput.style.display = "none";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];

            if (!file || !file.name.toLowerCase().includes(ep.cod.toLowerCase())) {
                toast.error(`El archivo debe ser 'WB_${ep.cod}_******** '.`);
                document.body.removeChild(fileInput);
                return;
            }

            handleFileUpload(file);
            document.body.removeChild(fileInput);
        });

        document.body.appendChild(fileInput);
        fileInput.click();
    };

    const handleExport = () => {
        const sessionData = JSON.parse(sessionStorage.getItem("excelData"));
        const wb = XLSX.utils.book_new();

        Object.keys(sessionData).forEach((sheetName) => {
            const sheetData = sessionData[sheetName];
            const ws = XLSX.utils.aoa_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        const ep = JSON.parse(sessionStorage.getItem('selectedFicha') || 'null');
        const fileName = `WB_${ep.cod}_${formattedDate}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    const handleCellEdit = (rowIndex, columnIndex, value, activeSheet) => {
        if (value.trim() === "") return;

        const updatedData = [...excelDataFromSession[activeSheet]];
        updatedData[rowIndex + 1][columnIndex] = value;

        const updatedSheets = { ...excelDataFromSession, [activeSheet]: updatedData };
        setExcelDataFromSession(updatedSheets);
        sessionStorage.setItem("excelData", JSON.stringify(updatedSheets));
    };

    const activeSheet = excelDataFromSession ? Object.keys(excelDataFromSession)[activeTab] : null;

    const columns = React.useMemo(() => {
        if (excelDataFromSession && activeSheet && excelDataFromSession[activeSheet]?.length > 0) {
            return excelDataFromSession[activeSheet][0].map((_, index) => ({
                Header: excelDataFromSession[activeSheet][0][index],
                accessor: index.toString(),
            }));
        }
        return [];
    }, [activeSheet, excelDataFromSession]);

    const data = React.useMemo(() => {
        if (excelDataFromSession && activeSheet) {
            return excelDataFromSession[activeSheet]?.slice(1) || [];
        }
        return [];
    }, [activeSheet, excelDataFromSession]);

    const menuOptions = [
        { label: "Importar", icon: <CloudUploadIcon />, onClick: handleImportar, bgColor: '#388e3c' }, // azul
        { label: "Exportar", icon: <CloudDownloadIcon />, onClick: handleExport, bgColor: '#388e3c' }, // verde
        { label: "Ubicación", icon: <MapIcon />, onClick: handleOpenMapaModal, bgColor: '#fbc02d' }, // amarillo
        { label: "Calcular", icon: <CalculateIcon />, onClick: handleRecalculate, bgColor: '#d32f2f' }, // rojo
    ];


    return (
        <>
            <Modal open={openx} onClose={cerrarModalx} BackdropComponent={Backdrop} BackdropProps={{ onClick: cerrarModalx }}>
                <Box
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        const ep = JSON.parse(sessionStorage.getItem('selectedFicha') || 'null');
                    
                        if (!file) return;
                    
                        if (!file.name.toLowerCase().endsWith(".xlsx") && !file.name.toLowerCase().endsWith(".xls")) {
                            toast.error("Sólo se permiten archivos Excel (.xlsx, .xls)");
                            return;
                        }
                    
                        if (!ep || !ep.cod) {
                            toast.error("No se encontró el código de referencia para validar el archivo.");
                            return;
                        }
                    
                        if (!file.name.toLowerCase().includes(ep.cod.toLowerCase())) {
                            toast.error(`El archivo debe ser 'WB_${ep.cod}_******** '.`);
                            return;
                        }
                    
                        handleFileUpload(file);
                    }}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        height: "90%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        overflowY: "auto",
                        // border: "2px dashed #aaa", // Opcional: para mostrar que se puede soltar
                    }}
                >
                    <IconButton
                        onClick={cerrarModalx}
                        sx={{
                            position: "absolute",
                            top: 3,
                            right: 3,
                            zIndex: 10,
                            color: "grey.700"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <AppBar position="static" sx={{ mb: 2, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {isMobile ? (
                                    <>
                                        <IconButton edge="start" color="black" onClick={handleMenuOpen}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                            {menuOptions.map((option, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={option.onClick}
                                                    sx={{
                                                        backgroundColor: option.bgColor,
                                                        color: "white",
                                                        "&:hover": {
                                                            backgroundColor: option.bgColor,
                                                            opacity: 0.85,
                                                        },
                                                    }}
                                                >
                                                    {option.icon}
                                                    <span style={{ marginLeft: "8px" }}>{option.label}</span>
                                                </Button>
                                            ))}

                                        </Menu>
                                    </>
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {menuOptions.map((option, index) => (
                                            <Button
                                                key={index}
                                                onClick={option.onClick}
                                                sx={{
                                                    backgroundColor: option.bgColor,
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: option.bgColor,
                                                        opacity: 0.85,
                                                    },
                                                }}
                                            >
                                                {option.icon}
                                                <span style={{ marginLeft: "8px" }}>{option.label}</span>
                                            </Button>
                                        ))}

                                    </Box>
                                )}
                                <Box sx={{ flexGrow: 1 }} />
                            </Toolbar>
                        </Container>
                    </AppBar>

                    {excelDataFromSession && (
                        <>
                            <Box sx={{ overflowX: 'auto' }}>
                                <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                                    {Object.keys(excelDataFromSession)
                                        .filter(sheet => sheet !== sheet.toUpperCase())
                                        .map((sheet, index) => (
                                            <Tab key={index} label={sheet} />
                                        ))}
                                </Tabs>
                            </Box>

                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.accessor} sx={{ fontWeight: "bold", textAlign: "center" }}>
                                                    {column.Header}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {row.map((cell, cellIndex) => {
                                                    const original = JSON.parse(sessionStorage.getItem("excelData"));
                                                    const originalRow = original[activeSheet]?.[rowIndex + 1];
                                                    const originalCell = originalRow ? originalRow[cellIndex] : null;
                                                    const isCommaSeparated = typeof originalCell === 'string' && originalCell.includes(';');
                                                    const options = isCommaSeparated ? originalCell.split(';') : [];

                                                    return (
                                                        <TableCell key={cellIndex}>
                                                            {isCommaSeparated ? (
                                                                <Select
                                                                    value={originalCell.split(';')[0].trim()}
                                                                    onChange={(e) => {
                                                                        const selected = e.target.value;

                                                                        const sessionData = JSON.parse(sessionStorage.getItem("excelData"));
                                                                        const sheetData = [...sessionData[activeSheet]];

                                                                        const currentOriginalCell = sheetData[rowIndex + 1][cellIndex];

                                                                        const allOptions = currentOriginalCell
                                                                            .split(';')
                                                                            .map(opt => opt.trim())
                                                                            .filter(Boolean);

                                                                        const reordered = [selected, ...allOptions.filter(opt => opt !== selected)].join(';');

                                                                        sheetData[rowIndex + 1][cellIndex] = reordered;

                                                                        sessionData[activeSheet] = sheetData;
                                                                        sessionStorage.setItem("excelData", JSON.stringify(sessionData));
                                                                        setExcelDataFromSession(sessionData); // Fuerza refresco
                                                                    }}
                                                                    size="small"
                                                                    sx={{ width: '100%' }}
                                                                >
                                                                    {originalCell
                                                                        .split(';')
                                                                        .map((option, index) => (
                                                                            <MenuItem key={index} value={option.trim()}>
                                                                                {option.trim()}
                                                                            </MenuItem>
                                                                        ))}
                                                                </Select>

                                                            ) : (
                                                                <div
                                                                    contentEditable={cellIndex !== 0}
                                                                    suppressContentEditableWarning
                                                                    onBlur={(e) => {
                                                                        if (cellIndex !== 0) {
                                                                            const newValue = e.target.innerText.trim();

                                                                            // Modifica solo esta celda, dejando las demás intactas
                                                                            const sessionData = JSON.parse(sessionStorage.getItem("excelData"));
                                                                            const sheetData = [...sessionData[activeSheet]];

                                                                            sheetData[rowIndex + 1][cellIndex] = newValue;

                                                                            sessionData[activeSheet] = sheetData;
                                                                            sessionStorage.setItem("excelData", JSON.stringify(sessionData));
                                                                            setExcelDataFromSession(sessionData); // Refresca la tabla
                                                                        }
                                                                    }}
                                                                >
                                                                    {cell}
                                                                </div>
                                                            )}
                                                        </TableCell>

                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            </Modal>

            <MapaModal open={openMapaModal} cerrarModal={handleCloseMapaModal} />
            <ToastContainer />
        </>
    );
};

export default ExcelUploaderStorage;
