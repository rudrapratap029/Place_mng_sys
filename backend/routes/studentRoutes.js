const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// Create Student
router.post("/", protect, createStudent);

// Get All Students
router.get("/", protect, getStudents);

// Get Student By ID
router.get("/:id", protect , getStudentById);

// Update Student
router.put("/:id", protect,  updateStudent);

// Delete Student
router.delete("/:id", protect , deleteStudent);

module.exports = router;