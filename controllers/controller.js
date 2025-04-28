const data = require("../task.json");
const tasks = data.tasks;

function taskID() {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((task) => task.id));
  return maxId + 1;
}

function getTasks(req, res) {
  try {
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

function createTask(req, res) {
  try {
    let { title, description, completed } = req.body;

    if (title != "" || null || description != "" || null) {
      if (completed == "" || null) {
        completed = false;
      }
      const newTask = {
        id: taskID(),
        title,
        description,
        completed: completed,
      };
      tasks.push(newTask);
      res.status(201).json({ newTask });
    } else {
      res.status(400).json("Bad request");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

function getTaskById(req, res) {
  try {
    let { id } = req.params;
    let task = tasks.find((task) => {
      return task.id == id;
    });
    if (task) {
      res.status(201).json({ task });
    } else {
      res.status(404).json({ message: "NOT FOUND" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

function updateTask(req, res) {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;

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

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res.status(500).json({ err });
  }
}

function deleteTask(req, res) {
  try {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
