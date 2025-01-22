// types.ts

// Base User interface for minimal user information
export interface User {
  _id: string;
  userType: string;
  name: string;
  email: string;
  about: string;
  address: string;
  companySize: string;
  establishmentYear: string;
  phone: string;
  website: string;
  avatar: string;
}

// Complete UserType interface with all user properties
export interface UserType {
  _id: string;
  userType: string;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  phone?: string;
  avatar?: string;

  // Optional fields that might be used by either type
  about?: string;
  address?: string;
  companySize?: string;
  establishmentYear?: string;
  website?: string;

  // JobSeeker specific fields
  careerObjective?: string;
  education?: Array<EducationField>;
  skills?: Array<SkillField>;
  experience?: Array<ExperienceField>;
}
// Job Type interface
export interface JobType {
  _id: string;
  user: User;
  title: string;
  description: string;
  location: string;
  salaryFromRange: number;
  salaryToRange: number;
  jobType: string;
  jobCategory: string;
  qualifications: string;
  workMode: string;
  skills: string[];
  experience: number;
  vacancies: number;
  deadline: string; // ISO date string
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Form Field Types
export interface EducationField {
  qualification: string;
  institution: string;
  result: string;
}

export interface SkillField {
  technology: string;
  rating: string;
}

export interface ExperienceField {
  company: string;
  role: string;
  period: string;
}

// Form Props Types
export interface JobSeekerFormProps {
  currentUser: UserType;
}

export interface EmployerFormProps {
  currentUser: UserType;
}

// Optional: Enum types for better type safety
export enum JobCategory {
  IT = 'IT',
  SoftwareDevelopment = 'Software Development',
  WebDevelopment = 'Web Development',
  GraphicDesign = 'Graphic Design',
  AIMLEngineer = 'AI/ML Engineer',
  Finance = 'Finance',
  Healthcare = 'Healthcare',
  Education = 'Education',
  Construction = 'Construction',
  Marketing = 'Marketing',
  Others = 'Others',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  NotSpecified = 'Not Specified',
}
