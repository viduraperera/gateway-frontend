import axios from "axios";

const API = axios.create({baseURL: '/'})

//gateway APIS

export const readAllGateway = () => API.get('gateway');
export const readGateway = (id) => API.get(`gateway/${id}`);

//device APIS

export const readAllDevices = () => API.get('device');
export const readDevice = (id) => API.get(`device/${id}`);