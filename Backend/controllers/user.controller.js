import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudinary.js";

// Register User
export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
      //  console.log("Received request to register:", req.body);

        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Profile photo is missing",
                success: false,
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
      //  console.log("File URI content:", fileUri.content);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashPassword,
            role,
            profile: {
                profilephoto: cloudResponse.secure_url,
            },
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            message: `Internal Server Error: ${error.message}`,
            success: false,
        });
    }
};


// Login User
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }



        // Match password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false,
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist for this role",
                success: false,
            });
        }

        // Create JWT token
        const tokenData = { userID: user._id };
        console.log("SECRET_KEY:", process.env.SECRET_KEY);

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user: userResponse,
                success: true,
            });
    } catch (error) {
        console.error("Error in login:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true,
            });
    } catch (error) {
        console.error("Error in logout:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Update Profile
export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        const file = req.file; // Assuming you are using multer for file uploads
        const userId = req.id;

        // Validate input
        if (!fullname || !email) {
            return res.status(400).json({
                message: "Full name and email are required",
                success: false,
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Process file upload
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto" // Automatically detect file type (image, pdf, etc.)
            });
            if (!cloudResponse || !cloudResponse.secure_url) {
                return res.status(500).json({
                    message: "Failed to upload file to Cloudinary",
                    success: false,
                });
            }
        }

      //  console.log("Cloudinary Upload Response:", cloudResponse);

        // Parse skills (if provided)
        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        // Update fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;

        // Update resume if uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        // Prepare response
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: userResponse,
            success: true,
        });
    } catch (error) {
        console.error("Error in updateprofile:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
