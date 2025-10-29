const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let query = { user: req.user.id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
router.post(
  "/",
  [
    protect,
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, status } = req.body;

    try {
      const task = await Task.create({
        title,
        description,
        status,
        user: req.user.id,
      });

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
router.put(
  "/:id",
  [
    protect,
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    try {
      let task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // Make sure user owns task
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Not authorized",
        });
      }

      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await task.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
