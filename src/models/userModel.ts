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
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
    },
    skills: {
      type: [String],
    },
    education: {
      type: [String],
    },
    experience: {
      type: [String],
    },
    careerObjective: {
      type: String,
    },
    companyName: {
      type: String,
    },
    establishmentYear: {
      type: String,
    },
    companySize: {
      type: String,
    },
    website: {
      type: String,
    },
    about: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
