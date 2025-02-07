const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minLength: [3, "The minimum number of characters in a name is 3"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minLength: [6, "The minimum number of characters in a password is 6"],
      trim: true,
    },
    phone: Number,
    image: String,
    ResetCode: String,
    ResetCodeExpireAt: Date,
    ResetCodeVerified: Boolean
    
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);