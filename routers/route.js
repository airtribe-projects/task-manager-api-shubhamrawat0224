const express = require("express");
const router = express.Router();

let {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/controller");

router.get("/", getTasks);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
