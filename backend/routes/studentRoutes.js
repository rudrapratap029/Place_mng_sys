const express = require("express");
const router = express.Router();
const studentValidationRules = require("../validators/studentValidator");
const validate = require("../middleware/validationMiddleware");
const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// Create Student
router.post("/", protect, studentValidationRules,
  validate, createStudent);

// Get All Students
router.get("/", protect, getStudents);

// Get Student By ID
router.get("/:id", protect , getStudentById);

// Update Student
router.put("/:id", protect,  updateStudent);

// Delete Student
router.delete("/:id", protect , deleteStudent);

module.exports = router;