import { Routes, Route, Navigate } from "react-router-dom";
import Customers from "./pages/Customer";

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/customers" />} />

      {/* Customers page */}
      <Route path="/customers" element={<Customers />} />

      {/* Later you can add: <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}
