# 📞 Call Assist
### AI Agent Management Platform

Call Assist is a full-stack AI agent management platform that allows users to create, manage, and configure AI-powered call agents.  
It is built using **FastAPI + MongoDB** for the backend and **React (Vite) + Tailwind CSS** for the frontend.

Each user operates under a unique **account**, ensuring complete data isolation and security.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based authentication
- Secure password hashing (bcrypt)
- Token-based authorization
- Account-wise data separation

### 🤖 Agent Management
- Create AI agents
- View all agents (account-wise)
- Edit agents using MongoDB `_id`
- Delete agents securely
- Voice selection (Male / Female)
- Language selection (English / Hindi)

### 🎨 Frontend
- Responsive UI (desktop & mobile)
- Sticky professional navbar
- Active route highlighting
- Click outside to close dropdowns
- User profile avatar (first letter of username)
- Clean tables and forms

### ⚙️ Backend
- FastAPI REST API
- MongoDB Atlas integration
- Pydantic data validation
- ObjectId validation
- Environment-based configuration

---

## 📁 Project Structure

call-assist/
│
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── auth.py
│ │ ├── database.py
│ │ ├── models.py
│ │ └── utils.py
│ │
│ ├── requirements.txt
│ ├── .env
│ └── README.md
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── package.json
│ ├── vite.config.js
│ └── README.md
│
├── .gitignore
└── README.md

yaml
Copy code

---

## ⚙️ Backend Setup

### 1️⃣ Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
2️⃣ Install Dependencies
bash
Copy code
pip install -r requirements.txt
3️⃣ Create .env File
env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
DATABASE_NAME=Call_Assist
SECRET_KEY=your_secret_key
ALGORITHM=HS256
TOKEN_EXPIRE_HOURS=1
⚠️ Do not commit .env to GitHub

4️⃣ Run Backend Server
bash
Copy code
uvicorn app.main:app --reload
Backend will run at:

arduino
Copy code
http://localhost:8000
🎨 Frontend Setup
1️⃣ Install Dependencies
bash
Copy code
npm install
2️⃣ Run Frontend
bash
Copy code
npm run dev
Frontend will run at:

arduino
Copy code
http://localhost:5173
🔑 Authentication Flow
User signs up → account created

User logs in → JWT token generated

Token stored in localStorage

Token sent with every request:

makefile
Copy code
Authorization: Bearer <token>
Backend validates token and filters data by accountId

📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/signup	Create account
POST	/login	Login user

Agents
Method	Endpoint	Description
POST	/agents	Create agent
GET	/agents	Get all agents
GET	/agents/{id}	Get agent by ID
PUT	/agents/{id}	Update agent
DELETE	/agents/{id}	Delete agent

🔒 Security Notes
Passwords are hashed using bcrypt

JWT tokens expire automatically

MongoDB ObjectId validation applied

CORS restricted to frontend domain

Secrets stored in environment variables

⚠️ Known Limitations
bcrypt password limit: 72 characters

No password reset feature yet

No role-based access (admin/user)

