const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const  { protect }  = require('../middlewares/authMiddleware');

router.use(protect);
router
  .route("/")
  .get(studentController.getStudents)
  .post(
    studentController.uploadImages,
    studentController.resizeImage,
    studentController.addStudent
);
  
router
  .route("/:id")
  .get(studentController.getStudentById)
  .put(
    studentController.uploadImages,
    studentController.resizeImage,
    studentController.updateStudent
  )
  .delete(studentController.deleteStudent);


module.exports= router;