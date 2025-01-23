/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Tracklist from "./ui/Tracklist";
import PlaylistModal from "./ui/PlaylistModal";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Playlist({ savedPlaylists, ...props }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);

  const handleView = (playlist) => {
    setSelectedPlaylist(playlist);
    setModalOpen(true);
  };

  const handleNavigate = (direction) => {
    const currentIndex = savedPlaylists.findIndex(p => p.name === selectedPlaylist?.name);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < savedPlaylists.length) {
      setSelectedPlaylist(savedPlaylists[newIndex]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ textTransform: "uppercase" }}
      >
        {props.editingPlaylist ? "Modifier la playlist" : "Nouvelle Playlist"}
      </Typography>

      <TextField
        fullWidth
        required
        value={props.playlistName}
        label="Nom de la playlist"
        variant="standard"
        onChange={(e) => props.onNameChange(e.target.value)}
      />

      <Tracklist
        tracks={props.playlistTracks}
        onAdd={props.onRemove}
        actionIcon="remove"
        title="Retirer de la playlist"
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onSave}
          disabled={!props.playlistTracks.length || !props.playlistName}
        >
          {props.editingPlaylist ? "Mettre à jour" : "Save To Spotify"}
        </Button>

        {props.editingPlaylist && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={props.onCancel}
          >
            Annuler
          </Button>
        )}
      </Box>

      {/* Affichage des playlists sauvegardées */}
      {savedPlaylists.length > 0 && (
        <Box sx={{ width: "100%", mt: 4 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            Playlists sauvegardées
          </Typography>
          {savedPlaylists.map((playlist) => (
            <Box
              key={playlist.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography>{playlist.name}</Typography>
              <Button
                size="small"
                onClick={() => handleView(playlist)}
                startIcon={<VisibilityIcon />}
              >
                Voir
              </Button>
              <Button
                size="small"
                onClick={() => props.onEdit(playlist)}
                disabled={props.editingPlaylist?.name === playlist.name}
              >
                Éditer
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => props.onDelete(playlist.name)}
              >
                Supprimer
              </Button>
            </Box>
          ))}
        </Box>
      )}

      <PlaylistModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPlaylist(null);
        }}
        playlist={selectedPlaylist}
        savedPlaylists={savedPlaylists}
        onNavigate={handleNavigate}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
    </Box>
  );
}

export default React.memo(Playlist);
