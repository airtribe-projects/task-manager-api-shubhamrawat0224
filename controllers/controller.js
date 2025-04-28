const data = require("../task.json");
const tasks = data.tasks;

function taskID() {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
}

function getTasks(req, res) {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function createTask(req, res) {
  try {
    const { title, description, completed } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = {
      id: taskID(),
      title,
      description,
      completed: completed || false,
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
    const { title, description, completed } = req.body;

    if (typeof completed !== "boolean" && completed !== undefined) {
      return res.status(400).json({ message: "Completed must be a boolean" });
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

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
