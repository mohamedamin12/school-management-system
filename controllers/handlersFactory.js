const asyncHandler = require("express-async-handler");
const fs = require('fs');
const path = require('path');
const ApiError = require('../utils/apiError');

exports.getAll = (Model) => 
  asyncHandler(async (req, res) => {
    const model = await Model.find();
    res.json({ length: model.length, data: model });
  });

exports.insertOne = (Model) => 
  asyncHandler(async (req, res) => {
      const model = await Model.create(req.body);
      res.json(model);
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res) => {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return next(new ApiError(`Not Found ${req.params.id}`, 404));
    }
    res.json(model);
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!model) {
      return next(new ApiError(`Not Found ${req.params.id}`, 404));
    }
    res.json(model);
  });

const deleteImg = (imageName) => {
  let imageURL
  if (`${imageName}`.startsWith('student')) {
    imageURL = path.join(__dirname, "uploads", "students", imageName);
  console.log("=> ", imageURL);
  } else {
      imageURL = path.join(__dirname, "uploads", "teachers", imageName);
  console.log("=> ", imageURL);
}

  fs.unlink(imageURL, (err, next) => {
    if (err) {
      console.error();
    }
  });
};

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const modelToGetImg = await Model.findById(req.params.id);
    if (!modelToGetImg) {
      return next(new ApiError(`Not Found ${req.params.id}`, 404));
    }

    console.log("=> ", modelToGetImg.image);
    if (modelToGetImg.image) {
      deleteImg(modelToGetImg.image)
    }

    const model = await Model.findByIdAndDelete(req.params.id);
    res.json({ status: 'success' });
  });
