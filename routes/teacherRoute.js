const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const  { protect }  = require('../middlewares/authMiddleware');

router.use(protect);

router
  .route("/")
  .get(teacherController.getTeachers)
  .post(
    teacherController.uploadImages,
    teacherController.resizeImage,
    teacherController.addTeacher
  );
  
router
  .route("/:id")
  .get(teacherController.getTeacherById)
  .put(
    teacherController.uploadImages,
    teacherController.resizeImage,
    teacherController.updateTeacher
  )
  .delete(teacherController.deleteTeacher);


module.exports=router