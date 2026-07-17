const express = require("express");
const router = express.Router();

const {getDashboardSummary, getRecentCompanies ,getUpcomingDeadlines ,  getRecentApplications} = require("../controllers/dashboardController");

router.get("/summary" , getDashboardSummary);
router.get("/recent-companies", getRecentCompanies);
router.get("/upcoming-deadlines", getUpcomingDeadlines);
router.get("/recent-applications", getRecentApplications);
module.exports = router;