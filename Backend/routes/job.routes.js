import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.route("/post").post(isAuthenticated,postJob)


router.route("/get").get(getAllJobs);
router.route("/admin").get(getAdminJobs);
router.route("/:id").get(getJobById); 

export default router;
