const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.methods.generateAuthToken = function () {
  const privateKey = process.env.ADMIN_JWT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('ADMIN_JWT_PRIVATE_KEY is not defined');
  }

  const token = jwt.sign({ _id: this._id }, privateKey, {
    expiresIn: '7d',
  });
  return token;
};


const Admin = mongoose.model("Admin", adminSchema);

const validateAdmin = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Admin, validateAdmin };
