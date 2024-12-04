const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const ensureAuthenticated = require("../Middlewares/Auth");

// Get all courses
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// Create a new course
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res
      .status(201)
      .json({ success: true, message: "Course created", course: newCourse });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create course",
      error: err.message,
    });
  }
});

// Update a course
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    res.status(200).json({
      success: true,
      message: "Course updated",
      course: updatedCourse,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update course",
      error: err.message,
    });
  }
});

// Delete a course
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    res.status(200).json({
      success: true,
      message: "Course deleted",
      course: deletedCourse,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: err.message,
    });
  }
});

module.exports = router;
