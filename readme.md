# ⚙️ TalentHub Backend

A **Node.js + Express + MongoDB** REST API powering the TalentHub platform.  
It provides endpoints for managing talent profiles, with advanced filtering, sorting, and CRUD functionality.

---

## 🚀 Live API

🌐 **Backend**: [https://talent-directory.vercel.app/](https://talent-directory.vercel.app/)
- To test backend is working visit /api/health 
---

## ✨ Features

- 🧾 **Full CRUD API** for talent profiles  
- 🔍 **Advanced Filtering & Sorting**
- ✏️ **Edit Talent Details**
- ⚡ **Serverless Deployment on Vercel**
- 🧠 **Optimized MongoDB Queries**
- 🔐 **CORS Configurable**

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- dotenv for environment management
- CORS Middleware
- Validator for schema validation

---

## ⚙️ Setup Instructions

### 1️⃣ Installation
```bash
cd backend
npm install
```

### 2️⃣ Environment Variables

- Create a .env file:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talent-directory
PORT=5050
NODE_ENV=development
```

### 3️⃣ Run Locally

```bash
npm run dev
```

- Backend runs at: http://localhost:5050


