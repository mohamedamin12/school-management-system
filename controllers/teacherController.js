const Teacher = require("../models/teacherModel");
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
    const teacherImageName = `teacher-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.files.image[0].buffer)
      .resize(200)
      .toFormat("jpeg")
      .toFile(`uploads/teachers/${teacherImageName}`);
    req.body.image = teacherImageName;
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

exports.addTeacher = Factory.insertOne(Teacher);

exports.getTeachers = Factory.getAll(Teacher);

exports.getTeacherById = Factory.getOne(Teacher);

exports.updateTeacher = Factory.updateOne(Teacher);

exports.deleteTeacher = Factory.deleteOne(Teacher);