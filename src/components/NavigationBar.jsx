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
import SearchIcon from '@mui/icons-material/Search';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const primaryColor = "#000000"; // Color negro definido como variable
const fuchsiaColor = "#D100D1"; // Código de color fucsia

const settings = [
    { name: 'Cerrar sesión', path: '/logout' },
];

function ResponsiveAppBar({ filePath, abrirModal, abrirModalx, handleRecalculate, handleDownloadPdf }) {

    const pages = [

        {
            name: 'Servicios',
            path: '/Servicios',
            icon: <MiscellaneousServicesIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/Servicios')
        }, {
            name: 'Ayuda',
            path: '/ayuda',
            icon: <HelpOutlineIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/ayuda')
        },
        {
            name: 'Informes',
            path: '/Docs',
            icon: <SearchIcon />,
            color: primaryColor,
            onClick: () => handleNavigation('/Docs')
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

                    <Box
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' }, // mantiene el mismo comportamiento responsive
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 1, // antes 2
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '0px 8px', // antes 0px 16px
                                backgroundColor: '#0066cc',
                                borderRadius: '8px', // puedes bajar a 4px si quieres proporcional
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#fuchsia', // reemplaza con fuchsiaColor si lo tienes definido
                            }}
                        >
                            <Typography
                                variant="h5" // antes h4, h5 es más pequeño
                                component="div"
                                sx={{
                                    fontFamily: "'Roboto', 'Arial', sans-serif",
                                    fontWeight: 900,
                                    textTransform: 'capitalize',
                                    color: 'white',
                                    lineHeight: 1.1,
                                    letterSpacing: '0.025em', // antes 0.05em
                                }}
                            >
                                Vatiaco
                            </Typography>
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{
                                    fontSize: '0.275rem', // antes 0.55rem
                                    fontWeight: 300,
                                    textTransform: 'uppercase',
                                    color: 'white',
                                    mt: '-2.5px', // antes -5px
                                    lineHeight: 1,
                                    letterSpacing: '0.275em', // antes 0.55em
                                    fontFamily: "'Roboto', 'Arial', sans-serif",
                                }}
                            >
                                Engineering
                            </Typography>
                        </Box>
                    </Box>



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
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            mr: 1, // antes 2
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            mb: 1, // antes 2
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Box
                            sx={{
                                padding: "0px 8px", // antes 0px 16px
                                backgroundColor: "#0066cc",
                                borderRadius: "8px", // se puede dejar igual o bajar a 4px para más proporción
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "white",
                            }}
                        >
                            <Typography
                                variant="h5" // antes h4, h5 es un poco más pequeño
                                component="div"
                                sx={{
                                    fontFamily: "'Roboto', 'Arial', sans-serif",
                                    fontWeight: 900,
                                    textTransform: "capitalize",
                                    lineHeight: 1.1,
                                    letterSpacing: "0.025em", // antes 0.05em, a la mitad
                                    color: "inherit",
                                }}
                            >
                                Vatiaco
                            </Typography>
                            <Typography
                                variant="caption"
                                component="div"
                                sx={{
                                    fontSize: "0.275rem", // antes 0.55rem
                                    fontWeight: 300,
                                    textTransform: "uppercase",
                                    mt: "-2.5px", // antes -5px
                                    lineHeight: 1,
                                    letterSpacing: "0.275em", // antes 0.55em
                                    fontFamily: "'Roboto', 'Arial', sans-serif",
                                    color: "inherit",
                                }}
                            >
                                Engineering
                            </Typography>
                        </Box>
                    </Box>


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
                                < PersonOutlineIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
