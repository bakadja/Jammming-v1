import React from "react";
import { Box, Container, AppBar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { tracks } from "./tracks";
import { savePlaylist, getPlaylists, deletePlaylist, updatePlaylist } from '../services/dbservice';

function MainContent() {
  const [playlistTracks, setPlaylistTracks] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState("");
  const [savedPlaylists, setSavedPlaylists] = React.useState([]);
  const [editingPlaylist, setEditingPlaylist] = React.useState(null);

  // Charger les playlists au montage
  React.useEffect(() => {
    const loadPlaylists = async () => {
      const playlists = await getPlaylists();
      setSavedPlaylists(playlists);
    };
    loadPlaylists();
  }, []);

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

  // Modifier handleSave pour utiliser dbService
  const handleSave = React.useCallback(async () => {
    if (!playlistTracks.length) {
      console.warn("La playlist doit contenir au moins une piste");
      return;
    }

    const playlistData = {
      name: playlistName,
      tracks: [...playlistTracks],
    };
const uris = playlistData.tracks.map(track => track.uri);
    const saved = await savePlaylist(playlistData);
    if (saved) {
      // Mettre à jour savedPlaylists
      setSavedPlaylists(prev => [...prev, playlistData]);
      // Réinitialiser
      setPlaylistName("");
      setPlaylistTracks([]);
    }
  }, [playlistName, playlistTracks]);

  // Ajouter fonction de suppression
  const handleDelete = React.useCallback(async (name) => {
    const deleted = await deletePlaylist(name);
    if (deleted) {
      setSavedPlaylists(prev => prev.filter(p => p.name !== name));
    }
  }, []);

  const handleEdit = React.useCallback((playlist) => {
    setEditingPlaylist(playlist);
    setPlaylistName(playlist.name);
    setPlaylistTracks(playlist.tracks);
  }, []);

  const handleUpdate = React.useCallback(async () => {
    if (!playlistTracks.length || !editingPlaylist) {
      return;
    }

    const playlistData = {
      name: playlistName,
      tracks: [...playlistTracks],
    };

    const updated = await updatePlaylist(editingPlaylist.name, playlistData);
    if (updated) {
      setSavedPlaylists(prev => 
        prev.map(p => p.name === editingPlaylist.name ? playlistData : p)
      );
      setEditingPlaylist(null);
      setPlaylistName("");
      setPlaylistTracks([]);
    }
  }, [playlistName, playlistTracks, editingPlaylist]);

  const handleCancel = React.useCallback(() => {
    setEditingPlaylist(null);
    setPlaylistName("");
    setPlaylistTracks([]);
  }, []);

  React.useEffect(() => {
    console.log("playlistTracks", playlistTracks);
  }, [playlistTracks,]);

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
                onSave={editingPlaylist ? handleUpdate : handleSave}
                onCancel={handleCancel}
                savedPlaylists={savedPlaylists}
                onDelete={handleDelete}
                onEdit={handleEdit}
                editingPlaylist={editingPlaylist}
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
