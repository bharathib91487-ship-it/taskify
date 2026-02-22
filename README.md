# Taskify – Full Stack Web Application

Taskify is a full-stack web application built as part of a Frontend Developer Internship assignment.  
It includes user authentication, a protected dashboard, and CRUD operations on tasks.



## 🚀 Features

- User Registration & Login (JWT Authentication)
- Protected Dashboard
- Add, View, Update, Delete Tasks
- Responsive UI using Tailwind CSS
- Secure backend with password hashing
- REST APIs with proper error handling

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

taskify/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   └── taskify-frontend/


---

## ⚙️ Setup Instructions (Local)

### Backend
```bash
cd backend
npm install
node server.js

cd frontend/taskify-frontend
npm install
npm start
