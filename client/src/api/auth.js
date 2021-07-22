import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await api.post("/api/auth/signup", data, config);
  return response;
};

export const signin = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await api.post("/api/auth/signin", data, config);
    return response;
  };
