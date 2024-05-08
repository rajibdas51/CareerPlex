import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: 'jobSeeker',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      required: false,
      type: String,
    },
    // additional fields for jobSeeker
    skills: {
      type: [],
      required: false,
    },
    educaiton: {
      type: [],
      required: false,
    },
    experience: {
      type: [],
      required: false,
    },
    careerObjective: {
      type: String,
      required: false,
    },

    // additional fields for employer
    companyName: {
      type: String,
      required: false,
    },
    establishmentYear: {
      type: String,
      required: false,
    },
    companySize: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// delete old model if exists
if (mongoose.models.users) {
  const userModel = mongoose.model('users');
  mongoose.deleteModel(userModel.modelName);
}

// create new model
const User = mongoose.model('users', userSchema);

export default User;
