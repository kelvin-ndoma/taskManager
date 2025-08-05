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

// ✅ Connect database
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (simplified and safe for now — hardcoded frontend origin)
app.use(cors({
  origin: "https://kelvinndoma.vercel.app", // or use process.env.CLIENT_URL if deployed
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400
}));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Welcome route
app.get("/", (req, res) => {
  res.send("✅ Welcome to the Task Manager API — deployed and live!");
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ✅ Start server (only works on platforms like Render/Railway — NOT Vercel)
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Gracefully handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
