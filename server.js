require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path= require('path');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const reportRoutes = require("./routes/reportRoutes")

const app = express();

const port = process.env.PORT || 4000


// connect database
connectDB();
// Middleware
app.use(express.json());

app.use(cors())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Welcome route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the Task Manager API — deployed on Vercel!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`Server is running at ${PORT}`))