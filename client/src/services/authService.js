import axios from "axios";

export const login = async (email, password) => {
  const res = await axios.post(`http://localhost:3000/api/login`, {
    username,
    password,
  });
  return res.data.user; // { token, user }
};
