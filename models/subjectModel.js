const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "subject name required"],
    trim:true
  }

}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);