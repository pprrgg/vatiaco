import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Términos de Uso</Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Última actualización: {new Date().getFullYear()}</strong>
      </Typography>

      <Typography variant="h5" gutterBottom>1. Aceptación de los Términos</Typography>
      <Typography variant="body1" paragraph>
        Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos de Uso y a nuestra Política de Privacidad. Si no está de acuerdo con estos términos, le solicitamos que no utilice el sitio.
      </Typography>

      <Typography variant="h5" gutterBottom>2. Modificaciones a los Términos</Typography>
      <Typography variant="body1" paragraph>
        Vatiaco se reserva el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor una vez que se publiquen en este sitio. Es su responsabilidad revisar periódicamente los términos para estar al tanto de cualquier modificación.
      </Typography>

      <Typography variant="h5" gutterBottom>3. Uso Permitido</Typography>
      <Typography variant="body1" paragraph>
        Usted se compromete a utilizar este sitio solo con fines legales y de manera que no infrinja los derechos de otros. No podrá utilizar este sitio de ninguna manera que pueda dañar, deshabilitar, sobrecargar o perjudicar el mismo, ni utilizarlo para realizar actividades fraudulentas, engañosas o malintencionadas.
      </Typography>

      <Typography variant="h5" gutterBottom>4. Autorización para Ofertar Ahorros Energéticos</Typography>
      <Typography variant="body1" paragraph>
        Al utilizar esta plataforma, el propietario de los ahorros energéticos autoriza expresamente a Vatiaco a ofertar, exhibir y promocionar sus productos a través del sitio. Esta autorización incluye el derecho de Vatiaco a utilizar imágenes, descripciones y cualquier otro contenido proporcionado por el propietario para la promoción de los ahorros energéticos. El propietario garantiza que tiene todos los derechos necesarios para otorgar esta autorización.
      </Typography>

      <Typography variant="h5" gutterBottom>5. Veracidad de la Información Proporcionada</Typography>
      <Typography variant="body1" paragraph>
        Los usuarios del sitio se comprometen a proporcionar información veraz, precisa y completa en cualquier formulario, registro o interacción con el sitio. Cualquier información falsa, incompleta o engañosa proporcionada por el usuario podrá resultar en la suspensión o cancelación de su acceso al sitio sin previo aviso.
      </Typography>

      <Typography variant="h5" gutterBottom>6. Propiedad Intelectual</Typography>
      <Typography variant="body1" paragraph>
        Todos los contenidos de este sitio, incluidos textos, gráficos, logotipos, imágenes y software, son propiedad de Vatiaco o de sus licenciantes y están protegidos por las leyes de derechos de autor y propiedad intelectual. No se permite la reproducción, distribución o modificación de ningún contenido sin el consentimiento previo por escrito de Vatiaco.
      </Typography>

      <Typography variant="h5" gutterBottom>7. Limitación de Responsabilidad</Typography>
      <Typography variant="body1" paragraph>
        En la máxima medida permitida por la ley, Vatiaco no será responsable de ningún daño directo, indirecto, incidental, especial, punitivo o consecuente que surja de su acceso o uso del sitio, incluyendo, pero no limitado a, la pérdida de beneficios o ingresos, o la interrupción del negocio.
      </Typography>

      <Typography variant="h5" gutterBottom>8. Enlaces a Sitios de Terceros</Typography>
      <Typography variant="body1" paragraph>
        Este sitio puede contener enlaces a otros sitios web que no son propiedad ni están controlados por Vatiaco. No somos responsables del contenido de dichos sitios y no asumimos ninguna responsabilidad por las prácticas de privacidad de los mismos. Le recomendamos que revise los términos y políticas de privacidad de cualquier sitio web de terceros que visite.
      </Typography>

      <Typography variant="h5" gutterBottom>9. Sanciones por Incumplimiento</Typography>
      <Typography variant="body1" paragraph>
        En caso de que se descubra que ha proporcionado información falsa, inexacta o engañosa, Vatiaco se reserva el derecho de suspender o eliminar su cuenta sin previo aviso. Dependiendo de la gravedad del caso, Vatiaco se reserva el derecho de tomar medidas legales adicionales para proteger sus derechos y los de otros usuarios.
      </Typography>

      <Typography variant="h5" gutterBottom>10. Ley Aplicable</Typography>
      <Typography variant="body1" paragraph>
        Estos Términos de Uso se rigen por las leyes de España. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Málaga.
      </Typography>

      <Typography variant="h5" gutterBottom>11. Contacto</Typography>
      <Typography variant="body1" paragraph>
        Si tiene preguntas sobre estos Términos de Uso, contáctenos en:
      </Typography>
      <List>
        <ListItem>
          <strong>Correo electrónico</strong>: info@vatiaco.com
        </ListItem>
        <ListItem>
          <strong>Dirección</strong>: C. Moby Dick, 30. 29004 Málaga
        </ListItem>
      </List>
    </Box>
  );
};

export default TermsOfUse;
