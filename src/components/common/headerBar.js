import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gateway Portal Manager
          </Typography> 
          <Button color="inherit">
            <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Gateway </Link>
          </Button>
          <Button color="inherit">
            <Link to="/devices" style={{ textDecoration: 'none', color: 'white'}}>Devices </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
