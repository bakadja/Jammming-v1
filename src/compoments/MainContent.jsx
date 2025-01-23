import React from "react";
import {
  Box,
  Container,
  AppBar,
  Typography,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { tracks } from "./tracks";
import {
  savePlaylist,
  getPlaylists,
  deletePlaylist,
  updatePlaylist,
} from "../services/dbservice";
import { useAuth } from "../hooks/useAuth";
import Login from "./ui/Login";
import Loading from "./ui/Loading";
import ErrorPage from "./ui/ErrorPage";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSearch } from "../hooks/useSearch";
import { usePlaylist } from "../hooks/usePlaylist";


//TODO: add a license code 
function MainContent() {
  const [playlistTracks, setPlaylistTracks] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState("");
  const [savedPlaylists, setSavedPlaylists] = React.useState([]);
  const [editingPlaylist, setEditingPlaylist] = React.useState(null);
  const { token, loading, error, login, logout, getUserData, userData } = useAuth();
  const { searchResults, searchTracks } = useSearch(token);
  const { createNewPlaylist, isCreating, error: playlistError } = usePlaylist(token);

  console.log("userData", userData);
  // Charger les playlists au montage
  React.useEffect(() => {
    const loadPlaylists = async () => {
      const playlists = await getPlaylists();
      setSavedPlaylists(playlists);
    };
    loadPlaylists();
  }, []);

  // Ajout de l'effet pour charger les données utilisateur
  React.useEffect(() => {
    const loadUserData = async () => {
      if (token) {
        await getUserData();
      }
    };
    
    loadUserData();
  }, [token, getUserData]);

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

  // Modifier handleSave pour utiliser createNewPlaylist
  const handleSave = React.useCallback(async () => {
    if (!playlistTracks.length) {
      console.warn("La playlist doit contenir au moins une piste");
      return;
    }

    try {
      const playlist = await createNewPlaylist(playlistName, playlistTracks);
      if (playlist) {
        const playlistData = {
          name: playlistName,
          tracks: [...playlistTracks],
        };
        await savePlaylist(playlistData);
        setSavedPlaylists((prev) => [...prev, playlistData]);
        setPlaylistName("");
        setPlaylistTracks([]);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la playlist:", error);
    }
  }, [playlistName, playlistTracks, createNewPlaylist]);

  // Ajouter fonction de suppression
  const handleDelete = React.useCallback(async (name) => {
    const deleted = await deletePlaylist(name);
    if (deleted) {
      setSavedPlaylists((prev) => prev.filter((p) => p.name !== name));
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
      setSavedPlaylists((prev) =>
        prev.map((p) => (p.name === editingPlaylist.name ? playlistData : p))
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

  const handleSearch = React.useCallback(
    async (searchTerm) => {
      try {
        await searchTracks(searchTerm);
      } catch (error) {
        console.error("Search failed:", error);
      }
    },
    [searchTracks]
  );

  React.useEffect(() => {
    console.log("playlistTracks", playlistTracks);
  }, [playlistTracks]);

  // Ajouter la gestion des erreurs dans le rendu
  if (playlistError) {
    console.error("Erreur playlist:", playlistError);
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return !token ? (
    <Login onLogin={login} />
  ) : (
    <>
      {/* Header */}
      <AppBar position="static" component="header">
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              Jammming {userData && `- ${userData.display_name}`}
            </Typography>
            <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
              Déconnexion
            </Button>
          </Box>
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
        <SearchBar onSearch={handleSearch} />
        <Box sx={{ flexGrow: 1, marginTop: "3rem" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <SearchResults
                // tracks={tracks}
                tracks={searchResults}
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
