/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import Tracklist from './ui/Tracklist'

function Playlist({ playlistTracks = [], onRemove, onNameChange, onSave, playlistName }) {
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
      {/* <Typography variant="h4" compoment="h2" sx={{ textTransform: 'uppercase' }}>
        Playlist
      </Typography> */}

      <TextField
        // fullWidth
        required
        value={playlistName}
        label="Playlist Name"
        variant="standard"
        onChange={(e) => onNameChange(e.target.value)}
      />

      <Tracklist
        tracks={playlistTracks}
        onAdd={onRemove}
        actionIcon="remove"
        title="remove from playlist"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
        disabled={!playlistTracks.length || !playlistName}
      >
        SAVE TO SPOTIFY
      </Button>
    </Box>
  );
}

export default React.memo(Playlist)
