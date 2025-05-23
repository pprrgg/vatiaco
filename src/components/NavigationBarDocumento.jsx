import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import DocumentIcon from '@mui/icons-material/Description';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CheckIcon from '@mui/icons-material/Check';

import { LocationOn as LocationOnIcon, Tune as TuneIcon, Calculate as CalculateIcon, PictureAsPdf as PictureAsPdfIcon } from "@mui/icons-material";
// login
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const primaryColor = "#000000"; // Color negro definido como variable
const fuchsiaColor = "#D100D1"; // Código de color fucsia
const settings = [
    { name: 'Cerrar sesión', path: '/logout' },
];

function ResponsiveAppBar({ filePath, abrirModal, abrirModalx, handleRecalculate, handleDownloadPdf }) {
    const [user] = useAuthState(auth);
    
    // Función envolvente para verificar si el usuario está logueado antes de ejecutar la acción
    const requireLogin = (action) => {
        if (!user) {
            toast.warning("Debes iniciar sesión para realizar esta acción.");
            return;
        }
        action();
    };

    // Obtener el valor de selectedFicha['cod'] desde sessionStorage
    const selectedFicha = JSON.parse(sessionStorage.getItem('selectedFicha'));
    const fichaCod = selectedFicha ? selectedFicha['cod'] : 'Documentos';
    const fichaCo = selectedFicha ? selectedFicha['co'] : 'Documentos';

    // !!!!!!!!!!!!!!! comentar y descomentar pages para condicionar a estar logeado
    const pages = [
        { name: fichaCo, icon: <DocumentIcon />, color: primaryColor, onClick: () => handleNavigation('/Docs') },
        // { name: 'Ubicación', icon: <LocationOnIcon />, color: primaryColor, onClick: abrirModal },
        // { name: 'Parámetros', icon: <TuneIcon />, color: primaryColor, onClick: abrirModalx },
        { name: 'Editar', icon: <TuneIcon />, color: primaryColor, onClick: abrirModalx },
        // { name: 'Calcular', icon: <CalculateIcon />, color: primaryColor, onClick: handleRecalculate },
        { name: 'pdf', icon: <PictureAsPdfIcon />, color: primaryColor, onClick: handleDownloadPdf },
    ];

    // const pages = [
    //     { name: fichaCod, icon: <DocumentIcon />, color: primaryColor, onClick: () => handleNavigation('/Docs') },
    //     { name: 'Parámetros', icon: <TuneIcon />, color: primaryColor, onClick: abrirModalx },
    //     { name: 'Calcular', icon: <CalculateIcon />, color: primaryColor, onClick: () => requireLogin(handleRecalculate) },
    //     { name: 'pdf', icon: <PictureAsPdfIcon />, color: primaryColor, onClick: () => requireLogin(handleDownloadPdf) },
    // ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleNavigation = async (path) => {
        if (path === '/logout') {
            try {
                await signOut(auth);
                navigate('/');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        } else {
            navigate(path);
            handleCloseNavMenu();
            handleCloseUserMenu();
        }
    };

    return (
        <>
            <AppBar sx={{ width: '100%', position: 'fixed', bottom: 0, height: 55, bgcolor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: fuchsiaColor, // Aplicar color fucsia
                                textDecoration: "none",
                                border: `2px solid ${fuchsiaColor}`, // Borde con color fucsia
                                padding: "2px 4px",
                            }}
                        >
                            DOC
                            <span style={{
                                color: "white",
                                backgroundColor: fuchsiaColor, // Fondo fucsia
                                padding: "0px 2px",
                                borderRadius: "4px",
                            }}>
                                TEC
                            </span>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: primaryColor }}>
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={page.onClick} sx={{ color: page.color }}>
                                        {page.icon} <span style={{ marginLeft: '8px' }}>{page.name}</span>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: fuchsiaColor, // Aplicar color fucsia
                                textDecoration: 'none',
                            }}
                        >
                            <span
                                style={{
                                    border: `2px solid ${fuchsiaColor}`, // Borde fucsia
                                    padding: "2px 1px",
                                }}
                            >
                                DOC
                                <span style={{
                                    color: "white",
                                    backgroundColor: fuchsiaColor, // Fondo fucsia
                                    padding: "0px 2px",
                                    borderRadius: "4px",
                                }}>
                                    TEC
                                </span>
                            </span>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page.name} onClick={page.onClick} sx={{ my: 2, color: page.color, display: 'flex', alignItems: 'center' }}>
                                    {page.icon} <span style={{ marginLeft: '8px' }}>{page.name}</span>
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {user ? (
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ color: primaryColor }}>
                                        <Avatar alt={user.displayName || "User"} src={user.photoURL || "/static/images/avatar/2.jpg"} />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <IconButton component={Link} to="/login" sx={{ color: primaryColor }}>
                                    {/* <PersonOutlineIcon /> */}
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ToastContainer />
        </>
    );
}

export default ResponsiveAppBar;