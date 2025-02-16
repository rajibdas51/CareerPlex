# CareerPlex

**A Next.js job portal application.**

[**Live Demo**](https://career-plex.vercel.app/)

<img src="/public/images/screenshot.png" />

---

## Features

CareerPlex includes the following key features:

- User authentication with JWT and cookies
- Protected routes and user authorization
- User profile management
- Full CRUD functionality for job postings
- Image upload using UploadThing
- Job search with dynamic filters
- Redux Toolkit for state management
- Email notifications via NodeMailer
- Responsive design with Tailwind CSS
- Toast notifications with React Toastify
- React Icons for UI enhancements

---

## Technologies

CareerPlex leverages the following technologies:

- **Next.js 14** for server-side rendering and routing
- **TypeScript** for type safety and scalability
- **Tailwind CSS** for responsive styling
- **MongoDB** and **Mongoose** for database management
- **Redux Toolkit** for state management
- **JWT & Cookies** for authentication
- **UploadThing** for image uploads
- **NodeMailer** for email handling
- **React Toastify** for notifications
- **React Icons** for iconography

---

## Guide to Install on Localhost

### Prerequisites

To run this project locally, ensure you have the following:

- **Node.js** (version 18 or higher)
- A **MongoDB Atlas** cluster ([Sign up](https://www.mongodb.com/))
- An **UploadThing** account ([Sign up](https://uploadthing.com/))
- A **Google or SMTP email service** for sending emails

### Environment Variables

Rename the `env.example` file to `.env` and fill in the required variables:

- **MongoDB URI:** Add your MongoDB Atlas connection string to `MONGO_URI`.
- **JWT Secret:** Set your JWT secret in `JWT_SECRET`.
- **UploadThing Config:** Add your UploadThing App ID and Secret to `UPLOADTHING_APP_ID` and `UPLOADTHING_SECRET`.
- **Email Credentials:** Add your email service credentials to `AUTH_USER` and `AUTH_PASSWORD`.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/careerplex.git
   cd careerplex
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
