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

    // Current Page
    const page = Number(req.query.page) || 1;

    // Records per Page
    const limit = Number(req.query.limit) || 5;

    // Skip Formula
    const skip = (page - 1) * limit;

    // Total Companies
    const totalCompanies = await Company.countDocuments();

    // Fetch Companies
    const recentCompanies = await Company.find()
      .select("companyName jobRole package location status lastDateToApply")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total Pages
    const totalPages = Math.ceil(totalCompanies / limit);

    return res.status(200).json({
      success: true,
      message: "Recent companies fetched successfully",
      currentPage: page,
      totalPages,
      totalCompanies,
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

//  Application Status Analhtics

const getApplicationStatusAnalytics = async(req,res,next)=>{

  try{
    const applicationStatus = await Application.aggregate([{
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
       }])
       return res.status(200).json({
        success : true,
        message :  "Application status analytics fetched successfully",
        data : applicationStatus,
       })

  }
  catch(error){
    next(error)
  }
}

// Students by Branch Analytics
const getStudentsByBranch = async (req, res, next) => {
  try {
    const studentsByBranch = await Student.aggregate([
      {
        $group: {
          _id: "$branch",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Students by branch fetched successfully",
      data: studentsByBranch,
    });
  } catch (error) {
    next(error);
  }
};
// Company Status Analytics
const getCompanyStatusAnalytics = async (req, res, next) => {
  try {
    const companyStatus = await Company.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Company status analytics fetched successfully",
      data: companyStatus,
    });
  } catch (error) {
    next(error);
  }
};

const searchDashboard = async(req,res,next)=>{
try{
  const{branch , status } = req.query;
  const studentFilter = {}
  const applicationFilter = {}

  if(branch){
    studentFilter.branch = branch;
  }
  if(status){
    applicationFilter.status= status;
  }

    const students = await Student.find(studentFilter);

    const applications = await Application.find(applicationFilter)
      .populate("student", "name")
      .populate("company", "companyName");

    return res.status(200).json({
      success: true,
      message: "Dashboard search fetched successfully",
      data: {
        students,
        applications,
      }


      })


}
catch(error){
  next(error);
}

}

module.exports = {
  getDashboardSummary,
  getRecentCompanies,
  getUpcomingDeadlines,
  getRecentApplications,
  getApplicationStatusAnalytics,
  getStudentsByBranch ,
   getCompanyStatusAnalytics,
   searchDashboard,
};
 
