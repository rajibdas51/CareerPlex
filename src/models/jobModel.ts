import User from '@/models/userModel';
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryFromRange: {
      type: Number,
      required: true,
    },
    salaryToRange: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: false,
      // Set timezone to UTC to preserve user selection
    },
  },
  { timestamps: true }
);

// Delete old model if exists
if (mongoose.models.jobs) {
  const JobModel = mongoose.model('jobs');
  mongoose.deleteModel(JobModel.modelName);
}

// create and export new model
const Job = mongoose.model('jobs', JobSchema);

export default Job;
