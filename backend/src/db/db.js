const mongoose = require("mongoose");
const db_Name = require("../../constants");
const connectToMongo = async () => {
    try {
        const Instance = await mongoose.connect(`${process.env.MOGODB_URI}/${db_Name}`);

        console.log(`MongoDb Connected SuccessFully || DB Host ${Instance.connection.host}`);
    } catch (error) {
        console.log("Error Happen While Connecting the DataBase" , error);
        process.exit(1);
    }
};

module.exports = connectToMongo;