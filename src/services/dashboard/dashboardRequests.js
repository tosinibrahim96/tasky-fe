import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const getInfo = async () => {
  const response = await axios.get(`${baseUrl}/dashboard`);
  return response.data;
};

export { getInfo };
