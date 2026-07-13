const Company = require("../models/Company");
  
//     create company 
const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: company
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

      // get company 
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            data: companies
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
//    update comapny 

const updateCompany = async (req, res) => {
    try {

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};        

//   get comapny by id 
const getCompanyById = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Company fetched successfully",
            data: company
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

//      delete 

const deleteCompany = async(req,res)=>{
  try{
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
    return res.status(404).json({
        success: false,
        message: "Company not found"
    });
}

    return res.status(200).json({
      success : true,
      message : "Company deleted successfully",
      data : company 
    })

  }
  catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }

}


module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};