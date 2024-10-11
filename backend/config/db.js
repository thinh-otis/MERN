// const mongoose = require("mongoose")

// async function connectDB(){
//     try{
//         await mongoose.connect(process.env.MONGODB_URI)
//     }catch(err){
//         console.log(err)
//     }
// }

// module.exports = connectDB


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};


module.exports = connectDB;
