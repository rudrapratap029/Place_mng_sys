const express = require("express");

const router = express.Router();

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
router.post("/", createApplication);

// Get all applications
router.get("/", getApplications);

// Get all applications of a specific student
router.get("/student/:studentId", getApplicationsByStudent);

// Get all applications of a specific company
router.get("/company/:companyId", getApplicationsByCompany);

// Get a single application by ID
router.get("/:id", getApplicationById);

// Update application status
router.patch("/:id", updateApplicationStatus);

// Delete application
router.delete("/:id", deleteApplication);

module.exports = router;