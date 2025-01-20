/* eslint-disable react/prop-types */
import React from 'react'
import { ListItem, IconButton, ListItemText, Typography} from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Track({ track, onAdd, actionIcon }) {
    const ActionIcon = actionIcon === "add" ? AddIcon : RemoveIcon;
  return (
    <ListItem
      key={track.id}
      secondaryAction={
        <IconButton title='add to playlist' edge="end" onClick={() => onAdd(track)}>
          <ActionIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={track.name}
        secondary={
          <>
            <Typography component="span" variant="body2">
              {track.artist}
            </Typography>
            {" - "}
            <Typography component="span" variant="body2">
              {track.album}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

export default React.memo(Track)