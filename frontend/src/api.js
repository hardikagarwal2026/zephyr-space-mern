import axios from "axios";

// Create an API instance with the backend URL
const API = axios.create({ baseURL: "http://localhost:5000/" });

export const registerUser = (userData) => API.post("/users/register", userData);
