import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import CookieConsent from './components/footer/CookieConsent';
import Home from './components/Home';
import Doc from './components/Doc';
import Contact from './components/Contact';
import Servicios from './components/Servicios';
import Ayuda from './components/Ayuda';
import Docs from './components/NavigationBarDocs';
import NavigationBar from './components/NavigationBar';

import Footer from './components/Footer';
import Terms from './components/footer/Términos de Uso';
import Privacy from './components/footer/Política de Privacidad';

import SignIn from './components/firebase/SignIn';
import SignUp from './components/firebase/SignUp';
import ForgotPassword from './components/firebase/ForgotPassword';
import Redirect from './components/firebase/Redirect';

import "react-toastify/dist/ReactToastify.css";
import MapaModal from "./components/MapaModal";

// 🔄 Importa el mapa de componentes

const App = () => {


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Router>
                <NavigationBar />
                <Box>
                    <Routes>
                        <Route path="/map/:lat/:lng" element={<MapaModal />} />
                        <Route path='/user/*' element={<Redirect url="/" />} />
                        <Route path='/login' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/terms' element={<Terms />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/Docs" element={<Docs />} />
                        <Route path="/servicios" element={<Servicios />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/ayuda" element={<Ayuda />} />
                        <Route path="/doc" element={<Doc />} />
                    </Routes>
                </Box>
                <Footer />
            </Router>
            <CookieConsent />
        </Box>
    );
};

export default App;
