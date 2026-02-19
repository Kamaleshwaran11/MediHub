# MediHub - Healthcare Management System
## Complete Project Documentation

---


## TABLE OF CONTENTS
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Modules & Features](#modules--features)
5. [Database Design](#database-design)
6. [API Documentation](#api-documentation)
7. [Frontend Components](#frontend-components)
8. [Installation & Setup](#installation--setup)
9. [Project Statistics](#project-statistics)
10. [Development Process](#development-process)

---

## PROJECT OVERVIEW

### What is MediHub?
MediHub is a comprehensive **Full-Stack Healthcare Management System** designed to streamline hospital and clinic operations. It provides integrated solutions for managing doctors, patients, appointments, billing, electronic health records, staff, and pharmacy operations.

### Purpose & Goals
- **Centralize Healthcare Data:** Unified platform for all healthcare operations
- **Improve Patient Care:** Efficient appointment scheduling and EHR management
- **Automate Billing:** Streamlined invoice generation and payment tracking
- **Enhance Staff Management:** Organize staff roles and departments
- **Manage Pharmacy:** Track medicines and prescriptions
- **Real-Time Analytics:** Dashboard with live statistics and reporting

### Target Users
- Hospital Administrators
- Doctors and Medical Staff
- Patients
- Billing Department
- Pharmacy Staff
- System Administrators

---

## SYSTEM ARCHITECTURE

### Architecture Pattern: MVC (Model-View-Controller)

```
┌─────────────────────────────────────────────────┐
│           FRONTEND (HTML/CSS/JavaScript)        │
│  (Bootstrap 5, Tailwind CSS, FullCalendar, etc) │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓ REST API Calls
┌─────────────────────────────────────────────────┐
│       BACKEND (Spring Boot 3.x REST API)        │
├─────────────────────────────────────────────────┤
│  Controllers Layer (8 Controllers)              │
│  ├─ DoctorController                           │
│  ├─ PatientController                          │
│  ├─ AppointmentController                      │
│  ├─ BillingController                          │
│  ├─ EHRRecordController                        │
│  ├─ StaffController                            │
│  ├─ PharmacyController                         │
│  └─ DashboardController                        │
├─────────────────────────────────────────────────┤
│  Services Layer (8 Services)                    │
│  ├─ DoctorService                              │
│  ├─ PatientService                             │
│  ├─ AppointmentService                         │
│  ├─ BillingService                             │
│  ├─ EHRRecordService                           │
│  ├─ StaffService                               │
│  ├─ PharmacyService                            │
│  └─ DashboardService                           │
├─────────────────────────────────────────────────┤
│  Repository Layer (Spring Data JPA)            │
│  ├─ DoctorRepository                           │
│  ├─ PatientRepository                          │
│  ├─ AppointmentRepository                      │
│  ├─ BillingRepository                          │
│  ├─ EHRRecordRepository                        │
│  ├─ StaffRepository                            │
│  ├─ PharmacyRepository                         │
│  └─ UserRepository                             │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓ JDBC/Hibernate ORM
┌─────────────────────────────────────────────────┐
│     DATABASE (MySQL/PostgreSQL)                 │
│  ├─ users                                       │
│  ├─ doctors                                     │
│  ├─ patients                                    │
│  ├─ appointments                                │
│  ├─ billings                                    │
│  ├─ ehr_records                                 │
│  ├─ staff                                       │
│  ├─ pharmacy                                    │
│  └─ [Supporting Tables]                        │
└─────────────────────────────────────────────────┘
```

### Deployment Architecture
```
Frontend (Static Files)
  └─ index.html, CSS, JS files served via HTTP

Backend (Spring Boot Application)
  └─ Runs on http://localhost:8081
  └─ Exposes REST APIs at /api/* endpoints

Database Server
  └─ MySQL/PostgreSQL on standard ports
  └─ Configured via application.properties
```

---

## TECHNOLOGY STACK

### Backend Technologies
| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Java | 21 |
| Framework | Spring Boot | 3.x |
| ORM | Spring Data JPA + Hibernate | Latest |
| Enterprise | Jakarta EE | 10 |
| Build Tool | Maven | 3.9+ |
| Database | MySQL/PostgreSQL | 8.0+/13+ |
| API Style | RESTful API | Stateless |
| Dependency Injection | Spring DI | Built-in |

**Backend Dependencies:**
- `spring-boot-starter-web` - REST API support
- `spring-boot-starter-data-jpa` - Database ORM
- `spring-boot-starter-validation` - Input validation
- `mysql-connector-java` - MySQL driver
- `postgresql` - PostgreSQL driver
- `lombok` - Code generation (reduced boilerplate)
- `jackson-databind` - JSON processing
- `spring-boot-starter-test` - Testing framework

### Frontend Technologies
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Markup | HTML5 | Page structure |
| Styling | CSS3 + Bootstrap 5 | Responsive design |
| Utility CSS | Tailwind CSS | Quick styling |
| Programming | JavaScript (ES6+) | Interactivity |
| Calendar | FullCalendar | Appointment scheduling |
| Data Tables | DataTables | Data display & sorting |
| Alerts | SweetAlert2 | User notifications |
| Charts | Chart.js | Analytics & graphs |
| HTTP | Fetch API | API communication |

**Frontend Libraries:**
- Bootstrap 5 - Responsive grid system, components, utilities
- Font Awesome Icons - Icon library
- Tailwind CSS - Utility-first CSS framework
- FullCalendar JS - Interactive calendar widget
- jQuery (for legacy support) - DOM manipulation
- DataTables - Advanced table features
- SweetAlert2 - Beautiful alerts and dialogs
- Chart.js - Simple yet flexible charting library
- Moment.js - Date/time manipulation

---

## MODULES & FEATURES

### Module 1: Doctor Management
**Purpose:** Manage doctor profiles, specializations, and availability

**Features:**
- Add, view, edit, and delete doctor records
- Store specialization information
- Contact information (phone, email)
- Availability schedule
- Experience and qualifications

**Frontend:** `frontend/src/Doctors/`
- `doctors.html` - Doctor list and form
- `doctors.js` - API integration logic
- `doctors.css` - Custom styling

**Backend Endpoints:**
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/{id}` - Get doctor details
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

---

### Module 2: Patient Management
**Purpose:** Maintain comprehensive patient records

**Features:**
- Patient registration and profile management
- Medical history tracking
- Contact information and emergency contacts
- Age, gender, blood group records
- Health conditions and allergies documentation

**Frontend:** `frontend/src/Patients/`
- `patients.html` - Patient directory
- `patients.js` - Frontend logic
- `patients.css` - Styling

**Backend Endpoints:**
- `GET /api/patients` - List all patients
- `GET /api/patients/{id}` - Get patient details
- `POST /api/patients` - Register new patient
- `PUT /api/patients/{id}` - Update patient info
- `DELETE /api/patients/{id}` - Delete patient record

---

### Module 3: Appointment Scheduling
**Purpose:** Manage doctor-patient appointments with calendar view

**Features:**
- Interactive calendar interface (FullCalendar)
- Schedule appointments between doctors and patients
- Appointment status tracking (scheduled, completed, cancelled)
- Conflict detection and prevention
- Appointment reminders
- Real-time calendar updates

**Frontend:** `frontend/src/Appoinment/`
- `Appointment.html` - Calendar interface
- `Appointment.js` - Calendar logic with API integration
- `Appointment.css` - Calendar styling

**Technical Implementation:**
```javascript
// FullCalendar Integration
const API_BASE_URL = 'http://localhost:8081/api/appointments';

// Fetch appointments from backend
async function fetchAppointments() {
  const response = await fetch(API_BASE_URL);
  const appointments = await response.json();
  return appointments.map(apt => ({
    id: apt.id,
    title: `${apt.patient.name} - ${apt.doctor.name}`,
    start: apt.appointmentDate,
    end: apt.appointmentDate,
    status: apt.status
  }));
}

// Create new appointment
async function createAppointment(patientId, doctorId, date) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patientId, doctorId, appointmentDate: date })
  });
  return await response.json();
}

// Delete appointment
async function deleteAppointment(appointmentId) {
  await fetch(`${API_BASE_URL}/${appointmentId}`, { method: 'DELETE' });
}
```

**Backend Endpoints:**
- `GET /api/appointments` - List all appointments
- `GET /api/appointments/{id}` - Get appointment details
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Cancel appointment

---

### Module 4: Electronic Health Records (EHR)
**Purpose:** Maintain secure electronic health records for patients

**Features:**
- Medical history documentation
- Diagnosis and treatment records
- Prescription tracking
- Lab test results
- Medical notes from doctors
- Secure record storage and retrieval

**Frontend:** `frontend/src/EHR/`
- `ehr.html` - EHR interface
- `ehr.js` - EHR logic
- `ehr.css` - EHR styling

**Database Entity Structure:**
```java
@Entity
@Table(name = "ehr_records")
public class EHRRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    private String diagnosis;
    private String treatment;
    private String prescription;
    private String labResults;
    private String medicalNotes;
    private LocalDateTime recordDate;
}
```

**Backend Endpoints:**
- `GET /api/ehr` - List all EHR records
- `GET /api/ehr/{id}` - Get specific record
- `POST /api/ehr` - Create new EHR record
- `PUT /api/ehr/{id}` - Update EHR record
- `DELETE /api/ehr/{id}` - Delete record

---

### Module 5: Billing & Invoicing
**Purpose:** Manage patient billing and invoice generation

**Features:**
- Bill creation for patient services
- Automatic tax calculation
- Invoice generation and printing
- Payment tracking
- Bill history and reports
- Discount and adjustment handling

**Frontend:** `frontend/src/Billings/`
- `billing.html` - Billing interface
- `billing.js` - Billing logic
- `billing.css` - Billing styling

**Database Entity Structure:**
```java
@Entity
@Table(name = "billings")
public class Billing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    
    private Double amount;
    private Double taxAmount;
    private Double totalAmount; // Auto-calculated
    private String description;
    private LocalDate billDate;
    private String paymentStatus; // Paid/Pending/Cancelled
}
```

**Business Logic:**
```java
// Automatic calculation in BillingService
public Billing createBilling(Billing billing) {
    // Validate patient exists
    Patient patient = patientRepository.findById(billing.getPatient().getId())
        .orElseThrow(() -> new RuntimeException("Patient not found"));
    
    // Auto-calculate total
    Double taxAmount = billing.getAmount() * 0.10; // 10% tax
    Double totalAmount = billing.getAmount() + taxAmount;
    
    billing.setTaxAmount(taxAmount);
    billing.setTotalAmount(totalAmount);
    billing.setPatient(patient);
    billing.setBillDate(LocalDate.now());
    
    return billingRepository.save(billing);
}
```

**Backend Endpoints:**
- `GET /api/billings` - List all bills
- `GET /api/billings/{id}` - Get bill details
- `POST /api/billings` - Create new bill
- `PUT /api/billings/{id}` - Update bill
- `DELETE /api/billings/{id}` - Delete bill
- `GET /api/billings/patient/{patientId}` - Get patient bills

---

### Module 6: Staff Management
**Purpose:** Organize and manage hospital staff

**Features:**
- Staff registration (nurses, administrators, technicians, etc.)
- Department assignment
- Role-based access control
- Contact information
- Employment status
- Shift scheduling

**Frontend:** `frontend/src/Staff/`
- `staff.html` - Staff directory
- `staff.js` - Staff management logic
- `staff.css` - Staff styling

**Backend Endpoints:**
- `GET /api/staff` - List all staff members
- `GET /api/staff/{id}` - Get staff details
- `POST /api/staff` - Add new staff member
- `PUT /api/staff/{id}` - Update staff info
- `DELETE /api/staff/{id}` - Remove staff member

---

### Module 7: Pharmacy Management
**Purpose:** Manage medicines and pharmacy operations

**Features:**
- Medicine inventory tracking
- Stock management (add/update/remove)
- Medicine pricing
- Prescription fulfillment
- Pharmacy location management
- Expiry date tracking

**Frontend:** `frontend/src/Pharmacy/`
- `Pharmacy.html` - Pharmacy interface
- `Pharmacy.js` - Pharmacy logic
- `Pharmacy.css` - Pharmacy styling
- `Medicine/` - Medicine inventory
- `Pharmacy-Location/` - Pharmacy locations

**Backend Endpoints:**
- `GET /api/pharmacy` - List medicines
- `GET /api/pharmacy/{id}` - Get medicine details
- `POST /api/pharmacy` - Add new medicine
- `PUT /api/pharmacy/{id}` - Update medicine info
- `DELETE /api/pharmacy/{id}` - Remove medicine

---

### Module 8: Dashboard
**Purpose:** Provide real-time analytics and system overview

**Features:**
- Key statistics (Total Doctors, Patients, Appointments, Staff)
- Graphical charts and graphs
- Recent appointments list
- Upcoming appointments
- System health indicators
- Quick action buttons

**Frontend:** `index.html`
- Statistics section with live data
- Dashboard cards with icons
- Charts (using Chart.js)

**Backend Implementation:**
```javascript
// Frontend Dashboard Stats Fetching
async function loadDashboardStats() {
  try {
    const doctorsRes = await fetch('http://localhost:8081/api/doctors');
    const patientsRes = await fetch('http://localhost:8081/api/patients');
    const appointmentsRes = await fetch('http://localhost:8081/api/appointments');
    const staffRes = await fetch('http://localhost:8081/api/staff');
    
    const doctors = await doctorsRes.json();
    const patients = await patientsRes.json();
    const appointments = await appointmentsRes.json();
    const staff = await staffRes.json();
    
    // Update dashboard with counts
    document.getElementById('doctorCount').textContent = doctors.length;
    document.getElementById('patientCount').textContent = patients.length;
    document.getElementById('appointmentCount').textContent = appointments.length;
    document.getElementById('staffCount').textContent = staff.length;
  } catch (error) {
    console.error('Error loading dashboard stats:', error);
  }
}
```

---

## DATABASE DESIGN

### Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    User     │ (Base entity for authentication)
├─────────────┤
│ id (PK)     │
│ username    │
│ password    │
│ email       │
└──────┬──────┘
       │
       ├─────────────────────────┬─────────────────────────┐
       ↓                         ↓                         ↓
   ┌──────────┐          ┌──────────┐            ┌──────────┐
   │ Doctor   │          │ Patient  │            │  Staff   │
   ├──────────┤          ├──────────┤            ├──────────┤
   │ id (PK)  │          │ id (PK)  │            │ id (PK)  │
   │ name     │          │ name     │            │ name     │
   │ spec.    │          │ dob      │            │ dept.    │
   │ email    │          │ gender   │            │ role     │
   │ phone    │          │ address  │            │ email    │
   │ license# │          │ phone    │            │ phone    │
   └────┬─────┘          └────┬─────┘            └──────────┘
        │                     │
        └─────────┬───────────┘
                  ↓
         ┌─────────────────┐
         │  Appointment    │
         ├─────────────────┤
         │ id (PK)         │
         │ doctor_id (FK)  │
         │ patient_id (FK) │
         │ date_time       │
         │ status          │
         └────────┬────────┘
                  │
        ┌─────────┴──────────────────────┐
        ↓                                ↓
   ┌──────────────┐            ┌─────────────────┐
   │ EHRRecord    │            │  Billing        │
   ├──────────────┤            ├─────────────────┤
   │ id (PK)      │            │ id (PK)         │
   │ doctor_id(FK)│            │ patient_id (FK) │
   │ patient_id(FK)           │ amount          │
   │ diagnosis    │            │ tax_amount      │
   │ treatment    │            │ total_amount    │
   │ prescription │            │ bill_date       │
   │ notes        │            │ status          │
   └──────────────┘            └─────────────────┘

┌──────────────┐
│  Pharmacy    │
├──────────────┤
│ id (PK)      │
│ medicine_name│
│ dosage       │
│ price        │
│ stock        │
│ expiry_date  │
└──────────────┘
```

