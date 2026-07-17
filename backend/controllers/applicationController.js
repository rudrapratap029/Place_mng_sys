const Application = require("../models/application");
const Student = require("../models/student");
const Company = require("../models/company");


// Create Application
const createApplication = async (req, res, next) => {
  try {

    const { student, company } = req.body;


    if (!student || !company) {

      const error = new Error(
        "Student ID and Company ID are required"
      );

      error.statusCode = 400;

      throw error;
    }


    const studentExists = await Student.findById(student);

    if (!studentExists) {

      const error = new Error("Student not found");

      error.statusCode = 404;

      throw error;
    }


    const companyExists = await Company.findById(company);

    if (!companyExists) {

      const error = new Error("Company not found");

      error.statusCode = 404;

      throw error;
    }


    const existingApplication = await Application.findOne({
      student,
      company,
    });


    if (existingApplication) {

      const error = new Error(
        "Student has already applied to this company"
      );

      error.statusCode = 409;

      throw error;
    }


    const application = await Application.create({
      student,
      company,
    });


    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });


  } catch (error) {

    next(error);

  }
};



// Get All Applications
const getApplications = async (req, res, next) => {

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


  } catch(error){

    next(error);

  }
};



// Get Application By ID
const getApplicationById = async (req, res, next) => {

  try {

    const application = await Application.findById(req.params.id)
      .populate("student")
      .populate("company");


    if(!application){

      const error = new Error("Application not found");

      error.statusCode = 404;

      throw error;

    }


    return res.status(200).json({
      success:true,
      message:"Application fetched successfully",
      data:application
    });


  } catch(error){

    next(error);

  }
};



// Get Applications By Student
const getApplicationsByStudent = async(req,res,next)=>{

  try{

    const applications = await Application.find({
      student:req.params.studentId
    })
    .populate("student")
    .populate("company");


    return res.status(200).json({
      success:true,
      message:"Student applications fetched successfully",
      count:applications.length,
      data:applications
    });


  }catch(error){

    next(error);

  }

};



// Get Applications By Company
const getApplicationsByCompany = async(req,res,next)=>{

  try{

    const applications = await Application.find({
      company:req.params.companyId
    })
    .populate("student")
    .populate("company");


    return res.status(200).json({
      success:true,
      message:"Company applications fetched successfully",
      count:applications.length,
      data:applications
    });


  }catch(error){

    next(error);

  }

};



// Update Application Status
const updateApplicationStatus = async(req,res,next)=>{

  try{

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status:req.body.status
      },
      {
        new:true
      }
    );


    if(!application){

      const error = new Error("Application not found");

      error.statusCode = 404;

      throw error;

    }


    return res.status(200).json({
      success:true,
      message:"Application status updated successfully",
      data:application
    });


  }catch(error){

    next(error);

  }

};



// Delete Application
const deleteApplication = async(req,res,next)=>{

  try{

    const application = await Application.findByIdAndDelete(
      req.params.id
    );


    if(!application){

      const error = new Error("Application not found");

      error.statusCode = 404;

      throw error;

    }


    return res.status(200).json({
      success:true,
      message:"Application deleted successfully",
      data:application
    });


  }catch(error){

    next(error);

  }

};



module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationsByStudent,
  getApplicationsByCompany,
  updateApplicationStatus,
  deleteApplication
};