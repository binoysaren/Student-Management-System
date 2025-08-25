# SCHOOL MANAGEMENT SYSTEM

## Overview

A full-stack web application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) to streamline school operations including managing students, faculty, attendance, performance tracking, and communication.

---

## 🔗 Live Demo 
 https://school-management-system-zzw9.vercel.app/
---

## 🚀 Features

### 👤 User Roles

* **Admin:** Create and manage students, teachers, classes, subjects.
* **Teacher:** View classes, mark attendance, assign marks, create assignments.
* **Student:** View attendance, marks, assignments, and communicate with teachers.

### 📚 Core Functionalities

* Role-based dashboards
* Attendance tracking with reports
* Marks & performance evaluation
* Assignment creation and submission
* Data visualization through charts
* Notice availability
* Complains to issue a problem
* Internal messaging

---

## 🛠 Technologies Used

* **Frontend:** React.js, Material UI, Redux
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

---

## 📦 Project Setup

### Clone the Repository

```bash
git clone https://github.com/binoysaren/School-Management-System.git
```

### Terminal 1: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add:

```env
MONGO_URL=mongodb://127.0.0.1/school
```

If using MongoDB Atlas, replace with your connection string.

Start the backend server:

```bash
npm start
```

### Terminal 2: Frontend Setup

```bash
cd frontend
npm install
npm start
```

Navigate to: [http://localhost:3000](http://localhost:3000)
Backend API will run on: [http://localhost:5000](http://localhost:5000)

---

## ⚠️ Common Errors and Fixes

### Network or Signup Error

1. Go to `frontend/.env` and uncomment the first line.
2. Restart frontend:

```bash
cd frontend
npm start
```

If unresolved:

1. Go to `frontend/src/redux/userRelated/userHandle.js`
2. Add this line after imports:

```js
const REACT_APP_BASE_URL = "http://localhost:5000";
```

3. Replace `process.env.REACT_APP_BASE_URL` with `REACT_APP_BASE_URL`
4. Repeat the process for all files ending with `Handle.js` in redux folders.

---

## ⭐ Final Notes

* Always start by signing up (not guest login)
* Backend must be running before frontend
* If using MongoDB Atlas, don't forget to whitelist IP and enable network access

---

