import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection failed:", error.message);        // Exit the process with failure
    }
}

//Mongoose is a JavaScript library that provides a schema-based solution for modeling application data in MongoDB (a NoSQL database)