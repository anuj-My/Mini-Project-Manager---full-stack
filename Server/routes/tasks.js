import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.projectId) {
      return res.status(400).json({
        status: "failed",
        message: "Title and projectId are required",
      });
    }
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.get("/project/:projectId", async (req, res) => {
  try {
    const { status, sort } = req.query;

    let filter = { projectId: req.params.projectId };

    if (status) filter.status = status;

    let query = Task.find(filter);

    if (sort) {
      query = query.sort({ dueDate: sort === "asc" ? 1 : -1 });
    }

    const tasks = await query.populate({
      path: "projectId",
      select: "title description userId",
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: "projectId",
      select: "title description userId",
    });

    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "failed",
        message: "Task not found!",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

export default router;
