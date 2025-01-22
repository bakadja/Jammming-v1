import React from "react";
import { Box, Container, AppBar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { tracks } from "./tracks";

function MainContent() {
  const [playlistTracks, setPlaylistTracks] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState("");

  const addTrack = React.useCallback((track) => {
    setPlaylistTracks((prevTracks) => {
      if (prevTracks.find((t) => t.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeTrack = React.useCallback((track) => {
    console.log("onRemove", track);
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id)
    );
  }, []);

  const isTrackInPlaylist = React.useCallback(
    (trackId) => {
      return playlistTracks.some((t) => t.id === trackId);
    },
    [playlistTracks]
  );

  const handleNameChange = React.useCallback((newName) => {
    setPlaylistName(newName);
  }, []);

  const handleSave = React.useCallback(() => {
    if (!playlistTracks.length) {
      console.warn("La playlist doit contenir au moins une piste");
      return;
    }
    // const tracks = playlistTracks.map((track) => ({
    //   id: track.id,
    //   uri: track.uri,
    //   name: track.name,
    //   artist: track.artists[0].name,
    //   album: track.album.name,
    // }));

    const playlistData = {
      name: playlistName,
      tracks: [...playlistTracks],
    };

    console.log("Sauvegarde de la playlist:", playlistData);

    // Réinitialiser après sauvegarde
    setPlaylistName("");
    setPlaylistTracks([]);
  }, [playlistName, playlistTracks]);

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
              <SearchResults
                tracks={tracks}
                onAdd={addTrack}
                isTrackInPlaylist={isTrackInPlaylist}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Playlist
                playlistName={playlistName}
                onNameChange={handleNameChange}
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onSave={handleSave}
              />
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
