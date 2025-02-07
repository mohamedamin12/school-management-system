const Subject = require("../models/subjectModel");
const Factory = require('./handlersFactory');



exports.addSubject = Factory.insertOne(Subject);

exports.getSubjects = Factory.getAll(Subject);

exports.getSubjectById = Factory.getOne(Subject);

exports.updateSubject = Factory.updateOne(Subject);

exports.deleteSubject = Factory.deleteOne(Subject);