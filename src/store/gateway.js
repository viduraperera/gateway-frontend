import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { MESSAGE_CONSTANT } from "../constants/constants";

const useGatewayStore = create((set, get) => ({
  inProgress: false,
  gateway: {
    data: [],
    success: false,
    message: "",
  },
  gatewayDetails: {
    data: [],
    success: false,
    message: "",
  },
  createGateway: async (newGateway) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: "/gateway",
        method: "post",
        data: newGateway,
      });
      toast(MESSAGE_CONSTANT.GATEWAY_CREATE, {
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
  fetchAllGateways: async () => {
    try {
      set({ inProgress: true });
      const { data } = await axios.request({
        baseURL: "/",
        url: "/gateway",
        method: "get",
      });
      set({
        gateway: {
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
  fetchSingleGateway: async (gatewayId) => {
    try {
      set({ inProgress: true });
      const { data } = await axios.request({
        baseURL: "/",
        url: `/gateway/${gatewayId}`,
        method: "get",
      });
      set({
        gatewayDetails: {
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
  updateGateway: async (id, updatedDetails) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/gateway/${id}`,
        method: "put",
        data: updatedDetails,
      });
      get().fetchAllGateways();
      toast(MESSAGE_CONSTANT.GATEWAY_UPDATE, {
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
  attachDevice: async (gatewayId, deviceDetails) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/gateway/${gatewayId}`,
        method: "patch",
        data: deviceDetails,
      });
      get().fetchSingleGateway(gatewayId);
      toast(MESSAGE_CONSTANT.GATEWAY_ADD_DEVICE, {
        type: MESSAGE_CONSTANT.STORE_TYPE_SUCCESSFUL,
      });
      return true;
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
  removeDevice: async (gatewayId, deviceDetails) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/gateway/${gatewayId}`,
        method: "patch",
        data: deviceDetails,
      });
      get().fetchSingleGateway(gatewayId);
      toast(MESSAGE_CONSTANT.GATEWAY_REMOVE_DEVICE, {
        type: MESSAGE_CONSTANT.STORE_TYPE_SUCCESSFUL,
      });
      return true;
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
  deleteGateway: async (id) => {
    try {
      set({ inProgress: true });
      await axios.request({
        baseURL: "/",
        url: `/gateway/${id}`,
        method: "delete",
      });
      get().fetchAllGateways({});
      toast(MESSAGE_CONSTANT.GATEWAY_DELETE, {
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

export default useGatewayStore;
