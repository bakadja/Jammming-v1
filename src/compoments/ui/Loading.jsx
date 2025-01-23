import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
      open={true}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" component="h2">
          Chargement de Jammming...
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default React.memo(Loading);
