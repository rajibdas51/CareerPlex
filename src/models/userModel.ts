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

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// delete old model if exists
if (mongoose.models.users) {
  const userModel = mongoose.model('user');
  mongoose.deleteModel(userModel.modelName);
}

// create new model
const User = mongoose.model('users', userSchema);

export default User;
