// models/user.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfileInfo", // Reference to the ProfileInfo model
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .messages({ "any.only": "Passwords Do Not Match" }), // Custom message for passwords mismatch
  });
  return schema.validate(data);
};

module.exports = { User, validateUser };