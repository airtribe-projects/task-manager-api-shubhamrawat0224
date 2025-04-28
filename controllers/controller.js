const data = require("../task.json");
const tasks = data.tasks;

function taskID() {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
}

function getTasks(req, res) {
  try {
    let filteredTasks = [...tasks];

    // Filter by completion status
    if (req.query.completed !== undefined) {
      const completed = req.query.completed === "true";
      filteredTasks = filteredTasks.filter(
        (task) => task.completed === completed
      );
    }

    // Sort by creation date
    if (req.query.sort === "createdAt") {
      filteredTasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function getTasksByPriority(req, res) {
  try {
    const { level } = req.params;
    const validPriorities = ["low", "medium", "high"];

    if (!validPriorities.includes(level.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid priority level. Must be low, medium, or high",
      });
    }

    const filteredTasks = tasks.filter(
      (task) => task.priority.toLowerCase() === level.toLowerCase()
    );
    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function createTask(req, res) {
  try {
    const { title, description, completed, priority } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (
      priority &&
      !["low", "medium", "high"].includes(priority.toLowerCase())
    ) {
      return res
        .status(400)
        .json({ message: "Priority must be low, medium, or high" });
    }

    const newTask = {
      id: taskID(),
      title,
      description,
      completed: completed || false,
      priority: priority || "medium",
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function getTaskById(req, res) {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function updateTask(req, res) {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, completed, priority } = req.body;

    if (typeof completed !== "boolean" && completed !== undefined) {
      return res.status(400).json({ message: "Completed must be a boolean" });
    }

    if (
      priority &&
      !["low", "medium", "high"].includes(priority.toLowerCase())
    ) {
      return res
        .status(400)
        .json({ message: "Priority must be low, medium, or high" });
    }

    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed }),
      ...(priority !== undefined && { priority: priority.toLowerCase() }),
    };

    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function deleteTask(req, res) {
  try {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByPriority,
};
