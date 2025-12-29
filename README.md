# Agents Management Dashboard

Full-stack AI Agents Management system

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: FastAPI, MongoDB

## Folder Structure
- `/frontend` → React app
- `/backend` → FastAPI server

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev


## 🚀 Features

### 🔐 Authentication
- User **Signup & Login**
- Secure password hashing (bcrypt)
- JWT-based authentication for protected actions

### 🧠 Account-Centric Design
- Unique **Account ID** generated on signup
- All data (agents & interactions) linked via `accountId`
- SaaS-ready multi-tenant architecture

### 🤖 Agents
- Create, edit, delete agents (JWT protected)
- View agents (account-based, auth-free)
- Agent configuration includes:
  - Agent Type
  - Language
  - Voice
  - Prompt
  - Knowledge Base
  - Guardrails

### 📊 Interactions
- Store call / chat / voice interactions
- View interaction history per agent
- Duration, status & timestamps tracked
- External system friendly (Pipecat compatible)

### 🎨 Frontend UX
- React + Tailwind CSS
- Toast notifications (success / error)
- Protected routes
- Responsive design

---

## 🧩 Architecture Overview
  User
└── Signup → AccountId (ACC0001)
└── Login (JWT)
├── Agents (CRUD)
└── Interactions (Logs)


> **Important:** Business logic is based on `accountId`, not `userId`.

---

## 🏗 Tech Stack

### Backend
- FastAPI
- MongoDB
- JWT Authentication
- Pydantic

### Frontend
- React
- Tailwind CSS
- Axios
- react-toastify

---


---

## 🔐 API Authorization Strategy

### JWT Protected APIs
- `POST /agents`
- `PUT /agents/:id`
- `DELETE /agents/:id`

### Account-Based (Auth-Free) APIs
- `GET /agents`
- `GET /agents/:id`
- `POST /interactions`
- `GET /agents/:id/interactions`



