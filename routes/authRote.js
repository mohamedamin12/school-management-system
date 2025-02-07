const router = require('express').Router();

const {
  register,
  login,
  resetPassword,
  forgotPassword,
  verifyResetCode,
  logout
} = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword' ,forgotPassword);
router.post('/verifyResetCode', verifyResetCode);
router.put('/resetPassword' ,resetPassword);
router.put('/logout', logout);

module.exports = router;