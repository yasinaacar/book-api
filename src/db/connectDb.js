const mongoose=require("mongoose");
const APIError=require("../utils/errors");

async function connectDb(){
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/book-api`);
        console.log("Database connection completed successfully");
    } catch (err) {
        console.log("An occurred error while connect to database", err);
        throw new APIError(`An occurred error while connect to database. Error: ${err}`, 500);
    }
};

module.exports=connectDb;