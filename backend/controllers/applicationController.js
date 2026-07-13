const Application = require("../models/Application");
const Student = require("../models/Student");
const Company = require("../models/Company");

const createApplication = async (req, res) => {
  try {
    // Get data from request body
    const { student, company } = req.body;

    // Check required fields
    if (!student || !company) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Company ID are required",
      });
    }

    // Check if student exists
    const studentExists = await Student.findById(student);

    if (!studentExists) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check if company exists
    const companyExists = await Company.findById(company);

    if (!companyExists) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      student,
      company,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "Student has already applied to this company",
      });
    }

    // Create application
    const application = await Application.create({
      student,
      company,
    });

    // Success response
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student")
      .populate("company");

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id)
      .populate("student")
      .populate("company");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getApplicationsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const applications = await Application.find({
      student: studentId,
    })
      .populate("student")
      .populate("company");

    return res.status(200).json({
      success: true,
      message: "Student applications fetched successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const getApplicationsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const applications = await Application.find({
      company: companyId,
    })
      .populate("student")
      .populate("company");

    return res.status(200).json({
      success: true,
      message: "Company applications fetched successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateApplicationStatus = async(req,res)=>{
  const {id} = req.params;
  const {status} = req.body;
  try{
    const application = await Application.findByIdAndUpdate(id ,{status}, {new : true})
    if(!application){
      return res.status(404).json({
        success : false,
        message : "Application not found"
      })
    }
    return res.status(200).json({
    success: true,
    message: "Application status updated successfully",
    data: application
});
    
  }
  catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }

}
const deleteApplication = async(req,res)=>{
  const {id} = req.params;
  try{
    const application = await Application.findByIdAndDelete(id);
    if(!application){
      return res.status(404).json({
        success : false,
        message : "Application not found"
      })
    }
    return res.status(200).json({
      success : true,
      message : "Application deleted successfully",
      data : application
    })

  }
  catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }

}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByStudent,
  getApplicationsByCompany,
  updateApplicationStatus,
  deleteApplication

};