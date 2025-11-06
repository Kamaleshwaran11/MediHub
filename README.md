# MediHub - Healthcare Management System

## Overview
MediHub is a comprehensive healthcare management system designed to streamline hospital operations, patient management, and medical services. The system includes modules for patient management, billing, appointments, pharmacy, staff management, and electronic health records (EHR).

![MediHub Dashboard](screenshots/dashboard.png)
*(Add a screenshot of your main dashboard here)*

## Features

### 1. Patient Management
- Patient registration and profile management
- Medical history tracking
- Appointment scheduling
- Billing history

![Patient Management](screenshots/patient-management.png)
*(Add a screenshot of the patient management interface)*

### 2. Billing System
- Generate and manage invoices
- Track payments and dues
- Multiple payment method support
- Invoice history and reporting

![Billing System](screenshots/billing-system.png)
*(Add a screenshot of the billing interface)*

### 3. Appointment System
- Schedule and manage appointments
- Doctor availability tracking
- Patient appointment history
- Email notifications

### 4. Pharmacy Management
- Medicine inventory tracking
- Prescription management
- Stock alerts
- Sales tracking

### 5. Staff Management
- Staff profiles and schedules
- Role-based access control
- Performance tracking
- Leave management

## Technology Stack

### Backend
- Java 21
- Spring Boot 3.5.0
- MySQL Database
- JPA/Hibernate
- Maven

### Frontend
- HTML5/CSS3
- JavaScript
- Bootstrap
- jQuery

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kamaleshwaran11/MediHub.git
```

2. Configure MySQL database:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medihub_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build the backend:
```bash
cd backend
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

5. Access the application:
- Frontend: Open `index.html` in a web browser
- Backend API: http://localhost:8080

## API Documentation

### Patient APIs
- GET `/api/patients` - Get all patients
- GET `/api/patients/{id}` - Get patient by ID
- POST `/api/patients` - Create new patient
- PUT `/api/patients/{id}` - Update patient
- DELETE `/api/patients/{id}` - Delete patient

### Billing APIs
- GET `/api/billing` - Get all bills
- GET `/api/billing/{id}` - Get bill by ID
- GET `/api/billing/search?patientName=xyz` - Search bills by patient name
- POST `/api/billing` - Create new bill
- PUT `/api/billing/{id}` - Update bill
- DELETE `/api/billing/{id}` - Delete bill

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard-full.png)
*(Add a full dashboard screenshot)*

### Patient Records
![Patient Records](screenshots/patient-records.png)
*(Add patient records screenshot)*

### Billing Interface
![Billing](screenshots/billing-interface.png)
*(Add billing interface screenshot)*

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## Project Structure
```
medihub/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── medihub/
│   │   │   │           ├── controller/
│   │   │   │           ├── model/
│   │   │   │           ├── repository/
│   │   │   │           └── service/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── index.html
└── README.md
```

## Future Enhancements
- Mobile application integration
- Online prescription system
- Telemedicine support
- Advanced reporting and analytics
- Integration with medical devices

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- Developer: Kamaleshwaran
- GitHub: [@kamaleshwaran11](https://github.com/kamaleshwaran11)
- Project Link: [https://github.com/kamaleshwaran11/MediHub](https://github.com/kamaleshwaran11/MediHub)