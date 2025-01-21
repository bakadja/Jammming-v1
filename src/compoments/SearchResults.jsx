/* eslint-disable react/prop-types */
import React from "react";
import Tracklist from "./ui/Tracklist";
import { Typography, Box } from "@mui/material";

const SearchResults = React.memo(function SearchResults({ tracks = [], onAdd }) {
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
      <Tracklist tracks={tracks} title="add to playlist" onAdd={onAdd} />
    </Box>
  );
});

export default SearchResults;
