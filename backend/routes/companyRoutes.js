
const express = require("express");
const routes = express.Router();

const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");


routes.post("/" , createCompany);
routes.get("/",getCompanies);
routes.get("/:id",getCompanyById);
routes.put("/:id",updateCompany);
routes.delete("/:id",deleteCompany);

module.exports = routes;
