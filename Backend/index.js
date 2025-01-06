import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applyRouter from "./routes/application.routes.js"




dotenv.config({});

const app = express();
   


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.post("/test", (req, res) => {
    console.log("Request received on /test");
    res.json({ message: "Test endpoint working" });
});


const corsOptions = {
    origin: 'http://localhost:5173', // Frontend's URL
    credentials: true,              // Allow cookies or other credentials
};

app.use(cors(corsOptions));


const PORT = process.env.PORT||3000;


app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applyRouter);


// "http://localhost:8000/api/v1/user/register";
// "http://localhost:8000/api/v1/user/login";

// "http://localhost:8000/api/v1/user/profile/update";





app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
