const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateToken = require("../utils/generateToken");
const generateRefreshToken = require("../utils/generateRefreshToken");


// Register Admin
const registerAdmin = async (req, res, next) => {

  try {

    const { name, email, password, role } = req.body;


    const existingAdmin = await Admin.findOne({ email });


    if (existingAdmin) {

      const error = new Error("Admin already exists");
      error.statusCode = 400;

      throw error;

    }


    const admin = await Admin.create({
      name,
      email,
      password,
      role,
    });


    const adminResponse = admin.toObject();

    delete adminResponse.password;


    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: adminResponse,
    });


  } catch(error){

    next(error);

  }

};




// Login Admin
const loginAdmin = async(req,res,next)=>{

  try{

    const {email,password}=req.body;


    if(!email || !password){

      const error = new Error(
        "Email and password are required"
      );

      error.statusCode = 400;

      throw error;

    }


    const admin = await Admin.findOne({email});


    if(!admin){

      const error = new Error(
        "Invalid email or password"
      );

      error.statusCode = 401;

      throw error;

    }


    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );


    if(!isMatch){

      const error = new Error(
        "Invalid email or password"
      );

      error.statusCode = 401;

      throw error;

    }


    const token = generateToken(admin._id);

    const refreshToken = generateRefreshToken(admin._id);


    const adminResponse = admin.toObject();

    delete adminResponse.password;


    return res.status(200).json({

      success:true,
      message:"Login successful",
      accessToken:token,
      refreshToken,
      admin:adminResponse

    });


  }catch(error){

    next(error);

  }

};




// Logout Admin
const logoutAdmin = async(req,res,next)=>{

  try{

    return res.status(200).json({

      success:true,
      message:"Logged out successfully"

    });


  }catch(error){

    next(error);

  }

};




// Forgot Password
const forgotPassword = async(req,res,next)=>{

  try{

    const {email}=req.body;


    const admin = await Admin.findOne({email});


    if(!admin){

      const error = new Error("Admin not found");

      error.statusCode = 404;

      throw error;

    }


    const resetToken = admin.getResetPasswordToken();


    await admin.save({
      validateBeforeSave:false
    });


    const resetUrl =
    `http://localhost:3000/api/auth/resetpassword/${resetToken}`;


    return res.status(200).json({

      success:true,
      message:"Password reset link generated successfully",
      resetUrl

    });


  }catch(error){

    next(error);

  }

};




// Reset Password
const resetPassword = async(req,res,next)=>{

  try{


    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");



    const admin = await Admin.findOne({

      resetPasswordToken,

      resetPasswordExpire:{
        $gt:Date.now()
      }

    });



    if(!admin){

      const error = new Error(
        "Invalid or expired reset token"
      );

      error.statusCode = 400;

      throw error;

    }



    admin.password = req.body.password;


    admin.resetPasswordToken = undefined;

    admin.resetPasswordExpire = undefined;



    await admin.save();



    return res.status(200).json({

      success:true,
      message:"Password reset successfully"

    });



  }catch(error){

    next(error);

  }

};




// Refresh Access Token
const refreshAccessToken = async(req,res,next)=>{


  try{


    const {refreshToken}=req.body;



    if(!refreshToken){

      const error = new Error(
        "Refresh token is required"
      );

      error.statusCode = 401;

      throw error;

    }



    const decoded = jwt.verify(

      refreshToken,

      process.env.JWT_REFRESH_SECRET

    );



    const admin = await Admin.findById(decoded.id);



    if(!admin){

      const error = new Error("Admin not found");

      error.statusCode = 404;

      throw error;

    }



    const accessToken = generateToken(admin._id);



    return res.status(200).json({

      success:true,

      message:"New access token generated successfully",

      accessToken

    });



  }catch(error){

    next(error);

  }

};



module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};