import mongoose from "mongoose";

const Companyschema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Fixed typo
        unique: true
    },
    description: {
        type: String,
        required: false // Optional field
    },
    website: {
        type: String,
        required: false // Optional field
    },
    location: {
        type: String,
        required: false // Optional field
    },
    logo: {
        type: String,
        required: false // Optional field
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Fixed typo
    }
}, { timestamps: true });

export const Company = mongoose.model('Company', Companyschema);
