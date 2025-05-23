import React, { useState } from "react";
import { Box, TextField, Button, Container, Typography, Alert, Grid } from "@mui/material";
import Footer from './Footer';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import NavigationBar from './NavigationBar';



const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const mailtoLink = `mailto:info@vatiaco.com?subject=Mensaje de ${formValues.name}&body=Nombre: ${formValues.name}%0AEmail: ${formValues.email}%0AMensaje: ${formValues.message}`;

    if (formValues.name && formValues.email && formValues.message) {
      window.location.href = mailtoLink;
      setStatus({ type: "success", message: "Formulario enviado con éxito. Revisa tu cliente de correo." });
      setFormValues({ name: "", email: "", message: "" });
    } else {
      setStatus({ type: "error", message: "Por favor, completa todos los campos." });
    }
  };

  return (
    <>
      {/* Barra de navegación */}
      {/* <NavigationBar /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Grid container spacing={4}>
            {/* Información de contacto */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <div>
                  {/* Imagen de oficina */}
                  <ContactMailOutlinedIcon
                    sx={{
                      fontSize: '5rem',
                      marginBottom: 2,
                      color: 'black',

                      padding: '16px 32px',
                      '&:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                      },

                    }}
                    onClick={() => { window.location.href = 'mailto:info@vatiaco.com' }} // Maneja el clic del botón
                  />
                  <PhoneOutlinedIcon
                    sx={{
                      fontSize: '5rem', // Tamaño grande
                      marginBottom: 2,  // Espacio en la parte inferior
                      color: 'black',   // Color inicial
                      padding: '16px 32px',
                      '&:hover': {
                        backgroundColor: 'black', // Fondo negro al pasar el ratón
                        color: 'white',  // Cambiar el color a blanco
                      },
                    }}
                    onClick={() => { window.location.href = 'tel:+34951733491'; }} // Llamar al número
                  />

                </div>
              </Box>






              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                C. Moby Dick, 30. 29004, Málaga
              </Typography>
              <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                Teléfono: +34 951 73 34 91
              </Typography>
              <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                Email: info@vatiaco.com
              </Typography>
            </Grid>

            {/* Formulario de contacto */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" align="center" gutterBottom>
                Formulario de Contacto
              </Typography>

              {status && (
                <Alert severity={status.type} sx={{ mb: 2 }}>
                  {status.message}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nombre"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Correo Electrónico"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Mensaje"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  margin="normal"
                />




                <Button type="submit" variant="outlined"
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    fontSize: '1.5rem', // Aumenta el tamaño de la fuente
                    padding: '16px 32px', // Aumenta el padding
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }} fullWidth>
                  Enviar
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>

        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default ContactForm;
