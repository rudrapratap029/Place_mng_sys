const Student = require("../models/student");
const Company = require("../models/company");
const Application = require("../models/application");

const getDashboardSummary = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();

    const totalCompanies = await Company.countDocuments();

    const totalApplications = await Application.countDocuments();

    const totalSelectedApplications =
      await Application.countDocuments({ status: "Selected" });

    const totalRejectedApplications =
      await Application.countDocuments({ status: "Rejected" });

    const totalAppliedApplications =
      await Application.countDocuments({ status: "Applied" });

    return res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data: {
        totalStudents,
        totalCompanies,
        totalApplications,
        totalSelectedApplications,
        totalRejectedApplications,
        totalAppliedApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};
// Recent Companies
const getRecentCompanies = async (req, res, next) => {
  try {
    const recentCompanies = await Company.find()
     .select("companyName jobRole package location status lastDateToApply")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Recent companies fetched successfully",
      data: recentCompanies,
    });
  } catch (error) {
    next(error);
  }
};
// Upcoming Deadlines
const getUpcomingDeadlines = async (req, res, next) => {
  try {
    // Current Date
    const today = new Date();

    // Fetch companies whose deadline has not passed
    const upcomingDeadlines = await Company.find({
      lastDateToApply: { $gte: today },
      status: "Open",
    })
      .select(
        "companyName jobRole package location lastDateToApply status"
      )
      .sort({ lastDateToApply: 1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Upcoming deadlines fetched successfully",
      data: upcomingDeadlines,
    });
  } catch (error) {
    next(error);
  }
};
// Recent Applications
const getRecentApplications = async (req, res, next) => {
  try {
    const recentApplications = await Application.find()
      .populate("student", "name")
      .populate("company", "companyName")
      .select("student company status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Recent applications fetched successfully",
      data: recentApplications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardSummary,
  getRecentCompanies,
  getUpcomingDeadlines,
  getRecentApplications,
};
 
