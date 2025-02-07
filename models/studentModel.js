const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "student name required"],
      trim: true,
    },
    studentId: {
      type: Number,
      trim: true,
      required: [true, "student ID required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "student gender required"],
    },
    DOB: {
      type: Date,
      required: [true, "Date Of Birth required"],
    },
    level: {
      type: Number,
      required: [true, "student level required"],
    },
    class: {
      type: mongoose.Schema.ObjectId,
      ref: "Class",
    },
    studentPhone: {
      type: Number,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
    },
    fatherName: {
      type: String,
      trim: true,
      required: [true, "father name required"],
    },
    fatherJob: {
      type: String,
      trim: true,
      required: [true, "father job required"],
    },
    fatherPhone: {
      type: String,
      trim: true,
      required: [true, "father phone required"],
    },
    motherName: {
      type: String,
      trim: true,
      required: [true, "mother name required"],
    },
    motherJob: {
      type: String,
      trim: true,
      required: [true, "mother job required"],
    },
    motherPhone: {
      type: String,
      trim: true,
      required: [true, "mother phone required"],
    },
    Address: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);