const express = require("express");

const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const applicationValidationRules = require("../validators/applicationValidator");
const validate = require("../middleware/validationMiddleware");
const {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByStudent,
  getApplicationsByCompany,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

// Create a new application
router.post(
  "/",
  protect,
  applicationValidationRules,
  validate,
  createApplication
);

// Get all applications
router.get("/", protect , getApplications);

// Get all applications of a specific student
router.get("/student/:studentId", protect , getApplicationsByStudent);

// Get all applications of a specific company
router.get("/company/:companyId", protect, getApplicationsByCompany);

// Get a single application by ID
router.get("/:id", protect , getApplicationById);

// Update application status
router.patch("/:id", protect , updateApplicationStatus);

// Delete application
router.delete("/:id",protect , deleteApplication);

module.exports = router;