### Key Database Tables

#### Table: doctors
```sql
CREATE TABLE doctors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    experience_years INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Table: patients
```sql
CREATE TABLE patients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(10),
    address TEXT,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    emergency_contact VARCHAR(15),
    medical_history TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Table: appointments
```sql
CREATE TABLE appointments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    UNIQUE KEY unique_appointment (doctor_id, patient_id, appointment_date)
);
```

#### Table: billings
```sql
CREATE TABLE billings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    description VARCHAR(255),
    bill_date DATE DEFAULT CURDATE(),
    payment_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);
```

#### Table: ehr_records
```sql
CREATE TABLE ehr_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    diagnosis VARCHAR(255),
    treatment VARCHAR(255),
    prescription VARCHAR(255),
    lab_results TEXT,
    medical_notes TEXT,
    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

#### Table: staff
```sql
CREATE TABLE staff (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    employment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Table: pharmacy
```sql
CREATE TABLE pharmacy (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API DOCUMENTATION

### Base URL
```
http://localhost:8081/api
```

### API Overview
The MediHub REST API provides 34+ endpoints across 8 modules.

### Doctor API Endpoints

```
GET    /api/doctors                    - Get all doctors
GET    /api/doctors/{id}               - Get doctor by ID
POST   /api/doctors                    - Create new doctor
PUT    /api/doctors/{id}               - Update doctor
DELETE /api/doctors/{id}               - Delete doctor
GET    /api/doctors/specialization/{spec} - Search by specialization
```

**Request/Response Examples:**

```json
POST /api/doctors
Content-Type: application/json

Request Body:
{
  "name": "Dr. Rajesh Kumar",
  "specialization": "Cardiology",
  "licenseNumber": "LIC123456",
  "phone": "9876543210",
  "email": "rajesh@hospital.com",
  "experienceYears": 15
}

Response (201 Created):
{
  "id": 1,
  "name": "Dr. Rajesh Kumar",
  "specialization": "Cardiology",
  "licenseNumber": "LIC123456",
  "phone": "9876543210",
  "email": "rajesh@hospital.com",
  "experienceYears": 15,
  "createdAt": "2025-11-30T10:00:00"
}
```

### Patient API Endpoints

```
GET    /api/patients                   - Get all patients
GET    /api/patients/{id}              - Get patient by ID
POST   /api/patients                   - Register new patient
PUT    /api/patients/{id}              - Update patient
DELETE /api/patients/{id}              - Delete patient
GET    /api/patients/search/{name}     - Search by name
```

**Request/Response Examples:**

```json
POST /api/patients
Content-Type: application/json

Request Body:
{
  "name": "Amit Sharma",
  "dateOfBirth": "1990-05-15",
  "gender": "Male",
  "bloodGroup": "O+",
  "address": "123 Main St, City",
  "phone": "9876543210",
  "email": "amit@email.com",
  "emergencyContact": "9876543211",
  "medicalHistory": "Diabetes",
  "allergies": "Penicillin"
}

Response (201 Created):
{
  "id": 1,
  "name": "Amit Sharma",
  "dateOfBirth": "1990-05-15",
  "gender": "Male",
  "bloodGroup": "O+",
  ...
}
```

### Appointment API Endpoints

```
GET    /api/appointments               - Get all appointments
GET    /api/appointments/{id}          - Get appointment details
POST   /api/appointments               - Create appointment
PUT    /api/appointments/{id}          - Update appointment
DELETE /api/appointments/{id}          - Cancel appointment
GET    /api/appointments/doctor/{docId} - Get doctor's appointments
GET    /api/appointments/patient/{patId} - Get patient's appointments
```

**Request/Response Examples:**

```json
POST /api/appointments
Content-Type: application/json

Request Body:
{
  "doctorId": 1,
  "patientId": 1,
  "appointmentDate": "2025-12-15T10:00:00"
}

Response (201 Created):
{
  "id": 1,
  "doctor": {
    "id": 1,
    "name": "Dr. Rajesh Kumar"
  },
  "patient": {
    "id": 1,
    "name": "Amit Sharma"
  },
  "appointmentDate": "2025-12-15T10:00:00",
  "status": "Scheduled"
}
```

### Billing API Endpoints

```
GET    /api/billings                   - Get all bills
GET    /api/billings/{id}              - Get bill details
POST   /api/billings                   - Create bill
PUT    /api/billings/{id}              - Update bill
DELETE /api/billings/{id}              - Delete bill
GET    /api/billings/patient/{patId}   - Get patient's bills
```

**Request/Response Examples:**

```json
POST /api/billings
Content-Type: application/json

Request Body:
{
  "patientId": 1,
  "amount": 5000.00,
  "description": "Consultation and Lab Tests"
}

Response (201 Created):
{
  "id": 1,
  "patient": {
    "id": 1,
    "name": "Amit Sharma"
  },
  "amount": 5000.00,
  "taxAmount": 500.00,
  "totalAmount": 5500.00,
  "billDate": "2025-11-30",
  "paymentStatus": "Pending"
}
```

### EHR API Endpoints

```
GET    /api/ehr                        - Get all EHR records
GET    /api/ehr/{id}                   - Get EHR record
POST   /api/ehr                        - Create EHR record
PUT    /api/ehr/{id}                   - Update EHR record
DELETE /api/ehr/{id}                   - Delete record
GET    /api/ehr/patient/{patId}        - Get patient's EHR
```

### Staff API Endpoints

```
GET    /api/staff                      - Get all staff
GET    /api/staff/{id}                 - Get staff details
POST   /api/staff                      - Add staff member
PUT    /api/staff/{id}                 - Update staff
DELETE /api/staff/{id}                 - Delete staff
GET    /api/staff/department/{dept}    - Get by department
```

### Pharmacy API Endpoints

```
GET    /api/pharmacy                   - Get all medicines
GET    /api/pharmacy/{id}              - Get medicine details
POST   /api/pharmacy                   - Add medicine
PUT    /api/pharmacy/{id}              - Update medicine
DELETE /api/pharmacy/{id}              - Delete medicine
GET    /api/pharmacy/search/{name}     - Search medicines
```

### Dashboard API Endpoints

```
GET    /api/dashboard/stats            - Get system statistics
GET    /api/dashboard/doctors/count    - Doctor count
GET    /api/dashboard/patients/count   - Patient count
GET    /api/dashboard/appointments/count - Appointment count
GET    /api/dashboard/staff/count      - Staff count
```

### Error Handling

All API endpoints follow standard HTTP status codes:

```
200 OK              - Request successful
201 Created         - Resource created successfully
204 No Content      - Request successful, no content to return
400 Bad Request     - Invalid request parameters
401 Unauthorized    - Authentication required
403 Forbidden       - Access denied
404 Not Found       - Resource not found
500 Server Error    - Internal server error
```

**Error Response Format:**

```json
{
  "error": "Patient not found",
  "status": 404,
  "timestamp": "2025-11-30T10:00:00"
}
```

---

## FRONTEND COMPONENTS

### Page Structure

#### 1. index.html (Homepage)
**Purpose:** Main landing page with navigation and dashboard
**Sections:**
- Hero section with CTA
- Navigation bar with module links
- Services section (8 modules)
- Statistics dashboard
- About section
- Resume/Portfolio section
- Footer

**Key Features:**
- Responsive design with Bootstrap 5
- Live statistics fetching from backend
- Module descriptions and quick links
- Professional portfolio showcase

#### 2. Doctors Module (`frontend/src/Doctors/`)
- `doctors.html` - Doctor list interface
- `doctors.js` - CRUD operations with API
- `doctors.css` - Custom styling

**Features:**
- Doctor list with DataTables
- Add new doctor form
- Edit doctor information
- Delete doctor records
- Search and filter functionality

#### 3. Patients Module (`frontend/src/Patients/`)
- `patients.html` - Patient directory
- `patients.js` - Patient management
- `patients.css` - Styling

**Features:**
- Patient list and search
- Patient registration form
- Edit patient details
- View medical history
- Delete patient records

#### 4. Appointments Module (`frontend/src/Appoinment/`)
- `Appointment.html` - Calendar interface
- `Appointment.js` - FullCalendar integration
- `Appointment.css` - Calendar styling

**Technical Features:**
```javascript
// Appointment.js - Key Implementation

const API_BASE_URL = 'http://localhost:8081/api/appointments';

// Fetch appointments from backend with proper error handling
async function fetchAppointments() {
  try {
    const response = await fetch(API_BASE_URL);
    const appointments = await response.json();
    
    return appointments.map(apt => ({
      id: apt.id,
      title: `${apt.patient.name} - ${apt.doctor.name}`,
      start: apt.appointmentDate,
      backgroundColor: apt.status === 'Completed' ? '#28a745' : '#007bff'
    }));
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

// Create appointment with validation
async function createAppointment(patientId, doctorId, date) {
  if (!patientId || !doctorId || !date) {
    throw new Error('Invalid appointment data');
  }
  
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientId,
      doctorId,
      appointmentDate: date
    })
  });
  
  if (!response.ok) throw new Error('Failed to create appointment');
  return await response.json();
}

