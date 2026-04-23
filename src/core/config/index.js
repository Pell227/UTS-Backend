require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3200,
    mongoURI: process.env.MONGO_URI
};