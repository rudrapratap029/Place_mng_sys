 const {body} = require("express-validator");

 const applicationValidatorsRules  = [
 body("student")
 .notEmpty()
 .withMessage("Student Id is required")
 .isMongoId()
 .withMessage("Invalid student is invalid "),

 body("company")
  .notEmpty()
  .withMessage("Company ID is required")
  .isMongoId()
  .withMessage("Invalid Company ID"),

body("status")
  .optional()
  .isIn(["Applied", "Selected", "Rejected"])
  .withMessage("Status must be Applied, Selected or Rejected")

 ]

 module.exports = applicationValidatorsRules;