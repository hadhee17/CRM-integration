import axios from "axios";

export const login = async ({ username, password }) => {
  const res = await axios.post(
    "https://crm-integration-ruddy.vercel.app/api/login",
    {
      username,
      password,
    }
  );

  // ✅ Return full response: { token, user }
  return res.data;
};

export const register = async ({ username, password }) => {
  const res = await axios.post(
    `https://crm-integration-ruddy.vercel.app/api/register`,
    {
      username,
      password,
    }
  );
  return res.data.user; // { token, user }
};
