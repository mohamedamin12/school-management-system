const mongoose = require('mongoose');

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB..."));
}

module.exports = connectToDB;