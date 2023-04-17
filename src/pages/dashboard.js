import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import AllGateways from "../components/gateway/all-gateways";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CreateGateway from "../components/gateway/create-gateway";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AllGateways />
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Button onClick={handleOpen} variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CreateGateway open={open} />
      </Modal>
    </div>
  );
};

export default Dashboard;
