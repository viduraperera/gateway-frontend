/* eslint-disable react/jsx-props-no-spreading */
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Button, FormControl, Grid, InputLabel, TextField } from '@mui/material';
import Joi from 'joi';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useGatewayStore from '../../store/gateway';
import useDeviceStore from '../../store/devices';

function CreateDevice() {
  const { createDevice } = useDeviceStore((state) => ({
    createDevice: state.createDevice
  }));

  const schema = Joi.object({
    vendor: Joi.string()
      .required()
      .label('Vendor'),
    status: Joi.string().required().label('Status'),
    gatewayId: Joi.string().allow(null, '').label('Gateway Id')
  });

  const {
    control,
    values,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      vendor: '',
      status: '',
      gatewayId: ''
    },
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data) => {
    await createDevice(data);
    reset();
  };
  return (
    <Grid
      container
      direction="column"
      sx={{ p: '10px 20px 0px 30px' }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      rowGap={2}
    >
      <Controller
        name="vendor"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Vendor</InputLabel>
            <TextField {...field} helperText={errors?.vendor?.message} />
          </FormControl>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Status</InputLabel>
            <TextField {...field} helperText={errors?.status?.message} required />
          </FormControl>
        )}
      />
      <Controller
        name="gatewayId"
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel>Select a gateway</InputLabel>
            <TextField {...field} helperText={errors?.gatewayId?.message} />
          </FormControl>
        )}
      />
      <Box sx={{ p: '16px 0px 16px 0px', marginLeft: 'auto' }}>
        <Button type="submit" variant="contained">
          Create Device
        </Button>
      </Box>
    </Grid>
  );
}
export default CreateDevice;
