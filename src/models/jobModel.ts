import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Ensure this matches the User model name
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
    qualifications: {
      type: String,
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: false, // Optional deadline
    },
    jobCategory: {
      type: String,
      enum: [
        'IT',
        'Software Development',
        'Web Development',
        'Graphic Design',
        'AI/ML Engineer',
        'Finance',
        'Healthcare',
        'Education',
        'Construction',
        'Marketing',
        'Others',
      ],
      required: true, // Adjust to `false` if not mandatory
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Not Specified'],
      default: 'Not Specified',
      required: false,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.jobs || mongoose.model('jobs', JobSchema);
export default Job;
