import { Button, Grid } from "@material-ui/core";
import React from "react";
import AllDevices from "../components/device/all-devices";

export default function Devices() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AllDevices />
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Button variant="contained" color="primary">
            Left Button
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
