import { createSlice } from "@reduxjs/toolkit";
import {
  readAllGateway,
  readGateway,
  createGateway,
  deleteGateway,
  updateGateway,
  attachDeviceToGateway,
  removeDeviceFromGateway,
} from "../index";

const GatewaySlice = createSlice({
  name: "gateways",
  initialState: [],
  reducers: {
    setGateways: (state, action) => action.payload,
    setSingleGateway: (state, action) => action.payload,
    setAddGateway: (state, action) => [...state, action.payload],
    setUpdateGateway: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    },
    setDeleteGateway: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setGateways,
  setSingleGateway,
  setAddGateway,
  setUpdateGateway,
  setDeleteGateway,
} = GatewaySlice.actions;

export const fetchAllGatewayData = () => async (dispatch) => {
  const data = await readAllGateway();
  dispatch(setGateways(data));
};

export const fetchSingleGatewayData = (gatewayId) => async (dispatch) => {
  const data = await readGateway(gatewayId);
  dispatch(setSingleGateway(data));
};

export const createGatewayData = (data) => async (dispatch) => {
  const newGateway = await createGateway(data);
  dispatch(setAddGateway(newGateway));
};

export const updateGatewayData = (data) => async (dispatch) => {
  const updatedItem = await updateGateway(data);
  dispatch(setUpdateGateway(updatedItem));
};

export const deleteGatewayData = (gatewayId) => async (dispatch) => {
  await deleteGateway(gatewayId);
  dispatch(setDeleteGateway({ id: gatewayId }));
};

export default GatewaySlice.reducer;
