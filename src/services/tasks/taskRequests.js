import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const save = async (newTask) => {
  const response = await axios.post(`${baseUrl}/tasks`, newTask);
  return response.data;
};

const update = async (taskData) => {
  const response = await axios.put(`${baseUrl}/tasks/${taskData.id}`, taskData);
  return response.data;
};

const remove = async (taskId) => {
  const response = await axios.delete(`${baseUrl}/tasks/${taskId}`);
  return response.data;
};

export { save, update, remove };
