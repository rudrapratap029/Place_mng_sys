const Student = require("../models/Student");

// Create Student
const createStudent = async (req, res, next) => {
    try {
        const student = await Student.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });

    } catch (error) {
         next(error);
    }
};

// Get All Students
const getStudents = async (req, res , next) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: students
        });

    } catch (error) {
          next(error);
    }
};

// Get Student By ID
const getStudentById = async (req, res , next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            const error = new Error("Student not found");
            error.statusCode = 404;

    throw error;
        }

        return res.status(200).json({
            success: true,
            message: "Student fetched successfully",
            data: student
        });

    } catch (error) {
          next(error);
    }
};

// Update Student
const updateStudent = async (req, res , next) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
          

    const error = new Error("Student not found");
    error.statusCode = 404;

    throw error;
}
        

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });

    } catch (error) {
         next(error);
    }
};

// Delete Student
const deleteStudent = async (req, res , next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

       if (!student) {

    const error = new Error("Student not found");
    error.statusCode = 404;

    throw error;
}

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: student
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};