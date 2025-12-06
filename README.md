# Human Resource Management System (HRMS)

A full-stack HRMS application built using **Spring Boot** (backend) and **React + Vite** (frontend).  
The project includes employee management features, REST APIs, database integration, and cloud deployment.

---

## 🔹 Features
- Employee CRUD operations  
- RESTful API design  
- Service–Repository architecture  
- Database integration (MySQL locally, PostgreSQL on Render)  
- API testing using Postman  
- Frontend built with React + Vite  
- Version control via Git & GitHub  
### Database
- **Local development:** MySQL
- **Cloud deployment (Render):** PostgreSQL (via Render managed DB)


---


## 🔹 Tech Stack
### Backend
- Java  
- Spring Boot  
- Spring Data JPA  
- Maven  

### Frontend
- React  
- Vite  
- HTML/CSS/JS  

### Tools
- Postman  
- Git & GitHub  
- Render (for deployment)  

---

---

## 🔹 How to Run Locally

### Backend
```bash
cd hrms-backend
mvn spring-boot:run

Backend will start at:

http://localhost:8080

Frontend
cd hrms-frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173

API Testing (Postman)

APIs can be tested using Postman with standard CRUD routes:

GET /employees

POST /employees

PUT /employees/{id}

DELETE /employees/{id}
🔹 Future Enhancements

Authentication (JWT)

Role-based access

PostgreSQL integration

Dockerization

CI/CD pipeline
