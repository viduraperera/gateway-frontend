import axios from "axios";

const API = axios.create({baseURL: '/'})

//gateway APIS

export const readAllGateway = () => API.get('gateway');
export const readGateway = (id) => API.get(`gateway/${id}`);
export const createGateway = () => API.post(`gateway`);
export const deleteGateway = (id) => API.delete(`gateway/${id}`);
export const updateGateway = (id) => API.put(`gateway/${id}`);
export const attachDeviceToGateway = (id) => API.patch(`gateway/${id}`);
export const removeDeviceFromGateway = (id) => API.patch(`gateway/${id}`);

//device APIS

export const readAllDevices = () => API.get('device');
export const readDevice = (id) => API.get(`device/${id}`);
export const createDevice = () => API.post(`device`);
export const deleteDevice = (id) => API.delete(`device/${id}`);
export const updateDevice = (id) => API.put(`device/${id}`);
