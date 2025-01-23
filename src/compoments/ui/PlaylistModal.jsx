/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tracklist from "./Tracklist";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function PlaylistModal({
  open,
  onClose,
  playlist,
  savedPlaylists,
  onNavigate,
  onEdit,
  onDelete,
}) {
  const currentIndex = React.useMemo(
    () => savedPlaylists.findIndex((p) => p.name === playlist?.name),
    [savedPlaylists, playlist]
  );

  const handleEdit = (playlist) => {
    onEdit(playlist);
    onClose();
  };

  const handleDelete = async (name) => {
    await onDelete(name);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <IconButton
            onClick={() => onNavigate("prev")}
            disabled={currentIndex === 0}
            title="Previous"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Typography variant="h6">{playlist?.name}</Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              onClick={() => handleEdit(playlist)}
              startIcon={<EditIcon />}
            >
              Éditer
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleDelete(playlist.name)}
              startIcon={<DeleteIcon />}
            >
              Supprimer
            </Button>
            <IconButton
              onClick={() => onNavigate("next")}
              disabled={currentIndex === savedPlaylists.length - 1}
              title="Next"
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {playlist?.tracks && <Tracklist tracks={playlist.tracks} hideActions />}
      </Box>
    </Modal>
  );
}

export default React.memo(PlaylistModal);
