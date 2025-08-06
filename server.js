require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ✅ CORS setup to allow your frontend
app.use(
  cors({
    origin: ["https://kelvinndoma.vercel.app", "https://kelvinndomamutua.com"], // Array of allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you're sending cookies or auth headers
  })
);

// ✅ Connect to database
connectDB();

// ✅ JSON middleware
app.use(express.json());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Static file serving for uploads (if used)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Health check / welcome route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the Task Manager API — deployed on Render!");
});

// ✅ Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));