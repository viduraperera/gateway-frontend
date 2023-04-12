import { createSlice } from "@reduxjs/toolkit";
import { readAllGateway, readGateway } from "../index";

const GatewaySlice = createSlice({
  name: "gateways",
  initialState: [],
  reducers: {
    setGateways: (state, action) => action.payload,
    setSingleGateway: (state, action) => action.payload,
  },
});

export const { setGateways, setSingleGateway } = GatewaySlice.actions;

export const fetchAllItemsData = () => async (dispatch) => {
    const data = await readAllGateway();
    dispatch(setGateways(data));
  };
  
  export const fetchSingleItemData = (itemId) => async (dispatch) => {
    const data = await readGateway(itemId);
    dispatch(setSingleGateway(data));
  };

  export default GatewaySlice.reducer;