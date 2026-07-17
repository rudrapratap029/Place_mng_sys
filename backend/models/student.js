

const mongoose = require("mongoose");
console.trace("student.js loaded");

const studentSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true,
    trim : true
  },
  email :{
    type : String,
    required : true,
    unique : true,
    lowercase : true
 },
 branch :{
  type: String,
  required : true

 },

 cgpa:{
  type : Number,
  required : true
 }
},
{
  timestamps : true
});

const Student = mongoose.model("Student", studentSchema);

// console.log("Before model:", mongoose.models);

// const Student = mongoose.model("Student", studentSchema);

// console.log("After model:", mongoose.models);

module.exports = Student;