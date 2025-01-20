import React from "react";
import Tracklist from "./ui/Tracklist";
import { Typography, Box } from "@mui/material";


export default function SearchResults({tracks = []}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ textTransform: "uppercase" }}
      >
        Results
      </Typography>
      <Tracklist tracks={tracks}/>
    </Box>
  );
}
