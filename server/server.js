const connectDB = require("./config/DB");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");
const app = express();
//connect Database

const allowedOrigins = [
  "http://localhost:5173",
  "https://crm-integration-ykhj.vercel.app/", // local Vite dev server
  // deployed frontend
];
app.use(
  cors({
    origin: allowedOrigins, // allow your frontend
    credentials: true,
  })
);
app.use(express.json());
connectDB();

app.use("/api", authRoutes);
app.use("/api", caseRoutes);
app.use("/api", customerRoutes);

//error handling middleware for unhandled routes
app.all("*all", (req, res, next) => {
  const err = new Error(`cant find route ${req.originalUrl}`);
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

//global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