// Delete appointment with confirmation
async function deleteAppointment(appointmentId) {
  const confirmed = await Swal.fire({
    title: 'Cancel Appointment?',
    text: 'This action cannot be undone',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel it'
  });
  
  if (confirmed.isConfirmed) {
    await fetch(`${API_BASE_URL}/${appointmentId}`, { method: 'DELETE' });
    Swal.fire('Cancelled', 'Appointment cancelled successfully', 'success');
  }
}
```

#### 5. EHR Module (`frontend/src/EHR/`)
- `ehr.html` - EHR interface
- `ehr.js` - EHR management
- `ehr.css` - Styling

**Features:**
- View patient health records
- Create EHR entries
- Track diagnoses and treatments
- Manage prescriptions
- View medical notes

#### 6. Billing Module (`frontend/src/Billings/`)
- `billing.html` - Billing interface
- `billing.js` - Billing operations
- `billing.css` - Styling

**Features:**
- Create patient bills
- Auto-calculate tax and total
- View billing history
- Generate invoices
- Track payment status

#### 7. Pharmacy Module (`frontend/src/Pharmacy/`)
- `Pharmacy.html` - Pharmacy interface
- `Pharmacy.js` - Medicine management
- `Pharmacy.css` - Styling
- Medicine inventory subsection
- Pharmacy location subsection

**Features:**
- Medicine inventory tracking
- Add/update/delete medicines
- Check stock levels
- Track expiry dates
- Price management

#### 8. Staff Module (`frontend/src/Staff/`)
- `staff.html` - Staff directory
- `staff.js` - Staff management
- `staff.css` - Styling

**Features:**
- Staff list and search
- Add new staff member
- Update staff information
- Department assignment
- Role management

---

## INSTALLATION & SETUP

### Prerequisites
- Java 21 JDK installed
- Maven 3.9+ installed
- MySQL 8.0+ or PostgreSQL 13+ database
- Modern web browser (Chrome, Firefox, Edge)
- Git for version control

### Backend Setup

#### 1. Clone Repository
```bash
git clone https://github.com/Kamaleshwaran11/MediHub.git
cd MediHub/backend
```

#### 2. Configure Database
Edit `src/main/resources/application.properties`:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/medihub_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=8081
server.servlet.context-path=/
```

