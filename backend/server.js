require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Placement Management System");
});

// Global Error Handler (Always Last)
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});