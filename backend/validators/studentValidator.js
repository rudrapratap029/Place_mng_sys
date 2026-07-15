const { body } = require("express-validator");

const studentValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("cgpa")
    .isFloat({ min: 0, max: 10 })
    .withMessage("CGPA must be between 0 and 10"),

  body("branch")
    .trim()
    .notEmpty()
    .withMessage("Branch is required"),
];

module.exports = studentValidationRules;