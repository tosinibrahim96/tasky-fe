import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

const update = async (projectId, paymentInfo) => {
  const response = await axios.post(
    `${baseUrl}/projects/${projectId}/payments`,
    paymentInfo
  );
  return response.data;
};

export { update };
