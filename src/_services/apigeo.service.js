import axios from "axios";

const AxiosApiGeo = axios.create({
  baseURL: "https://geo.api.gouv.fr",
  headers: { "Content-Type": "multipart/form-data" },
});


export default AxiosApiGeo;
