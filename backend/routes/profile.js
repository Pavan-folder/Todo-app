const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
router.put(
  "/",
  [
    protect,
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

module.exports = router;
