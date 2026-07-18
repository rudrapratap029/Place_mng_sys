const express = require("express");
const router = express.Router();

const {getDashboardSummary, getRecentCompanies ,getUpcomingDeadlines ,  getRecentApplications, getApplicationStatusAnalytics,  getStudentsByBranch , getCompanyStatusAnalytics,searchDashboard} = require("../controllers/dashboardController");

router.get("/summary" , getDashboardSummary);
router.get("/recent-companies", getRecentCompanies);
router.get("/upcoming-deadlines", getUpcomingDeadlines);
router.get("/recent-applications", getRecentApplications);
router.get("/application-status",getApplicationStatusAnalytics);
router.get("/students-by-branch", getStudentsByBranch);
router.get("/company-status", getCompanyStatusAnalytics);
router.get("/search", searchDashboard);
module.exports = router;