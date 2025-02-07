const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Number,
      required: [true, "Teacher ID Required"],
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    subjects: [
      {
        type: String,
      },
    ],
    class: [
      {
        type: String,
      },
    ],
    Address: {
      type: String,
    },
    image: String,
  },
  { timestamps: true }
);



module.exports = mongoose.model("Teacher", teacherSchema);