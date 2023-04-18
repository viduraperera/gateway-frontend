import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useDeviceStore from "../../store/devices";

function ViewDeviceDetails({ selectedDeviceId, onClose }) {
  const [editMode, setEditMode] = useState(false);

  const { updateDevice, fetchSingleDevice, devicesDetails } = useDeviceStore(
    (state) => ({
      updateDevice: state.updateDevice,
      fetchSingleDevice: state.fetchSingleDevice,
      devicesDetails: state.devicesDetails,
    })
  );

  const schema = Joi.object({
    vendor: Joi.string().required().label("Vendor"),
    status: Joi.string().required().label("Status"),
    gatewayId: Joi.string().allow(null, "").label("Gateway Id"),
    uuid: Joi.string().allow(null, ""),
    createdDate: Joi.string().allow(null, ""),
    _id: Joi.string().allow(null, ""),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vendor: "",
      status: "",
      gatewayId: "",
      uuid: "",
      createdDate: "",
      _id: "",
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    await updateDevice(selectedDeviceId, data);
    onClose();
    reset();
  };

  useEffect(() => {
    fetchSingleDevice(selectedDeviceId);
  }, []);

  useEffect(() => {
    if (devicesDetails !== null)
      reset({
        ...devicesDetails.data,
      });
  }, [devicesDetails]);

  const openEditMode = () => setEditMode(true);

  return (
    <Box sx={{ p: "10px 20px 0px 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", position: "relative", bottom: "40px" }}>
        <Button
          size="large"
          startIcon={<EditIcon />}
          onClick={openEditMode}
          disabled={editMode}
        >
        </Button>
      </Box>

      <Grid
        container
        direction="column"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        rowGap={2}
      >
        <Controller
          name="vendor"
          control={control}
          render={({ field }) => (
            <FormControl>
              <TextField
                {...field}
                disabled={!editMode}
                helperText={errors?.vendor?.message}
              />
            </FormControl>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl>
              <TextField
                {...field}
                disabled={!editMode}
                helperText={errors?.status?.message}
              />
            </FormControl>
          )}
        />
        <Box sx={{ p: "5px 0px 16px 0px", marginLeft: "auto" }}>
          <Button type="submit" variant="contained" disabled={!editMode}>
            Update Device
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
export default ViewDeviceDetails;
