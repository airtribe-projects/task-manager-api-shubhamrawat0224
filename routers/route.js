const express = require("express");
const router = express.Router();

let {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByPriority,
} = require("../controllers/controller");

router.get("/", getTasks);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.get("/priority/:level", getTasksByPriority);

module.exports = router;
