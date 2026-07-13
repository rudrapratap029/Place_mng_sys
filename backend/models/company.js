
const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
{
    companyName: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    package: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    eligibilityCGPA: {
        type: Number,
        required: true
    },

    jobRole: {
        type: String,
        required: true,
        trim: true
    },

    lastDateToApply: {
        type: Date,
        required: true
    },

    openings: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open"
    }
},
{
    timestamps: true
}
);
  
const Company = mongoose.model( "Company" , companySchema);

module.exports = Company;