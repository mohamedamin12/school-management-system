const Student = require('../models/studentModel');
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadMultipleImages } = require("../middlewares/uploadImageMiddleware");
const Factory = require('./handlersFactory');

exports.uploadImages = uploadMultipleImages([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 4,
  },
]);

exports.resizeImage = async (req, res, next) => {

  if (req.files && req.files.image) {
    const studentImageName = `student-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.image[0].buffer)
      .resize(200)
      .toFormat("jpeg")
      .toFile(`uploads/students/${studentImageName}`);
    req.body.image = studentImageName;
  }

  // if (req.files && req.files.images) {
  //   req.body.images = [];
  //   await Promise.all(
  //     req.files.images.map(async (img, index) => {
  //       const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
  //       await sharp(img.buffer)
  //         .resize(200)
  //         .toFormat("jpeg")
  //         .toFile(`uploads/products/${imageName}`);
  //       req.body.images.push(imageName);
  //     })
  //   );
  // }
  next();
};

exports.addStudent = Factory.insertOne(Student);

exports.getStudents = Factory.getAll(Student);

exports.getStudentById = Factory.getOne(Student);

exports.updateStudent = Factory.updateOne(Student);

exports.deleteStudent = Factory.deleteOne(Student);