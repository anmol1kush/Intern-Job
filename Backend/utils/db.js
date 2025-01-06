import mongoose from 'mongoose';

const connectDB= async()=>{
    try {
        await mongoose.connect( process.env.MONGO_URI);
        console.log("MongooDB connected Successfully");
    } catch (error) {
        console.log("Error");
        
    }
}
export default connectDB;