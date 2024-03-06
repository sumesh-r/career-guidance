const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    dob: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    gender: { type: String },
    phoneNumber: { type: String },
    religion: { type: String },
    community: { type: String },
    course: { type: String },
    caste: { type: String },
    bloodGroup: { type: String },
    academics: {
      sslcSchool: { type: String },
      sslcPercentage: { type: String },
      hscSchool: { type: String },
      hscPercentage: { type: String },
    },
    family: {
      fatherName: { type: String },
      fatherOccupation: { type: String },
      fatherQualification: { type: String },
      motherName: { type: String },
      motherOccupation: { type: String },
      motherQualification: { type: String },
      familyIncome: { type: String },
      siblingName: { type: String }
    },
    goals: { type: String },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
