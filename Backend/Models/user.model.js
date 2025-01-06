import mongoose from 'mongoose';

const Userschema= new mongoose.Schema({
    fullname:{
    type:String,
    required: true
    },
    email:{
        type: String,
        required: true,
        unique: true



    },
    phonenumber:{
        type:Number,
        required: true


    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String,
        enum:['student','recruiter'],
        required: true
    },
    profile: {
        bio: { type: String, default: "" },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.ObjectId, ref: "Company" },
        profilephoto: { type: String, default: "" },
    },
    
},{timestamps: true});
export const User= mongoose.model('User',Userschema);