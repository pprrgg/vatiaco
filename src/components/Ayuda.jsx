import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const data = [
  { id: 0, title: "Selección de documentos", subtitle: "Seleccion", description: "en el selector de grupo y subgrupo o por texto", video: "img/seleccion.mp4" },
  { id: 1, title: "Selección de documentos", subtitle: "Seleccion", description: "en el selector de grupo y subgrupo o por texto", video: "img/seleccion.mp4" },
  { id: 2, title: "Selección de documentos", subtitle: "Seleccion", description: "en el selector de grupo y subgrupo o por texto", video: "img/seleccion.mp4" },
];

const CollapsibleList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ width: "100%", paddingX: 2, marginTop: 8 }}>
      {data.map((item) => (
        <Accordion 
          key={item.id} 
          expanded={expanded === item.id} 
          onClick={() => handleToggle(item.id)}
          sx={{ width: "100%" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ width: "100%", textAlign: "left" }}>
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" color="text.secondary">{item.subtitle}</Typography>
            <Typography variant="body2" sx={{ marginY: 1 }}>{item.description}</Typography>
            <Box
              component="video"
              src={item.video}
              controls
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CollapsibleList;