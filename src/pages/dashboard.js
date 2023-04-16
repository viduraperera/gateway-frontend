import React from "react";
import { Button, Grid } from "@material-ui/core";
import AllGateways from "../components/gateway/all-gateways";
import AllDevices from "../components/device/all-devices";

const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AllGateways />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AllDevices />
        </Grid>
        <Grid item xs={12} container justify="space-between">
          <Button variant="contained" color="primary">
            Left Button
          </Button>
          <Button variant="contained" color="secondary">
            Right Button
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
