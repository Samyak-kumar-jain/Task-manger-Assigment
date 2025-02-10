const mongoose = require("mongoose")

const conntectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.log(error)
        console.error("❌ Failed to connect to the database. Error:", error.message);

    }
}
module.exports = conntectDb;