import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, ListItem } from "@mui/material";

const ListItems = (props) => {

  return (
    <ListItem disablePadding onClick={props.onClick}>
      <ListItemButton>
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText>{props.text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default ListItems;
