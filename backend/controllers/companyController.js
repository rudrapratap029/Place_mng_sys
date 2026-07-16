const Company = require("../models/Company");
  
//     create company 
const createCompany = async (req, res , next ) => {
    try {
        const company = await Company.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
        });

    } catch (error) {

        next(error);

    }
};

      // get company 
const getCompanies = async (req, res , next) => {
    try {
        const companies = await Company.find();

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            data: companies
        });

    } catch (error) {

       next(error);
    }
};
//    update comapny 

const updateCompany = async (req, res , next ) => {
    try {

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!company){

    const error = new Error("Company not found");
    error.statusCode = 404;

    throw error;
}

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });
        

    } catch (error) {

       next(error);
    }
};        

//   get comapny by id 
const getCompanyById = async (req, res ,next) => {
    try {

        const company = await Company.findById(req.params.id);
         if(!company){

    const error = new Error("Company not found");
    error.statusCode = 404;

    throw error;
}


        return res.status(200).json({
            success: true,
            message: "Company fetched successfully",
            data: company
        });
       
    } catch (error) {
        next(error); 
    }
};

//      delete 

const deleteCompany = async(req,res, next)=>{
  try{
    const company = await Company.findByIdAndDelete(req.params.id);
   if(!company){

    const error = new Error("Company not found");
    error.statusCode = 404;

    throw error;
}

    return res.status(200).json({
      success : true,
      message : "Company deleted successfully",
      data : company 
    })

  }
  catch(error){
   next(error);
  }

}


module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};