import { joiResolver } from "@hookform/resolvers/joi";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import useGatewayStore from "../../store/gateway";
import { REGULAR_EXPRESSIONS } from "../../constants/constants";

function CreateGateWay() {
  const { createGateway } = useGatewayStore((state) => ({
    createGateway: state.createGateway,
  }));

  const schema = Joi.object({
    serialNumber: Joi.string()
      .pattern(REGULAR_EXPRESSIONS.SERIAL_NUMBER_PATTEN)
      .required()
      .label("Serial Number"),
    name: Joi.string().required().label("Name"),
    ipv4Address: Joi.string()
      .pattern(REGULAR_EXPRESSIONS.IPV4ADDRESS_PATTEN)
      .required()
      .label("Ip Address"),
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

  const onSubmit = async (data) => {
    await createGateway(data);
    reset();
  };
  return (
    <Grid
      container
      direction="column"
      sx={{ p: "10px 20px 0px 30px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      rowGap={2}
    >
      <Controller
        name="serialNumber"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Serial Number</InputLabel>
            <TextField {...field} helperText={errors?.serialNumber?.message} />
          </FormControl>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Name</InputLabel>
            <TextField {...field} helperText={errors?.name?.message} />
          </FormControl>
        )}
      />
      <Controller
        name="ipv4Address"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Ip Address</InputLabel>
            <TextField {...field} helperText={errors?.ipv4Address?.message} />
          </FormControl>
        )}
      />
      <Box sx={{ p: "16px 0px 16px 0px", marginLeft: "auto" }}>
        <Button type="submit" variant="contained">
          Create Gateway
        </Button>
      </Box>
    </Grid>
  );
}
export default CreateGateWay;
