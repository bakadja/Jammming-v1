import React from "react";
import { Box, Container, AppBar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { tracks } from "./tracks";

function MainContent() {
  const [playlistTracks, setPlaylistTracks] = React.useState([]);
  console.log("tracks:", tracks.length);

  // TODO : ne pas ajouter un morceau déjà présent dans la playlist
  const addTrack = React.useCallback((track) => {
    console.log("onAdd", track);
    if (!playlistTracks.includes(track)) {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeTrack = React.useCallback((track) => {
    console.log("onRemove", track);
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id)
    );
  }, []);

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
              <SearchResults tracks={tracks} onAdd={addTrack} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Playlist playlistTracks={playlistTracks} onRemove={removeTrack} />{" "}
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
