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
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const primaryColor = "#000000"; // Color negro definido como variable
const fuchsiaColor = "#D100D1"; // Código de color fucsia

const settings = [
    { name: 'Cerrar sesión', path: '/logout' },
];

function ResponsiveAppBar({ filePath, abrirModal, abrirModalx, handleRecalculate, handleDownloadPdf }) {

    const pages = [
        {
            name: 'Documentos',
            path: '/Docs',
            icon: <DocumentIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/Docs')
        },
        {
            name: 'Servicios',
            path: '/Servicios',
            icon: <MiscellaneousServicesIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/Servicios')
        },        {
            name: 'Ayuda',
            path: '/ayuda',
            icon: <HelpOutlineIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/ayuda')
        },
        {
            name: 'Contacto',
            path: '/contacto',
            icon: <ContactMailIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/contacto')
        },
    ];

    const [user] = useAuthState(auth);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigation = async (path) => {
        if (path === '/logout') {
            try {
                await signOut(auth);
                navigate('/'); // Redirige al usuario a la página de login después de cerrar sesión
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
        <AppBar
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                height: 55,
                bgcolor: 'white',
            }}
        >
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
                        Watt
                        <span style={{
                            color: "white",
                            backgroundColor: fuchsiaColor, // Fondo fucsia
                            padding: "0px 2px",
                            borderRadius: "4px",
                        }}>
                            Bucket
                        </span>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            sx={{ color: primaryColor }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => page.onClick()} sx={{ color: page.color }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                        {page.icon}
                                        <span style={{ marginLeft: '8px' }}>{page.name}</span>
                                    </Typography>
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
                            Watt
                            <span style={{
                                color: "white",
                                backgroundColor: fuchsiaColor, // Fondo fucsia
                                padding: "0px 2px",
                                borderRadius: "4px",
                            }}>
                                Bucket
                            </span>
                        </span>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => page.onClick()}
                                sx={{
                                    my: 2,
                                    color: page.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {page.icon}
                                <span style={{ marginLeft: '8px' }}>{page.name}</span>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ color: primaryColor }}>
                                        <Avatar alt={user.displayName || "User"} src={user.photoURL || "/static/images/avatar/2.jpg"} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography sx={{ display: 'inline', mr: 2 }}>
                                            Hola,
                                            <br />
                                            <strong>{user.email || "Usuario"}</strong>
                                        </Typography>
                                    </MenuItem>

                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={() => handleNavigation(setting.path)}>
                                            <Typography sx={{ textAlign: 'center' }}>
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <IconButton component={Link} to="/login" sx={{ color: primaryColor }}>
                                < PersonOutlineIcon/>
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
