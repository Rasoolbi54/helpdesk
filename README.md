Helpdesk Support System
Overview
This Helpdesk Support System is designed to provide efficient support for users through role-based dashboards for Admin, Agent, and User roles. Users can submit tickets, agents manage assigned tickets, and admins oversee the entire system.

The backend is built with Node.js, Express, and MongoDB, while the frontend is developed using React with Tailwind CSS for styling.

Features
Backend
User Management

Role-based authentication (admin, agent, user)

Secure login and registration with hashed passwords

JWT-based authentication with token expiration

Ticket Management

Create, update, and retrieve support tickets

Role-based ticket access:

Admins see all tickets

Agents see assigned tickets

Users see their own created tickets

Audit logging for tracking ticket changes

AI suggestions for tickets (mock implementation)

Security

Protected routes based on user roles

Input validation and error handling

Frontend
Responsive UI

Separate dashboards for Admin, Agent, and User

Sidebars with navigation and user profile info

Modals for ticket creation, comments, and details

Authentication

Persistent login with localStorage

Route guarding to protect restricted pages

User Experience

Real-time ticket lists with loading and error states

Quick actions for submitting tickets and accessing support

Dynamic form validation and submission feedback

Demo/Test Credentials
You can log in using the following accounts to test each user role:

Role	Email	Password
User	test@gmail.com	test1234
Agent	agent@example.com	password
Admin	admin@example.com	password
Getting Started
Prerequisites
Node.js (v14 or above)

npm or yarn

MongoDB Atlas account (or local MongoDB instance)

Backend Setup
Clone the repository:

bash
git clone https://github.com/yourusername/helpdesk-support-system.git
cd helpdesk-support-system/backend
Install dependencies:

bash
npm install
Configure environment variables:

Create a .env file in the backend root directory with these variables:

text
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=2000
Run the server:

bash
npm start
Frontend Setup
Navigate to the frontend directory:

bash
cd ../frontend
Install dependencies:

bash
npm install
Configure the API URL:

Update the frontend environment configuration (e.g. .env or config files) to point to your deployed backend API URL or localhost, for example:

text
REACT_APP_API_URL=http://localhost:2000/api
Run the frontend:

bash
npm start
Deployment
Backend Deployment (Render + MongoDB Atlas)
MongoDB Atlas:

Create a free or paid cluster at MongoDB Atlas.

Add your IP addresses (e.g., Render IP or 0.0.0.0/0 for testing) to the IP whitelist.

Create a database user with secure credentials.

Get your connection string (Mongo URI).

Render Deployment:

Push your backend code to a GitHub repository.

Create a new Web Service on Render linked to your repo.

Set the build command to npm install and start command to npm start.

Add environment variables (MONGODB_URI, JWT_SECRET, etc.) on Render’s dashboard.

Deploy and monitor logs on Render.

Update frontend API URL to point to your Render service URL.

Usage
Register or use the provided demo credentials to log in.

Access the dashboard according to your role:

Admin: /admin-dashboard

Agent: /agent-dashboard

User: /user-dashboard

Submit, view, and comment on tickets.

Admins and agents can manage tickets with enhanced permissions.

Use quick actions from the dashboard for faster ticket submission and support.

Technologies Used
Backend: Node.js, Express, Mongoose, bcrypt, jsonwebtoken

Frontend: React, React Router, Tailwind CSS, Axios

Database: MongoDB Atlas (cloud-managed)

Deployment: Render (backend), React development server or any static host (frontend)




