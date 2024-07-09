import axios from "axios";
const client = axios.create({
   baseURL: "https://kids-center-backend-seven.vercel.app/",
  //baseURL: "http://localhost:5000/",
});
export { client };
