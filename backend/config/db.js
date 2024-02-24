const mongoose = require("mongoose");

const connectDB = async () => {
    // console.log("*************");
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo Database successfully connected ${conn.connection.host}`.bold.green);
    } catch (error) {
        console.log("Error", error);
        process.exit();
    }
};

module.exports = connectDB;