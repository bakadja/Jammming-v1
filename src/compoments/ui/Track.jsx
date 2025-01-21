/* eslint-disable react/prop-types */
import React from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Track({ track, onAdd, actionIcon, title }) {
  const ActionIcon = actionIcon === "add" ? AddIcon : RemoveIcon;

  // Accéder aux données correctement depuis la structure de tracks
  const artistName = track.artists[0]?.name;
  const albumName = track.album?.name;

  return (
    <ListItem
      key={track.id}
      secondaryAction={
        <IconButton title={title} edge="end" onClick={() => onAdd(track)}>
          <ActionIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography variant="h6" component="h3">
            {track.name}
          </Typography>
        }
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            {artistName} • {albumName}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default React.memo(Track);
