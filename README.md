# 🏢 Enterprise Employee Management System

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A robust, full-stack **Employee Management System** architected for scalability. Built with **Next.js 14**, **Express**, **Prisma**, and **MySQL**.

---

## 🚀 Key Features

* **Enterprise Architecture:** Clean Controller-Service-Repository pattern.
* **Security:** JWT Auth with HttpOnly cookies & Role-based access.
* **UI/UX:** Modern Next.js App Router with Dark Mode support.
* **DevOps:** Full Docker support for easy deployment.

---

## 🛠️ Installation Guide

You can run this application using **Docker (Recommended)** OR **Manually (Node.js)**.

### 📋 Prerequisites
* **For Docker:** Docker Desktop installed.
* **For Manual:** Node.js (v18+) and MySQL installed locally.

---

### 🟢 OPTION A: Run with Docker (Easiest)
*No need to install Node.js or MySQL on your machine.*

1.  **Clone the repository**
    ```bash
    git clone <LINK_REPO_ANDA>
    cd enterprise-employee-app
    ```

2.  **Setup Environment**
    Copy the example environment file.
    ```bash
    cp .env.example .env
    ```
    *Note: The default values in `.env.example` are compatible with Docker.*

3.  **Run the App**
    ```bash
    docker-compose up --build
    ```
    *Wait until the database and backend services are healthy.*

4.  **Initialize Database** (One time only)
    Open a **new terminal** and run:
    ```bash
    docker exec -it enterprise_backend npx prisma migrate deploy
    ```

5.  **Access App:** [http://localhost:3000](http://localhost:3000)

---

### 🟠 OPTION B: Run Manually (Localhost)
*Use this if you don't have Docker.*

1.  **Setup Database**
    * Open your local MySQL (XAMPP/Workbench).
    * Create a database named `db_management_user`.

2.  **Configure Environment**
    * Copy `.env.example` to `.env`.
    * **Important:** Open `.env` and make sure `DB_HOST` matches your local config.
    * Usually, change: `MYSQL_LOCAL_PORT=3307` to `3306` (if using standard MySQL).

3.  **Setup Backend**
    ```bash
    cd backend
    npm install
    
    # Run Migration to create tables
    npx prisma migrate dev --name init
    
    # Start Backend
    npm run dev
    ```
    *(Backend runs on http://localhost:5000)*

4.  **Setup Frontend**
    Open a new terminal:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *(Frontend runs on http://localhost:3000)*

---

## 📂 Project Structure

### Backend (`/backend`)
```text
src/
├── config/         # Config & Env Vars
├── controllers/    # Request Handling
├── services/       # Business Logic
├── validators/     # Input Validation
└── routes/         # API Routes
```
### Frontend (`/frontend`)
```text
src/
├── app/            # Next.js Pages
├── components/     # Reusable UI
│   ├── auth/       # Login/Register Screens
│   └── common/     # Sidebar, Header, etc
├── services/       # API Integration
└── context/        # Theme & Auth Context
```

---

👤 Author
```text
Kevin Darrell
```
