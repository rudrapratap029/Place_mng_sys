const Student = require("../models/student");

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
const getStudents = async (req, res, next) => {
  try {
    // Query Parameters
    const { search, page = 1, limit = 5 } = req.query;

    // Search Filter
    let filter = {};

    if (search) {
      filter = {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
          {
            branch: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    // Pagination
    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    // Fetch Students
    const students = await Student.find(filter)
      .skip(skip)
      .limit(pageLimit);

    // Total Students
    const totalStudents = await Student.countDocuments(filter);

    // Total Pages
    const totalPages = Math.ceil(totalStudents / pageLimit);

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      totalStudents,
      currentPage,
      totalPages,
      data: students,
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