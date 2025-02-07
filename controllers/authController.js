const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('../utils/sendMail');
const { createToken } = require('../utils/createToken');

/**
* @desc    Register user
* @route   /api/v1/auth/register
* @method  POST
* @access  public
*/
exports.register = asyncHandler(async (req, res, next) => {
  const user = await this.User.findOne({ email: req.body.email });
  if (user) {
    return next(new ApiError('User already exists', 400));
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  const token = createToken(user._id);
  res.json({ data: newUser, token: token });
});

/**
* @desc    login user
* @route   /api/v1/auth/login
* @method  POST
* @access  public
*/
exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(' invalid email or password', 401));
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return next(new ApiError('invalid email or password', 401));
  }
  const token = createToken(user._id);
  res.json({ token });
});

/**
* @desc    Forgot password
* @route   /api/v1/auth/forgotPassword
* @method  POST
* @access  public
*/
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(`There is no user with that email ${req.body.email}`, 404));
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.ResetCode = hashedResetCode;
  user.ResetCodeExpireAt = Date.now() + 10 * 60 * 1000;
  user.ResetCodeVerified = false;

  await user.save();

  const message = `Hi ${user.username},\n We received a request to reset the password on your mySchool Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The mySchool Team`;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset',
    message,
  });
  res.status(200).json({ message: 'Check your email for further instructions.' });
});

/**
* @desc    Verify password reset code
* @route   /api/v1/auth/verifyResetCode
* @method  POST
* @access  public
*/
exports.verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    ResetCode: hashedResetCode,
    ResetCodeExpireAt: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  user.ResetCodeVerified = true;
  await user.save();

  return res.status(200).json({ status: "success" });

});

/**
* @desc    Reset password
* @route   /api/v1/auth/resetPassword
* @method  PUT
* @access  public
*/
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("No user with this Email", 404));
  }
  if (!user.ResetCodeVerified) {
    return next(new ApiError("Reset Code not verified", 400));
  }

  // Encrypt the new password
  user.password = await bcrypt.hash(req.body.newPassword, 10);

  user.ResetCode = undefined;
  user.ResetCodeExpireAt = undefined;
  user.ResetCodeVerified = undefined

  await user.save();
  const token = createToken(user._id);
  res.status(200).json({ token });
});

/**
* @desc    logout the user
* @route   /api/v1/auth/logout
* @method  GET
* @access  private
*/
exports.logout = asyncHandler(async (req, res, next) => {
  // Clear the token by setting it to an invalid value
  res.cookie("token", "invalid-token", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out" });
});