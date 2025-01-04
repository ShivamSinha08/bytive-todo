Bytive TODO Backend
A Node.js and Express.js backend API for managing user authentication and TODO tasks, with JWT-based authentication and token blacklist handling.

Features
User Registration and Login
Logout with Token Blacklisting
JWT Authentication
Protected Routes
Task Management (CRUD Operations)
Technologies Used
Node.js: Backend framework
Express.js: Web framework
MongoDB: Database for persistent storage
Mongoose: MongoDB object modeling for Node.js
JSON Web Tokens (JWT): Authentication mechanism

Folder Structure

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
Environment Variables
Create a .env file in the root directory based on .env.example with the following keys:


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


npm run dev
Access the API:

The backend server will run at http://localhost:3000.
API Endpoints and Postman Testing
Authentication Routes
1. POST /register: Register a new user
Description: Register a new user by providing a username and password.

Request Body:
json

{
  "username": "yourUsername",
  "password": "yourPassword"
}
Postman Testing:
Open Postman and select "POST" method.
Enter the URL: http://localhost:3000/register.
Go to the "Body" tab, select "raw," and set the type to "JSON".
Paste the request body and send.
2. POST /login: Login a user and retrieve a JWT token
Description: Authenticate a user and receive a JWT for protected routes.

Request Body:
json

{
  "username": "yourUsername",
  "password": "yourPassword"
}
Postman Testing:
Open Postman and select "POST" method.
Enter the URL: http://localhost:3000/login.
Go to the "Body" tab, select "raw," and set the type to "JSON".
Paste the request body and send.
3. POST /logout: Logout the user and blacklist the token
Description: Logout the user and revoke their token.

Headers:

Authorization: Bearer <your-token>
Postman Testing:
Login to get a JWT token.
Select "POST" method in Postman.
Enter the URL: http://localhost:3000/logout.
Add the token in the Authorization header with the format: Bearer <your-token>.
Send the request.
Task Routes (Protected)
Note:
You must include the Authorization header with a valid JWT token for all task routes:


Authorization: Bearer <your-token>
4. GET /tasks: Fetch all tasks for the authenticated user
Description: Retrieve all tasks created by the logged-in user.

Postman Testing:
Select "GET" method in Postman.
Enter the URL: http://localhost:3000/tasks.
Add the Authorization header and send the request.
5. POST /tasks: Create a new task
Description: Add a new task to the logged-in user's list.

Request Body:
json
{
  "title": "Task Title",
  "description": "Task Description"
}
Postman Testing:
Select "POST" method in Postman.
Enter the URL: http://localhost:3000/tasks.
Go to the "Body" tab, select "raw," and set the type to "JSON".
Paste the request body, add the Authorization header, and send the request.
6. GET /tasks/:id: Fetch a specific task by its ID
Description: Retrieve details of a specific task using its ID.

Postman Testing:
Select "GET" method in Postman.
Enter the URL: http://localhost:3000/tasks/<taskId>.
Add the Authorization header and send the request.
7. PUT /tasks/:id: Update a task's status
Description: Update the status of a specific task (e.g., "completed").

Request Body:
json
{
  "status": "completed"
}
Postman Testing:
Select "PUT" method in Postman.
Enter the URL: http://localhost:3000/tasks/<taskId>.
Go to the "Body" tab, select "raw," and set the type to "JSON".
Paste the request body, add the Authorization header, and send the request.
8. DELETE /tasks/:id: Delete a specific task
Description: Permanently remove a task from the database.

Postman Testing:
Select "DELETE" method in Postman.
Enter the URL: http://localhost:3000/tasks/<taskId>.
Add the Authorization header and send the request.