

const mongoose = require("mongoose");

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

// const Student = mongoose.model("Student", studentSchema);

module.exports = Student;