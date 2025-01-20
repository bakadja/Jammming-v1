import React from "react";
import { Box, Container, AppBar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

const exampleTrack = [
  {
    id: "1234567890",
    name: "Example Song",
    artist: "Example Artist",
    album: "Example Album",
    uri: "spotify:track:1234567890",
    albumCover: "https://example.com/album-cover.jpg",
    duration: "3:30",
  },
  {
    id: "1234567894",
    name: "Example Song",
    artist: "Example Artist",
    album: "Example Album",
    uri: "spotify:track:1234567890",
    albumCover: "https://example.com/album-cover.jpg",
    duration: "3:30",
  },
];

function MainContent() {
  return (
    <>
      {/* Header */}
      <AppBar position="static" component="header">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ py: 2 }}>
            Jammming
          </Typography>
        </Container>
      </AppBar>

      {/* MAIN */}

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {/* Ici viendront vos composants SearchBar, SearchResults et Playlist */}
        <SearchBar />
        <Box sx={{ flexGrow: 1, marginTop: "3rem" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <SearchResults tracks={exampleTrack} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Playlist playlistTracks={exampleTrack} />
            </Grid2>
          </Grid2>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ py: 3, bgcolor: "primary.main", color: "white" }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2023 Jammming
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default MainContent;
