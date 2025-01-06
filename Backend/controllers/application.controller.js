
import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false
            })
        };
        const existingapplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingapplication) {
            return res.status(404).json({
                message: "You have applied for this job",
                success: false
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        // create new application

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,

        });
        job.application.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Job applied successfully",
            success: true,
        })

    } catch (error) {

        console.log(error);

    }
}
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },

            }

        });
        if (!application) {
            return res.status(404).json({
                message: "No Application ",
                success: false,
            })
        };
        return res.status(200).json({
            application,
            success: true
        });




    } catch (error) {
        console.log(error);



    }
}
export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "application",
            populate: {
                path: "applicant", // Assuming the applicant is referenced in Application
               
            },
        });
       

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        // Validate if status is provided
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }

        // Validate if the status value is valid
        const validStatuses = ["pending", "accepted", "rejected"];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: `Invalid status. Allowed values are: ${validStatuses.join(", ")}`,
                success: false,
            });
        }

        // Find the application by ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            });
        }

        // Update the status and save
        application.status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(); // Capitalize first letter
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            application,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
