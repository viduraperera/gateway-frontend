import axios from "axios";

const API_BASE_URL = "http://localhost:4000/";

//gateway APIS

export const createGateway = async (data) => {
    const response = await axios.post(`${API_BASE_URL}gateway`, data);
    return response.data;
  };
  
  export const readGateway = async (id) => {
    const response = await axios.get(`${API_BASE_URL}gateway/${id}`);
    return response.data;
  };

  export const readAllGateway = async () => {
    const response = await axios.get(`http://localhost:4000/gateway`);
    return response.data;
  };
  
  export const updateGateway = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}gateway/${id}`, data);
    return response.data;
  };
  
  export const removeGateway = async (id) => {
    await axios.delete(`${API_BASE_URL}gateway/${id}`);
  };