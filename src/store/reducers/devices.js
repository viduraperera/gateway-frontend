import { createSlice } from "@reduxjs/toolkit";
import { readAllDevices, readDevice } from "../index";

const DeviceSlice = createSlice({
    name: "device",
    initialState: [],
    reducers: {
      setDevice: (state, action) => action.payload,
      setSingleDevice: (state, action) => action.payload,
    },
  });

export const { setDevice, setSingleDevice } = DeviceSlice.actions;

export const fetchAllItemsData = () => async (dispatch) => {
    const data = await readAllDevices();
    dispatch(setDevice(data));
  };
  
  export const fetchSingleItemData = (itemId) => async (dispatch) => {
    const data = await readDevice(itemId);
    dispatch(setSingleDevice(data));
  };

  export default DeviceSlice.reducer;
