import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Joi from "joi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useGatewayStore from "../../store/gateway";
import ConnectedDevices from "./attach-devices";
import { toast } from "react-toastify";
import {
  MESSAGE_CONSTANT,
  REGULAR_EXPRESSIONS,
  WARNING_MESSAGE,
} from "../../constants/constants";

function ViewGatewayDetails({
  selectedGatewayId,
  onClose,
  setOpenViewModal,
  editMode,
  setEditMode,
}) {
  const { updateGateway, fetchSingleGateway, gatewayDetails } = useGatewayStore(
    (state) => ({
      updateGateway: state.updateGateway,
      fetchSingleGateway: state.fetchSingleGateway,
      gatewayDetails: state.gatewayDetails,
    })
  );

  const schema = Joi.object({
    serialNumber: Joi.string()
      .pattern(REGULAR_EXPRESSIONS.SERIAL_NUMBER_PATTEN)
      .required()
      .label("Serial Number"),
    name: Joi.string().required().label("Name"),
    ipv4Address: Joi.string().required().label("Ip Address"),
    devices: Joi.array().items(Joi.string()),
    _id: Joi.string().allow(null, ""),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serialNumber: "",
      name: "",
      ipv4Address: "",
    },
    resolver: joiResolver(schema),
  });

  const validate = () => {
    if (gatewayDetails.data.devices.length !== 0) {
      toast(WARNING_MESSAGE.UPDATE_WARNING_MSG, {
        type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
      });
    }
  };

  const onSubmit = async (data) => {
    await updateGateway(selectedGatewayId, data);
    onClose();
    reset();
    setEditMode(false);
  };

  const openEditMode = () => setEditMode(true);

  useEffect(() => {
    fetchSingleGateway(selectedGatewayId);
  }, []);

  useEffect(() => {
    if (gatewayDetails !== null)
      reset({
        ...gatewayDetails.data,
      });
  }, [gatewayDetails]);

  return (
    <Box sx={{ p: "10px 20px 0px 30px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          bottom: "40px",
        }}
      >
        <Button
          size="large"
          startIcon={<EditIcon />}
          onClick={openEditMode}
          disabled={editMode}
        ></Button>
      </Box>
      <Grid
        container
        direction="column"
        component="form"
        onSubmit={handleSubmit(onSubmit, validate)}
        rowGap={2}
      >
        <Controller
          name="serialNumber"
          control={control}
          render={({ field }) => (
            <FormControl>
              <TextField
                sx={{
                  input: {
                    background: !editMode ? "#ECECEC" : "#fff",
                    borderRadius: "10px",
                  },
                }}
                {...field}
                disabled={!editMode}
                helperText={errors?.serialNumber?.message}
              />
            </FormControl>
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormControl>
              <TextField
                sx={{
                  input: {
                    background: !editMode ? "#ECECEC" : "#fff",
                    borderRadius: "10px",
                  },
                }}
                {...field}
                disabled={!editMode}
                helperText={errors?.name?.message}
              />
            </FormControl>
          )}
        />
        <Controller
          name="ipv4Address"
          control={control}
          render={({ field }) => (
            <FormControl>
              <TextField
                sx={{
                  input: {
                    background: !editMode ? "#ECECEC" : "#fff",
                    borderRadius: "10px",
                  },
                }}
                {...field}
                disabled={!editMode}
                helperText={errors?.ipv4Address?.message}
              />
            </FormControl>
          )}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2 }}>
          Attached Devices
        </Typography>
        <ConnectedDevices
          selectedGatewayId={selectedGatewayId}
          editMode={editMode}
        />
        <Box sx={{ p: "2px 0px 16px 0px", marginLeft: "auto" }}>
          <Button type="submit" variant="contained" disabled={!editMode}>
            Update Gateway
          </Button>
        </Box>
      </Grid>
    </Box>
  );
}
export default ViewGatewayDetails;
