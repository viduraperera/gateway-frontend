import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGatewayData } from "../../store/reducers/gateway";

import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CreateGateway({ open }) {
  const dispatch = useDispatch();
  const [serialNumber, setSerialNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    console.log("e", e)
    e.preventDefault();
    dispatch(createGatewayData({ serialNumber, name, address }));
    setSerialNumber("");
    setName("");
    setAddress("");
  };

  const classes = useStyles();
  return (
    <Fade in={open}>
      <div className={classes.paper}>
        <h2>Create Gateway</h2>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Serial Number"
              placeholder="MKJNAM678233"
              variant="outlined"
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              placeholder="Gateway 2"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="IP V4 Address"
              placeholder="123.255.255.255"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </Fade>
  );
}
