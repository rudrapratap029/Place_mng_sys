const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboardSummary,
  getRecentCompanies,
  getUpcomingDeadlines,
  getRecentApplications,
  getApplicationStatusAnalytics,
  getStudentsByBranch,
  getCompanyStatusAnalytics,
  searchDashboard,
} = require("../controllers/dashboardController");

// Dashboard Summary
router.get("/summary", protect, getDashboardSummary);

// Recent Companies
router.get("/recent-companies", protect, getRecentCompanies);

// Upcoming Deadlines
router.get("/upcoming-deadlines", protect, getUpcomingDeadlines);

// Recent Applications
router.get("/recent-applications", protect, getRecentApplications);

// Application Status Analytics
router.get("/application-status", protect, getApplicationStatusAnalytics);

// Students by Branch
router.get("/students-by-branch", protect, getStudentsByBranch);

// Company Status Analytics
router.get("/company-status", protect, getCompanyStatusAnalytics);

// Dashboard Search
router.get("/search", protect, searchDashboard);

module.exports = router;