const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware"); // Fixed path (removed extra dots)
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist
} = require("../controllers/taskController"); // Added missing controller imports

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData); // Protected dashboard data
router.get("/user-dashboard-data", protect, getUserDashboardData); // User-specific dashboard
router.get("/", protect, getTasks); // Get all tasks (Admin: all, User: assigned only)
router.get("/:id", protect, getTaskById); // Get task by ID (protected)
router.post("/", protect, adminOnly, createTask); // Create task (Admin only)
router.put("/:id", protect, updateTask); // Update task details (protected)
router.delete("/:id", protect, adminOnly, deleteTask); // Delete task (Admin only)
router.put("/:id/status", protect, updateTaskStatus); // Update task status (protected)
router.put("/:id/todo", protect, updateTaskChecklist); // Update checklist (protected)

module.exports = router;