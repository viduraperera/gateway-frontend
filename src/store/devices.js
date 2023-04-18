import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { MESSAGE_CONSTANT } from "../constants/constants";

const useDeviceStore = create((set, get) => ({
  inProgress: false,
  devices: {
    data: [],
    success: false,
    message: "",
  },
  devicesDetails: {
    data: [],
    success: false,
    message: "",
  },
  createDevice: async (newDevice) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: "/device",
        method: "post",
        data: newDevice,
      });
      get().fetchAllDevices({});
      toast(MESSAGE_CONSTANT.DEVICE_CREATE, {
        type: MESSAGE_CONSTANT.STORE_TYPE_SUCCESSFUL,
      });
      return true;
    } catch (error) {
      if (axios.request.isAxiosError(error)) {
        toast(error.message, { type: MESSAGE_CONSTANT.STORE_TYPE_ERROR });
      } else
        toast(MESSAGE_CONSTANT.STORE_MSG_ERROR, {
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
        });
    } finally {
      set({ inProgress: false });
    }
  },
  fetchAllDevices: async () => {
    try {
      set({ inProgress: true });
      const { data } = await axios.request({
        baseURL: "/",
        url: "/device",
        method: "get",
      });
      set({
        devices: {
          data: data.data,
          success: true,
        },
      });
      return true;
    } catch (error) {
      if (axios.request.isAxiosError(error)) {
        toast(error.message, { type: MESSAGE_CONSTANT.STORE_TYPE_ERROR });
      } else
        toast(MESSAGE_CONSTANT.STORE_MSG_ERROR, {
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
        });
    } finally {
      set({ inProgress: false });
    }
  },
  fetchSingleDevice: async (deviceId) => {
    try {
      set({ inProgress: true });
      const { data } = await axios.request({
        baseURL: "/",
        url: `/device/${deviceId}`,
        method: "get",
      });
      set({
        devicesDetails: {
          data: data.data,
          success: true,
        },
      });
      return data;
    } catch (error) {
      if (axios.request.isAxiosError(error)) {
        toast(error.message, { type: MESSAGE_CONSTANT.STORE_TYPE_ERROR });
      } else {
        toast(MESSAGE_CONSTANT.STORE_MSG_ERROR, {
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
        });
      }
      return false;
    } finally {
      set({ inProgress: false });
    }
  },
  updateDevice: async (id, updatedDetails) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/device/${id}`,
        method: "put",
        data: updatedDetails,
      });
      get().fetchAllDevices();
      toast(MESSAGE_CONSTANT.DEVICE_UPDATE, {
        type: MESSAGE_CONSTANT.STORE_TYPE_SUCCESSFUL,
      });
      return true;
    } catch (error) {
      if (axios.request.isAxiosError(error)) {
        toast(error.message, { type: MESSAGE_CONSTANT.STORE_TYPE_ERROR });
      } else
        toast(MESSAGE_CONSTANT.STORE_MSG_ERROR, {
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
        });
    } finally {
      set({ inProgress: false });
    }
  },
  deleteDevice: async (id) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/device/${id}`,
        method: "delete",
      });
      get().fetchAllDevices({});
      toast(MESSAGE_CONSTANT.DEVICE_DELETE, {
        type: MESSAGE_CONSTANT.STORE_TYPE_SUCCESSFUL,
      });
      return true;
    } catch (error) {
      if (axios.request.isAxiosError(error)) {
        toast({
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
          message: error.message,
        });
      } else {
        toast({
          type: MESSAGE_CONSTANT.STORE_TYPE_ERROR,
          message: MESSAGE_CONSTANT.STORE_MSG_ERROR,
        });
      }
      return false;
    } finally {
      set({ inProgress: false });
    }
  },
}));

export default useDeviceStore;
