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
  avatar: string; // Add the avatar property
}

export interface UserType {
  _id: string;
  userType: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  skills: string[];
  experience: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  about: string;
  address: string;
  companySize: string;
  establishmentYear: string;
  phone: string;
  website: string;
  education: string[];
  avatar: string; // URL string
}

export interface JobType {
  gender: string;
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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
