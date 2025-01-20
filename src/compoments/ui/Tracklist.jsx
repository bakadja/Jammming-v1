/* eslint-disable react/prop-types */
import React from "react";
import { List } from "@mui/material";
import Track from "./Track";
import Divider from "@mui/material/Divider";

const style = {
  p: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

function Tracklist({ tracks = [], onAdd, actionIcon = "add" }) {
  return (
    <List sx={style}>
      {tracks.map((track) => (
        <>
          <Track key={track.id} track={track} onAdd={onAdd}  actionIcon={actionIcon}/>
          <Divider />
        </>
      ))}
    </List>
  );
}

export default React.memo(Tracklist);
