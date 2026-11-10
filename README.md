# 💰 Expense Tracker

A full-stack web application that helps users manage their personal expenses, organize spending by category, and track their financial activities.

## 🌐 Live Application

**[🚀 Open Expense Tracker – Live Demo](https://expense-tracker-v2-4q3k.onrender.com/)**

You can access the deployed application directly using the link above.

> **Note:** The application is hosted on Render's free service. If it has been inactive, the first request may take some time to load.

---

## 📌 About the Project

Expense Tracker is a full-stack web application developed using Java and Spring Boot. It allows users to register, log in securely, and manage their personal expenses.

The application uses REST APIs to connect the frontend with the backend. User authentication is implemented using Spring Security and JWT, while MySQL is used to store application data.

## ✨ Features

- **User Registration:** Create a new account.
- **Secure Login:** Authenticate users using email and password.
- **JWT Authentication:** Secure protected APIs using JSON Web Tokens.
- **Category Management:** Create and manage expense categories.
- **Expense Management:** Add, view, update, and delete expenses.
- **Expense Tracking:** Maintain user-specific expense records.
- **Dashboard:** View expense information and summaries.
- **Database Integration:** Store and retrieve information using MySQL.
- **REST APIs:** Communicate between frontend and backend.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Java | Backend programming |
| Spring Boot | Backend application development |
| Spring Security | Application security |
| JWT | Token-based authentication |
| Spring Data JPA | Database operations |
| Hibernate | ORM framework |
| MySQL | Relational database |
| HTML5 | Frontend structure |
| CSS3 | Frontend styling |
| JavaScript | Frontend functionality |
| Fetch API | Frontend-backend communication |
| Maven | Dependency management |
| Render | Application deployment |
| Postman | API testing |

## 🏗️ Application Architecture

```text
              User
               |
               v
       Frontend (HTML/CSS/JS)
               |
               v
           Fetch API
               |
               v
       Spring Boot REST APIs
               |
               v
        Spring Security + JWT
               |
               v
          Service Layer
               |
               v
        Repository Layer
               |
               v
          JPA / Hibernate
               |
               v
             MySQL
```

## 🔐 Authentication Flow

1. A new user registers with their details.
2. The password is securely hashed using BCrypt.
3. The user logs in using their registered credentials.
4. The backend validates the credentials.
5. A JWT token is generated after successful authentication.
6. The frontend stores the token and sends it with protected API requests.
7. Spring Security validates the token before allowing access to protected resources.

## 📂 Project Modules

- **Authentication Module:** User registration and login.
- **Category Module:** Category creation and management.
- **Expense Module:** Expense CRUD operations.
- **Dashboard Module:** Expense information and summaries.
- **Security Module:** JWT authentication and authorization.

## ⚙️ Run the Project Locally

### Prerequisites

Make sure you have installed:

- Java JDK
- Maven
- MySQL Server
- Git
- IntelliJ IDEA / VS Code

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Open the Project

Open the cloned project in IntelliJ IDEA or VS Code.

### 3. Configure MySQL

Create a database in MySQL:

```sql
CREATE DATABASE expense_tracker;
```

### 4. Configure Database Connection

Update your `application.properties` file with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Make sure the remaining configuration matches your project.

### 5. Run the Application

Using Maven:

```bash
mvn clean install
mvn spring-boot:run
```

Alternatively, run the main Spring Boot application class from your IDE.

### 6. Open the Application

```text
http://localhost:8080/
```

## 🔗 Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/categories` | Retrieve categories |
| GET | `/api/expenses` | Retrieve expenses |

Additional category and expense endpoints support the application's CRUD operations.

## 🧪 API Testing

Postman can be used to test the REST APIs, including:

- User registration and login.
- JWT authentication.
- Category operations.
- Expense operations.
- Protected API access.

## 🔮 Future Enhancements

- Monthly and yearly expense analytics.
- Interactive charts and visual reports.
- Export expense reports to PDF or Excel.
- Budget management.
- Improved mobile responsiveness.

## 👨‍💻 Developer

**Uday Bagade**

- GitHub: [Visit My GitHub Profile](https://github.com/Udaybagade)
- Live Project: [Expense Tracker](https://expense-tracker-v2-4q3k.onrender.com/)

---

⭐ If you find this project useful, consider giving the repository a star!

**Thank you for visiting my project!**
