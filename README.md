# Human Resource Management System (HRMS)

A comprehensive full-stack Human Resource Management System built to streamline employee management, attendance tracking, and administrative tasks.

---

## � Tech Stack

### Backend
*   **Framework:** Spring Boot 3.2
*   **Language:** Java 17
*   **Database:** MySQL (Local), PostgreSQL (Production/Render)
*   **ORM:** Spring Data JPA (Hibernate)
*   **Security:** Spring Security, JWT (JSON Web Tokens)
*   **Utilities:** Lombok, Java Mail Sender
*   **Build Tool:** Maven

### Frontend
*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios

### Tools & DevOps
*   **API Testing:** Postman
*   **Version Control:** Git & GitHub
*   **Deployment:** Render
*   **IDE:** VS Code / IntelliJ IDEA

---

## ✨ Features

*   **Authentication & Authorization:** Secure Login and Registration with JWT and Role-based access control.
*   **Employee Management:** Complete CRUD capabilities for managing employee records.
*   **Dashboard:** Interactive admin dashboard with overview statistics.
*   **Audit Logs:** Track system activities and changes.
*   **Reports:** Generate and download PDF reports.
*   **Responsive Design:** Modern UI built with Tailwind CSS.

---

## 🛠️ Installation & Setup

### Prerequisites
*   Java 17 or higher
*   Node.js & npm
*   MySQL Server

### 1. Clone the Repository
```bash
git clone https://github.com/sahana196/HumanResourceMgmtSystem.git
cd HumanResourceMgmtSystem
```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd hrms-backend
    ```
2.  Configure your database settings in `src/main/resources/application.properties`.
3.  Run the application:
    ```bash
    mvn spring-boot:run
    ```
    The server will start at `http://localhost:8080`.

### 3. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd hrms-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will run at `http://localhost:5173`.

---

## � Project Screenshots

### Authentication
![Login Page](<Images/login page.png>)
![Register Page](<Images/register page.png>)

### Dashboard
![Dashboard](<Images/Dashboard.png>)

### Modules
![Employee Management](<Images/Employee Dashboard.png>)
![Attendance Dashboard](<Images/Attendance dashboard.png>)
![Leave Dashboard](<Images/Leave dashboard.png>)
![Audit Logs](<Images/Audit Logs.png>)

### Deployment
![Render Backend Deployment](<Images/render-backend.png>)
![Render Frontend Deployment](<Images/render-frontend.png>)