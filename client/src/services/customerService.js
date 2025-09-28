import axios from "axios";

const API_BASE = "https://crm-integration-ruddy.vercel.app/api/customers"; // adjust to your backend

export const getCustomers = () =>
  axios.get(API_BASE).then((res) => res.data.cust);
export const createCustomer = (data) =>
  axios.post(API_BASE, data).then((res) => res.data.newCust);
export const updateCustomer = (id, data) =>
  axios.patch(`${API_BASE}/${id}`, data).then((res) => res.data.updateCust);
export const deleteCustomer = (id) =>
  axios.delete(`${API_BASE}/delete-customers/${id}`).then((res) => res.data);
