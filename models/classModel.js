const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({

  name: {
    type: String,
    require: [true, "class name required"],
    trim: true,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    trim: true
  },
  head: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  },
  subject: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Subject'
  }]

}, { timestamps: true }

);

module.exports = mongoose.model("Class", classSchema)