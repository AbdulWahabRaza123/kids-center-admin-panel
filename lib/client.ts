import axios from "axios";
const client = axios.create({
  baseURL: "https://kids-center-backend-seven.vercel.app/api/",
  // baseURL: "http://localhost:5000/api/",
});
export { client };
