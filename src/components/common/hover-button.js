import React, { useState } from "react";
import { makeStyles, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function HoverButton() {
  const classes = useStyles();

  return (
    <Fab color="primary" aria-label="add" className={classes.fab}>
      <AddIcon />
    </Fab>
  );
}
