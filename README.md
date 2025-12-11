<div align="center">
  <h1>🏢 User Management System</h1>

  <p>
    <img src="https://img.shields.io/badge/status-active-success.svg?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/docker-ready-blue?logo=docker&logoColor=white&style=flat-square" alt="Docker" />
  </p>

  <p>
    A robust, full-stack <strong>User Management System</strong> architected for scalability and maintainability. 
    Built with <strong>Next.js</strong>, <strong>Express</strong>, <strong>Prisma</strong>, and <strong>MySQL</strong>.
    <br/>
    Featuring a complete <strong>Dockerized</strong> environment for instant deployment.
  </p>
</div>

---

## 🚀 Key Features

### 🛡️ **Enterprise-Grade Architecture**
* **Service-Repository Pattern:** Strict separation between Controller (Interface), Service (Business Logic), and Repository (Data Access).
* **Centralized Configuration:** Environment variables and constants are managed centrally for security.
* **Robust Validation:** Dedicated Validation Layer using custom validators to ensure data integrity before reaching the controller.

### 🔐 **Security & Authentication**
* **JWT Authentication:** Secure stateless authentication.
* **Password Encryption:** Strong hashing using `bcrypt`.
* **Protected Routes:** Middleware to protect sensitive endpoints and frontend pages.

### 🎨 **Modern UI/UX**
* **Next.js App Router:** Utilizing the latest React features.
* **Dark Mode Support:** System-wide theme switching (Light/Dark).
* **Interactive Components:** Toast notifications (`sonner`), and smooth Framer Motion animations.

### 🐳 **DevOps & Deployment**
* **Docker Compose:** Orchestrates Frontend, Backend, and Database with a single command.
* **Database Migrations:** Prisma migrations managed within the container environment.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 14](https://nextjs.org/), [React](https://react.dev/), [Bootstrap 5](https://getbootstrap.com/), [SWR](https://swr.vercel.app/), [Framer Motion](https://www.framer.com/motion/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Multer](https://github.com/expressjs/multer) |
| **Database** | [MySQL 8](https://www.mysql.com/), [Prisma ORM](https://www.prisma.io/) |
| **Tools** | [Docker](https://www.docker.com/), [Git](https://git-scm.com/), [VS Code](https://code.visualstudio.com/) |

---

## 🛠️ Installation Guide

You can run this application using **Docker (Recommended)** OR **Manually (Node.js)**.

### 📋 Prerequisites
* **For Docker:** Docker Desktop installed.
* **For Manual:** Node.js (v22) and MySQL installed locally.

---

### 🟢 OPTION A: Run with Docker (Easiest)
*No need to install Node.js or MySQL on your machine.*

1.  **Clone the repository**
    ```bash
    git clone <url-repository>
    cd the root file
    ```

2.  **Setup Environment**
    Copy the example environment file.
    ```bash
    cp .env.example .env
    ```
    *Note: The default values in `.env.example` are compatible with Docker (port 3307).*

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
    * **Important:** Change `MYSQL_LOCAL_PORT` to `3306`.
    * Change `DATABASE_URL` to match your local config (e.g., remove password if using XAMPP defaults).
    * Example: `mysql://root:@localhost:3306/db_management_user`

3.  **Setup Backend**
    ```bash
    cd backend
    # [IMPORTANT] Copy env from root to backend folder
    # Windows:
    copy ..\.env .env
    # Mac/Linux:
    cp ../.env .env
    
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
├── config/         # Environment & Database config
├── controllers/    # Request handlers (Input/Output only)
├── middlewares/    # Auth checks & File Uploads
├── routes/         # API Endpoint definitions
├── services/       # Business Logic & DB Interactions
├── utils/          # Standardized Response & Error Handling
└── validators/     # Input validation logic
```
### Frontend (`/frontend`)
```text
src/
├── app/            # Next.js App Router Pages
├── components/     # Reusable UI Components
│   ├── auth/       # Login/Register Layouts
│   ├── common/     # Shared components (Sidebar, Header)
│   ├── dashboard/  # Dashboard widgets
│   └── ...
├── context/        # Global State (Theme, Auth)
├── lib/            # Axios Interceptors & Constants
└── services/       # API Integration Layer
```

---

👤 Author
```text
Kevin Darrell
```
