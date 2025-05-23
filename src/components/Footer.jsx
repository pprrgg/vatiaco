import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyPolicy from './footer/Política de Privacidad';
import TermsOfUse from './footer/Términos de Uso';
import AboutUs from './footer/Sobre mi';

const fuchsiaColor = "#D100D1";

const FooterResponsive = () => {
  const [openDialog, setOpenDialog] = useState(null);

  const handleOpenDialog = (dialog) => setOpenDialog(dialog);
  const handleCloseDialog = () => setOpenDialog(null);

  const dialogComponents = {
    terms: <TermsOfUse />,
    privacy: <PrivacyPolicy />,
    about: <AboutUs />
  };

  const navItems = [
    { label: 'Términos', title: 'Términos de Uso', icon: <GavelIcon sx={{ fontSize: 26 }} />, dialog: 'terms' },
    { label: 'Privacidad', title: 'Política de Privacidad', icon: <PolicyIcon sx={{ fontSize: 26 }} />, dialog: 'privacy' },
    { label: 'Sobre nosotros', title: 'Sobre nosotros', icon: <InfoIcon sx={{ fontSize: 26 }} />, dialog: 'about' },
  ];

  return (
    <div>
      {openDialog && (
        <Dialog open onClose={handleCloseDialog}>
          <DialogTitle>{navItems.find(item => item.dialog === openDialog)?.title}</DialogTitle>
          <DialogContent>{dialogComponents[openDialog]}</DialogContent>
        </Dialog>
      )}

      <BottomNavigation
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          height: 45,
          bgcolor: 'transparent',
          display: 'flex',
          justifyContent: 'space-around',
          zIndex: 1300,
        }}
      >
        {navItems.map(({ label, title, icon, dialog }) => (
          <Tooltip title={title} key={dialog}>
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${fuchsiaColor}`,
                borderRadius: '18px',
                padding: '0px',
                minWidth: '40px',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                '&:hover': {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.8)",
                  borderColor: '#AF00A0', // un tono más oscuro al hacer hover
                },
              }}
            >
              <BottomNavigationAction
                label={label}
                icon={icon}
                onClick={() => handleOpenDialog(dialog)}
                sx={{
                  color: fuchsiaColor,
                  minWidth: '40px',
                  padding: 0,
                }}
                showLabel={false}
              />
            </Paper>
          </Tooltip>
        ))}
      </BottomNavigation>
    </div>
  );
};

export default FooterResponsive;

