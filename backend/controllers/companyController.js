const Company = require("../models/company");

// Create Company
const createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Companies
const getCompanies = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          {
            companyName: {
              $regex: search,
              $options: "i",
            },
          },
          {
            jobRole: {
              $regex: search,
              $options: "i",
            },
          },
          {
            location: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const totalCompanies = await Company.countDocuments(filter);

    const companies = await Company.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      totalCompanies,
      currentPage: page,
      totalPages: Math.ceil(totalCompanies / limit),
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// Get Company By ID
const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      const error = new Error("Company not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// Update Company
const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      const error = new Error("Company not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Company
const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      const error = new Error("Company not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};