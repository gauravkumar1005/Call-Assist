# 🔐 Full Stack Authentication System  
**React + Tailwind CSS | FastAPI | MongoDB | JWT**

This project implements a **secure authentication system** using **React & Tailwind CSS** for the frontend and **FastAPI with MongoDB** for the backend. It includes **Signup, Login, JWT-based authentication, and protected routes**.

---

## 🚀 Features
- User Signup & Login
- Password hashing using **bcrypt**
- JWT-based authentication
- Protected Dashboard routes
- MongoDB integration
- Token-based session handling
- Logout functionality
- Scalable & production-ready structure

---

## 🧱 Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios

### Backend
- FastAPI
- MongoDB (PyMongo)
- JWT (python-jose)
- Passlib (bcrypt)

---

## 📁 Project Structure

### Backend
backend/
├─ main.py
├─ auth.py
├─ database.py
├─ models.py
└─ requirements.txt


### Frontend
frontend/
├─ src/
│ ├─ api.js
│ ├─ pages/
│ │ ├─ Login.jsx
│ │ ├─ Signup.jsx
│ │ └─ Dashboard.jsx
│ ├─ routes/
│ │ └─ PrivateRoute.jsx
│ ├─ App.jsx
│ └─ main.jsx


---

## 🔧 Backend Setup (FastAPI + MongoDB)

### 1️⃣ Install Dependencies
```bash
pip install fastapi uvicorn pymongo python-jose passlib[bcrypt]

uvicorn main:app --reload

http://localhost:8000

