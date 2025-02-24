import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true, default: 'jobSeeker' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    phone: { type: String },
    skills: [
      {
        technology: { type: String, required: true },
        rating: { type: String, required: true },
      },
    ],
    education: [
      {
        qualification: { type: String, required: true },
        institution: { type: String, required: true },
        result: { type: String, required: true },
      },
    ],
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        period: { type: String, required: true },
      },
    ],

    careerObjective: { type: String },
    companyName: { type: String },
    establishmentYear: { type: String },
    companySize: { type: String },
    website: { type: String },
    about: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
