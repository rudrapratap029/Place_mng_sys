
const express = require("express");
const routes = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");


routes.post("/" , protect, createCompany);
routes.get("/", protect , getCompanies);
routes.get("/:id", protect , getCompanyById);
routes.put("/:id", protect , updateCompany);
routes.delete("/:id", protect , deleteCompany);

module.exports = routes;
