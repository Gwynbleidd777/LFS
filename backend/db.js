const mongoose = require("mongoose");
require('dotenv').config();

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected To Database Successfully".cyan.underline)
    } catch(error){
        console.log(error);
        console.log("Could Not Connect to Database !".red.bold)
    }
};