import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const getAll = async (currentPage) => {
  const response = await axios.get(`${baseUrl}/projects?page=${currentPage}`);
  return response.data;
};

const getOne = async (projectId) => {
  const response = await axios.get(`${baseUrl}/projects/${projectId}`);
  return response.data;
};

const save = async (projectData) => {
  const response = await axios.post(`${baseUrl}/projects`, projectData);
  return response.data;
};

const update = async (projectId, projectData) => {
  const response = await axios.put(
    `${baseUrl}/projects/${projectId}`,
    projectData
  );
  return response.data;
};

const remove = async (projectId) => {
  const response = await axios.delete(`${baseUrl}/projects/${projectId}`);
  return response.data;
};

export { getAll, getOne, save, update, remove };
