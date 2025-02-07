const Class = require("../models/classModel");
const Factory = require('./handlersFactory');



exports.addClass = Factory.insertOne(Class);

exports.getClasses = Factory.getAll(Class);

exports.getClassById = Factory.getOne(Class);

exports.updateClass = Factory.updateOne(Class);

exports.deleteClass = Factory.deleteOne(Class);