#### 3. Create Database
```bash
mysql -u root -p
CREATE DATABASE medihub_db;
USE medihub_db;
```

#### 4. Build & Run Backend
```bash
# Using Maven wrapper
./mvnw clean install
./mvnw spring-boot:run

# Or using Maven directly
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8081`

### Frontend Setup

#### 1. Open Frontend Files
```bash
cd MediHub/frontend
```

#### 2. Serve Frontend
```bash
# Using Python SimpleHTTPServer (Python 3)
python -m http.server 8000

# Or using Node.js http-server
npx http-server

# Or simply open index.html in browser
```

#### 3. Access Application
```
http://localhost:8000 (if using Python server)
http://localhost:8081 (if using backend's static files)
```

### Database Setup Script

```sql
-- Create MediHub Database
CREATE DATABASE IF NOT EXISTS medihub_db;
USE medihub_db;

-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE doctors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    experience_years INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Patients Table
CREATE TABLE patients (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(10),
    address TEXT,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    emergency_contact VARCHAR(15),
    medical_history TEXT,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Appointments Table
CREATE TABLE appointments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    UNIQUE KEY unique_appointment (doctor_id, patient_id, appointment_date)
);

-- Billings Table
CREATE TABLE billings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    description VARCHAR(255),
    bill_date DATE DEFAULT CURDATE(),
    payment_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- EHR Records Table
CREATE TABLE ehr_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    diagnosis VARCHAR(255),
    treatment VARCHAR(255),
    prescription VARCHAR(255),
    lab_results TEXT,
    medical_notes TEXT,
    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Staff Table
CREATE TABLE staff (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    employment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Pharmacy Table
CREATE TABLE pharmacy (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## PROJECT STATISTICS

### Code Metrics

| Metric | Value |
|--------|-------|
| **Backend Controllers** | 8 |
| **Backend Services** | 8 |
| **Repository Classes** | 8 |
| **REST API Endpoints** | 34+ |
| **Database Tables** | 9+ |
| **Frontend HTML Pages** | 9 |
| **Frontend JavaScript Files** | 9 |
| **Frontend CSS Files** | 9 |
| **Total Lines of Code** | 5000+ |
| **Build Tool** | Maven 3.9+ |
| **Java Version** | Java 21 |
| **Spring Boot Version** | 3.x |

### Module Coverage

| Module | Status | Features |
|--------|--------|----------|
| Doctor Management | ✅ Complete | CRUD, Search, Specialization Filter |
| Patient Management | ✅ Complete | CRUD, Medical History, Emergency Contact |
| Appointment Scheduling | ✅ Complete | Calendar View, Conflict Detection, Status Tracking |
| EHR Management | ✅ Complete | Diagnosis, Treatment, Prescriptions, Notes |
| Billing System | ✅ Complete | Auto-calculation, Tax, Invoice, Payment Status |
| Staff Management | ✅ Complete | CRUD, Department Assignment, Role Management |
| Pharmacy Management | ✅ Complete | Inventory, Stock Tracking, Expiry Dates |
| Dashboard | ✅ Complete | Real-time Stats, Charts, Quick Actions |

### Test Coverage
- Unit Tests: Comprehensive service layer testing
- Integration Tests: API endpoint validation
- Manual Testing: All CRUD operations validated

---

## DEVELOPMENT PROCESS

### Development Timeline

#### Phase 1: Backend Setup
- ✅ Spring Boot project initialization
- ✅ Maven configuration and dependencies
- ✅ Database design and schema creation
- ✅ Entity model creation with JPA annotations

#### Phase 2: API Development
- ✅ Controller layer implementation (8 controllers)
- ✅ Service layer with business logic
- ✅ Repository layer with custom queries
- ✅ RESTful endpoint configuration
- ✅ Error handling and validation

**Issues Resolved:**
- Fixed complex entity relationships in JPA
- Resolved `setPatientName()` non-existent method calls
- Implemented proper entity setters (`setPatient()`, `setDoctor()`)
- Added `@Query` annotation for relationship queries

#### Phase 3: Frontend Development
- ✅ HTML pages for all modules
- ✅ CSS styling with Bootstrap 5 and Tailwind
- ✅ JavaScript with Fetch API integration
- ✅ FullCalendar integration for appointments
- ✅ Form validation and user feedback

**Frontend Integration Improvements:**
- Appointment.js complete rewrite with API integration
- Dynamic doctor/patient dropdown population
- Real-time appointment creation and deletion
- Error handling with SweetAlert2 notifications

#### Phase 4: Integration & Testing
- ✅ Frontend-Backend API integration
- ✅ CORS configuration
- ✅ JSON serialization/deserialization
- ✅ Manual testing of all modules
- ✅ Build verification with Maven

#### Phase 5: Deployment
- ✅ Production build configuration
- ✅ Database optimization
- ✅ Security hardening
- ✅ Performance optimization

### Technology Decisions

1. **Spring Boot 3.x** - Modern, lightweight, highly scalable framework
2. **Spring Data JPA** - Simplifies database operations with proper relationship handling
3. **MySQL/PostgreSQL** - Reliable relational database
4. **Bootstrap 5** - Industry-standard responsive framework
5. **FullCalendar** - Feature-rich calendar solution
6. **DataTables** - Advanced table display and sorting
7. **SweetAlert2** - Modern user-friendly alerts
8. **RESTful API** - Standard, scalable API architecture

### Git Repository Structure

```
MediHub/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/medihub/
│   │   │   │   ├── controller/      (8 Controllers)
│   │   │   │   ├── service/         (8 Services)
│   │   │   │   ├── repository/      (8 Repositories)
│   │   │   │   ├── model/           (Entity Models)
│   │   │   │   └── MediHubApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── frontend/
│   ├── index.html              (Homepage)
│   ├── src/
│   │   ├── Doctors/            (Module)
│   │   ├── Patients/           (Module)
│   │   ├── Appoinment/         (Module)
│   │   ├── Billings/           (Module)
│   │   ├── EHR/                (Module)
│   │   ├── Staff/              (Module)
│   │   ├── Pharmacy/           (Module)
│   │   └── Dashboards/         (Module)
│   ├── css/                    (Stylesheets)
│   ├── js/                     (JavaScript)
│   └── lib/                    (Libraries)
├── README.md
├── LICENSE
└── REFACTORING_SUMMARY.md
```

### Build & Deployment Commands

```bash
# Clean and build
mvn clean install

