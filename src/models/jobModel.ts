import User from '@/models/userModel';
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      type: [],
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
      default: Date.now,
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
