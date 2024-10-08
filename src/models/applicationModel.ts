import { timeStamp } from 'console';
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs',
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected'],
    },
  },
  { timestamps: true }
);

// delete old model if exists
if (mongoose.models.applications) {
  const applicationModel = mongoose.model('applications');
  mongoose.deleteModel(applicationModel.modelName);
}

const Application = mongoose.model('applications', applicationSchema);

export default Application;
