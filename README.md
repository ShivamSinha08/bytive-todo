Folder Structure
Ensure your project folder is structured as follows:

bash
Copy code
bytive-todo/  
├── models/                 # Contains Mongoose schemas  
│   └── Task.js             # Task schema  
│   └── User.js             # User schema  
├── middlewares/            # Contains middleware functions  
│   └── authenticate.js     # Middleware for authentication and token blacklist  
├── routes/                 # Contains route files  
│   └── protectedRoutes.js  # Protected route example  
│   └── taskRoutes.js       # Routes for task CRUD operations  
├── server.js               # Backend server entry point  
├── package.json            # Project dependencies and scripts  
├── .env.example            # Example environment variables file  
├── README.md               # Comprehensive documentation  
├── .gitignore              # Files and folders to ignore in Git  
 
README File

# Bytive TODO Backend  

A Node.js and Express.js backend API for managing user authentication and TODO tasks, with JWT-based authentication and token blacklist handling.  


## Features
- User Registration and Login  
- Logout with Token Blacklisting  
- JWT Authentication  
- Protected Routes  
- Task Management (CRUD Operations)  

## Technologies Used  
- Node.js: Backend framework  
- Express.js: Web framework  
- MongoDB: Database for persistent storage  
- Mongoose: MongoDB object modeling for Node.js  
- JSON Web Tokens (JWT): Authentication mechanism  



## Environment Variables  
Create a `.env` file in the root directory based on `.env.example` with the following keys:  


PORT=3000  
MONGO_URI=mongodb://localhost:27017/bytive-todo  
SECRET_KEY=your-secret-key  
Setup Instructions
Prerequisites
Node.js (v16 or later)
MongoDB (local instance or Atlas)
Steps
Clone the repository:


git clone <repository_url>  
cd backend
Install dependencies:


npm install  
Setup environment variables:

Create a .env file in the root directory.
Populate it with the values from .env.example.
Start the server:


npm start  
Access the API:
The backend server will run at http://localhost:3000.

API Endpoints
Authentication Routes
POST /register: Register a new user.
Body: { "username": "yourUsername", "password": "yourPassword" }
POST /login: Login a user and retrieve a JWT token.
Body: { "username": "yourUsername", "password": "yourPassword" }
POST /logout: Logout the user and blacklist the token.
Task Routes (Protected)
GET /tasks: Fetch all tasks for the authenticated user.
POST /tasks: Create a new task.
Body: { "title": "Task Title", "description": "Task Description" }
GET /tasks/:id: Fetch a specific task by its ID.
PUT /tasks/:id: Update a task's status.
Body: { "status": "completed" }
DELETE /tasks/:id: Delete a specific task.
