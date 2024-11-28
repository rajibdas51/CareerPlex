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

export interface JobType {
  _id: string;
  user: User; // Reference to the User type
  title: string;
  description: string;
  location: string;
  salaryFromRange: number;
  salaryToRange: number;
  jobType: string;
  workMode: string;
  skills: string[];
  experience: number;
  vacancies: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}
