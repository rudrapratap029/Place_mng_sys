
const errorHandler = (error,req,res,next) => {
 
  // MongoDB Duplicate Key Error
if (error.code === 11000) {
  error.statusCode = 400;
  error.message = "Email already exists";
   }


    // Validation Error
    if (error.name === "ValidationError") {
        error.statusCode = 400;
    }
    // Invalid MongoDB ObjectId
if (error.name === "CastError") {
    error.statusCode = 400;
    error.message = "Invalid ID";
}
     const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success : false,
    message : error.message || "Internal Server Error"
  });
}

module.exports = errorHandler;