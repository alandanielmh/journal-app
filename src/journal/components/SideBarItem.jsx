import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store";

export const SideBarItem = ({ id, title = '', body, date, imageUrls = [] }) => {

  const dispatch = useDispatch()

  const onClickNote = (event) => {
    event.preventDefault()
    dispatch(setActiveNote({id, title, body, date, imageUrls}))

  }

  const newTitle = useMemo(() =>{
    return title.length > 17 
    ? title.substring(0,17) + '...'
    : title
  } ,[title])


  return (
    <ListItem key={ id} disablePadding>
      <ListItemButton onClick={(e) => onClickNote(e)}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText
            secondary={ body}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
