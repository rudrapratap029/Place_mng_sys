
const {body} = require("express-validator")
const companyValidatorsRules = [
     body("companyName")
     .trim()
     .notEmpty()
     .withMessage("Company name required"),

     body("description")
     .trim()
     .notEmpty()
     .withMessage("company description required"),

     body("package")
     .isFloat({min : 0})
     .withMessage("Company package must be greater than equal to zero"),

     body("eligibilityCGPA")
     .isFloat({min :0 , max : 10})  
     .withMessage("Eligibility CGPA must be between 0 and 10"),

     body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Open", "Closed"])
    .withMessage("Status must be either Open or Closed"),

     body("lastDateToApply")
     .notEmpty()
     .withMessage("Last date is required")
     .isDate()
     .withMessage("Please enter a valid date"),

     body("location")
     .trim()
     .notEmpty()
     .withMessage("Location is required"),

     body("jobRole")
     .trim()
     .notEmpty()
     .withMessage("Job role is required"),

     body("openings")
    .isInt({ min: 1 })
    .withMessage("Openings must be at least 1"),

]

module.exports = companyValidatorsRules;