import axios from 'axios';

const baseURL = 'http://localhost:8080/tools';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTools = async () => (await api.get(baseURL)).data;
export const addTool = async (tool) => (await api.post(baseURL, tool)).data;
export const removeTool = async (id) => (await api.delete(`${baseURL}/${id}`)).data;
