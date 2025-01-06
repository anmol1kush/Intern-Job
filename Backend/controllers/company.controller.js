import { Company } from "../Models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { CompanyName } = req.body;

        if (!CompanyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: CompanyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company",
                success: false,
            });
        }

        company = await Company.create({
            name: CompanyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in registerCompany:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false,
            });
        }

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error("Error in getCompany:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in getCompanyById:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; // Placeholder for Cloudinary logic
   console.log( name, description, website, location)
   
   const fileUri= getDataUri(file);
   const cloudResponse=  await cloudinary.uploader.upload(fileUri.content);
   const logo= cloudResponse.secure_url;
   const updateData = { name, description, website, location ,logo};
        // Add Cloudinary integration here if file is provided
        if (file) {
            // Example: updateData.logo = "uploaded_file_url";
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in updateCompany:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
