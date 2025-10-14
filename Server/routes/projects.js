import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("userId", "name email");

    res.status(200).json({
      status: "success",
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });

    res.status(200).json({
      status: "success",
      data: {
        projects,
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
    const project = await Project.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!project)
      return res
        .status(404)
        .json({ status: "failed", message: "Project not found" });
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        project: newProject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project)
      return res
        .status(404)
        .json({ status: "failed", message: "Project not found" });
    res.status(200).json({
      status: "success",
      data: {
        project,
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
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ status: "failed", message: "Project not found" });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

export default router;
