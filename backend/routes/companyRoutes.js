
const express = require("express");
const routes = express.Router();
const { protect } = require("../middleware/authMiddleware");
const companyValidatorsRules = require("../validators/companyValidators");
const validate = require("../middleware/validationMiddleware");
const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");


routes.post("/", protect, companyValidatorsRules,validate, createCompany
);
routes.get("/", protect , getCompanies);
routes.get("/:id", protect , getCompanyById);
routes.put("/:id", protect , updateCompany);
routes.delete("/:id", protect , deleteCompany);

module.exports = routes;