# Run backend
mvn spring-boot:run

# Run tests
mvn test

# Package for deployment
mvn clean package

# Create executable JAR
mvn package
java -jar target/medihub-1.0.0.jar
```

### Performance Optimizations

1. **Database Indexing** - Indexes on frequently queried columns
2. **Query Optimization** - Custom JPA queries for complex searches
3. **Lazy Loading** - Prevents unnecessary entity loading
4. **Caching** - Application-level caching for frequently accessed data
5. **Frontend Optimization** - Minified CSS/JS, compressed images
6. **API Response** - Proper HTTP caching headers
7. **Connection Pooling** - Optimized database connection management

---

## CONCLUSION

MediHub is a comprehensive, production-ready healthcare management system that demonstrates:

✅ **Full-Stack Development** - Proficiency in both backend and frontend technologies  
✅ **System Design** - Well-architected MVC pattern with proper separation of concerns  
✅ **Database Design** - Efficient relational database with proper relationships  
✅ **API Development** - RESTful API with 34+ endpoints  
✅ **Frontend Integration** - Seamless API integration with modern libraries  
✅ **Problem-Solving** - Resolution of complex technical issues  
✅ **Code Quality** - Clean, maintainable, well-documented code  
✅ **User Experience** - Responsive, intuitive interface  

The project successfully integrates 8 interconnected modules into a cohesive system ready for healthcare organizations to streamline operations and improve patient care.

---

**Project Repository:** https://github.com/Kamaleshwaran11/MediHub  
**Status:** ✅ Production Ready  
**Last Updated:** November 30, 2025  
**Version:** 1.0.0
