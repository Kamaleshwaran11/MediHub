# MediHub - Healthcare Platform

## 📋 Overview

**MediHub** is a comprehensive, full-stack **Healthcare Platform** designed to streamline healthcare facility operations. Built with modern technologies, it provides integrated solutions for managing doctors, patients, appointments, billing, electronic health records, staff, and pharmacy operations all in one centralized platform.

### 🎯 Key Objectives
- ✅ Centralize healthcare data management
- ✅ Improve patient care through efficient scheduling
- ✅ Automate billing and invoice generation
- ✅ Maintain comprehensive electronic health records
- ✅ Streamline staff and pharmacy management
- ✅ Provide real-time analytics and reporting

---

## 🚀 Quick Start

### Prerequisites
Before you begin, ensure you have:
- **Java 21 JDK** installed
- **Maven 3.9+** installed
- **MySQL 8.0+** or **PostgreSQL 13+** database server
- **Modern web browser** (Chrome, Firefox, Edge)
- **Git** for version control

### Step 1: Clone Repository
```bash
git clone https://github.com/Kamaleshwaran11/MediHub.git
cd MediHub
```

### Step 2: Setup Database

#### Option A: MySQL
```bash
mysql -u root -p
CREATE DATABASE medihub_db;
USE medihub_db;
```


Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medihub_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

#### Option B: PostgreSQL
```bash
psql -U postgres
CREATE DATABASE medihub_db;
```

Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medihub_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### Step 3: Build & Run Backend
```bash
cd backend

# Using Maven wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# OR using Maven directly
mvn clean install
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**

### Step 4: Run Frontend
```bash
cd frontend

# Option A: Using Python (Python 3)
python -m http.server 8000

# Option B: Using Node.js
npx http-server

# Option C: Open directly in browser
Open index.html in your browser
```

### Step 5: Access Application
```
http://localhost:8000 (if using Python server)
http://localhost:8080 (if backend serves frontend)
```

---

## 📚 Usage Guide

### 1. Dashboard
**Location:** Home page (`index.html`)

**Features:**
- Real-time system statistics (Doctors, Patients, Appointments, Staff)
- Quick navigation to all modules
- Project overview and information
- Responsive design for all devices

**How to Use:**
1. Open the homepage
2. View live statistics fetched from backend
3. Click on module cards to navigate to specific modules
4. Scroll down to see project details and resume section

---

### 2. Doctor Management
**Location:** `frontend/src/Doctors/`

**Features:**
- Add new doctors with specialization
- View all doctors in a table format
- Edit doctor information
- Delete doctor records
- Search and filter by specialization

**How to Use:**

**Add Doctor:**
1. Click on "Doctors" in navigation
2. Click "Add New Doctor" button
3. Fill in form:
   - Name (required)
   - Specialization (e.g., Cardiology, Neurology)
   - License Number
   - Phone & Email
   - Experience (in years)
4. Click "Save"

**View Doctors:**
1. Go to Doctors module
2. All doctors displayed in DataTable format
3. Use search box to find doctors
4. Sort by any column by clicking header

**Edit Doctor:**
1. Click "Edit" button in doctor row
2. Modify information
3. Click "Update"

**Delete Doctor:**
1. Click "Delete" button in doctor row
2. Confirm deletion

---

### 3. Patient Management
**Location:** `frontend/src/Patients/`

**Features:**
- Register new patients
- Maintain medical history
- Track allergies and emergency contacts
- Edit patient profiles
- Delete patient records

**How to Use:**

**Register Patient:**
1. Navigate to "Patients" module
2. Click "Register New Patient"
3. Fill in required information:
   - Name, Date of Birth, Gender
   - Blood Group, Address
   - Phone, Email
   - Emergency Contact
   - Medical History
   - Allergies (important!)
4. Click "Register"

**View Patient List:**
1. Go to Patients module
2. All registered patients displayed
3. Use search to find specific patient
4. Click on patient row to view details

**Update Patient:**
1. Click "Edit" button on patient row
2. Modify information
3. Click "Save Changes"

**Delete Patient:**
1. Click "Delete" button
2. Confirm deletion (action cannot be undone)

---

### 4. Appointment Scheduling
**Location:** `frontend/src/Appoinment/`

**Features:**
- Interactive calendar interface (FullCalendar)
- Schedule appointments between doctors and patients
- View upcoming appointments
- Cancel appointments
- Automatic conflict prevention

**How to Use:**

**Schedule New Appointment:**
1. Navigate to "Appointments" module
2. Click on calendar date or "Add Appointment" button
3. Select appointment details:
   - Choose Doctor from dropdown
   - Select Patient from dropdown
   - Pick date and time from date/time picker
4. Click "Create Appointment"
5. Appointment appears on calendar

**View Appointments:**
1. Go to Appointments module
2. Calendar displays all scheduled appointments
3. Color-coded by status:
   - Blue: Scheduled
   - Green: Completed
   - Red: Cancelled

**Manage Appointment:**
1. Click on appointment in calendar
2. View appointment details:
   - Doctor name & patient name
   - Date & time
   - Current status
3. Click "Cancel Appointment" to delete
4. Confirm cancellation

**Calendar Features:**
- Drag and drop appointments to reschedule
- Click date to see day view
- Month/Week/Day view options
- Color-coded status indicators

---

### 5. Electronic Health Records (EHR)
**Location:** `frontend/src/EHR/`

**Features:**
- Create medical records for patient visits
- Document diagnosis and treatment
- Record prescriptions
- Store lab results
- Maintain medical notes

**How to Use:**

**Create EHR Record:**
1. Go to "EHR" module
2. Click "Create New Record"
3. Enter information:
   - Select Patient
   - Select Attending Doctor
   - Diagnosis
   - Treatment provided
   - Prescribed medicines
   - Lab results (if any)
   - Medical notes
4. Click "Save Record"

**View Patient EHR:**
1. Search for patient in dropdown
2. View all medical records for patient
3. Records show chronological order
4. Click record to see full details

**Update EHR:**
1. Click "Edit" on existing record
2. Modify diagnosis, treatment, prescriptions
3. Update medical notes
4. Click "Update Record"

**Delete Record:**
1. Click "Delete" on record
2. Confirm deletion

---

### 6. Billing System
**Location:** `frontend/src/Billings/`

**Features:**
- Generate bills for patient services
- Automatic tax calculation (10% default)
- Track payment status
- View billing history
- Generate invoices

**How to Use:**

**Create Bill:**
1. Go to "Billing" module
2. Click "Create New Bill"
3. Enter details:
   - Select Patient
   - Enter Service Amount
   - Add Description (e.g., "Consultation", "Lab Tests")
4. **System automatically calculates:**
   - Tax (10% of amount)
   - Total Amount (Amount + Tax)
5. Click "Create Bill"

**View Bills:**
1. Billing module displays all bills
2. Table shows:
   - Patient Name
   - Amount, Tax, Total
   - Bill Date
   - Payment Status
3. Click "View" to see full invoice

**Update Bill:**
1. Click "Edit" on bill
2. Change amount or description
3. Click "Update" (totals auto-recalculate)

**Change Payment Status:**
1. Click bill status
2. Update from "Pending" to "Paid" or "Cancelled"
3. Click "Update"

**Search Bills:**
1. Use search box to find patient name
2. View all bills for that patient

---

### 7. Pharmacy Management
**Location:** `frontend/src/Pharmacy/`

**Features:**
- Manage medicine inventory
- Track stock levels
- Monitor expiry dates
- Update medicine prices
- Maintain pharmacy locations

**How to Use:**

**Add Medicine:**
1. Go to "Pharmacy" module
2. Click "Add New Medicine"
3. Fill in details:
   - Medicine Name
   - Dosage (e.g., 500mg, 10ml)
   - Price per unit
   - Stock Quantity
   - Expiry Date
4. Click "Add Medicine"

**View Inventory:**
1. Pharmacy module shows all medicines
2. Table displays:
   - Medicine name & dosage
   - Current stock quantity
   - Price & expiry date
3. Low stock items highlighted in red

**Update Stock:**
1. Click "Edit" on medicine
2. Update stock quantity
3. Click "Update"

**Check Expiry:**
1. Medicines expiring soon shown in orange
2. Expired medicines shown in red
3. System alerts before expiry

**Delete Medicine:**
1. Click "Delete" button
2. Confirm removal from inventory

---

### 8. Staff Management
**Location:** `frontend/src/Staff/`

**Features:**
- Manage hospital staff
- Assign departments and roles
- Track employment status
- Maintain staff contact information

**How to Use:**

**Add Staff Member:**
1. Go to "Staff" module
2. Click "Add New Staff"
3. Enter information:
   - Name
   - Department (e.g., Nursing, Admin, IT)
   - Role (e.g., Nurse, Administrator, Technician)
   - Phone & Email
   - Employment Status (Active, Inactive, On Leave)
4. Click "Add Staff"

**View Staff:**
1. Staff module displays all staff members
2. Organized by department
3. Shows contact information
4. Employment status indicators

**Update Staff:**
1. Click "Edit" on staff member
2. Modify information or status
3. Click "Update"

**Manage Status:**
1. Update employment status:
   - Active: Currently working
   - Inactive: No longer employed
   - On Leave: Temporary absence
2. Status changes reflected immediately

**Delete Staff:**
1. Click "Delete" button
2. Confirm removal

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication
Currently, the API does not require authentication. For production, implement JWT token authentication.

### Doctor Endpoints
```
GET    /api/doctors                    - Get all doctors
GET    /api/doctors/{id}               - Get specific doctor
POST   /api/doctors                    - Create new doctor
PUT    /api/doctors/{id}               - Update doctor
DELETE /api/doctors/{id}               - Delete doctor
```

### Patient Endpoints
```
GET    /api/patients                   - Get all patients
GET    /api/patients/{id}              - Get specific patient
POST   /api/patients                   - Register new patient
PUT    /api/patients/{id}              - Update patient
DELETE /api/patients/{id}              - Delete patient
```

### Appointment Endpoints
```
GET    /api/appointments               - Get all appointments
GET    /api/appointments/{id}          - Get specific appointment
POST   /api/appointments               - Create appointment
PUT    /api/appointments/{id}          - Update appointment
DELETE /api/appointments/{id}          - Cancel appointment
```

### Billing Endpoints
```
GET    /api/billings                   - Get all bills
GET    /api/billings/{id}              - Get specific bill
POST   /api/billings                   - Create bill
PUT    /api/billings/{id}              - Update bill
DELETE /api/billings/{id}              - Delete bill
GET    /api/billings/patient/{patId}   - Get patient's bills
```

### EHR Endpoints
```
GET    /api/ehr                        - Get all EHR records
GET    /api/ehr/{id}                   - Get specific record
POST   /api/ehr                        - Create EHR record
PUT    /api/ehr/{id}                   - Update record
DELETE /api/ehr/{id}                   - Delete record
```

### Staff Endpoints
```
GET    /api/staff                      - Get all staff
GET    /api/staff/{id}                 - Get specific staff
POST   /api/staff                      - Add staff member
PUT    /api/staff/{id}                 - Update staff
DELETE /api/staff/{id}                 - Delete staff
```

### Pharmacy Endpoints
```
GET    /api/pharmacy                   - Get all medicines
GET    /api/pharmacy/{id}              - Get medicine details
POST   /api/pharmacy                   - Add medicine
PUT    /api/pharmacy/{id}              - Update medicine
DELETE /api/pharmacy/{id}              - Delete medicine
```

### Example API Calls

**Create Patient:**
```bash
curl -X POST http://localhost:8080/api/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "dateOfBirth": "1990-05-15",
    "gender": "Male",
    "bloodGroup": "O+",
    "phone": "9876543210"
  }'
```

**Create Bill:**
```bash
curl -X POST http://localhost:8080/api/billings \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": 1,
    "amount": 5000.00,
    "description": "Consultation and Lab Tests"
  }'
```

**Get All Appointments:**
```bash
curl http://localhost:8080/api/appointments
```

---

## 🏗️ Project Structure

```
MediHub/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/medihub/
│   │   │   │   ├── controller/
│   │   │   │   │   ├── DoctorController.java
│   │   │   │   │   ├── PatientController.java
│   │   │   │   │   ├── AppointmentController.java
│   │   │   │   │   ├── BillingController.java
│   │   │   │   │   ├── EHRRecordController.java
│   │   │   │   │   ├── StaffController.java
│   │   │   │   │   └── PharmacyController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── DoctorService.java
│   │   │   │   │   ├── PatientService.java
│   │   │   │   │   ├── AppointmentService.java
│   │   │   │   │   ├── BillingService.java
│   │   │   │   │   ├── EHRRecordService.java
│   │   │   │   │   ├── StaffService.java
│   │   │   │   │   └── PharmacyService.java
│   │   │   │   ├── repository/
│   │   │   │   ├── model/
│   │   │   │   └── MediHubApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── Doctors/
│   │   ├── Patients/
│   │   ├── Appoinment/
│   │   ├── Billings/
│   │   ├── EHR/
│   │   ├── Staff/
│   │   ├── Pharmacy/
│   │   └── Dashboards/
│   ├── css/
│   ├── js/
│   ├── lib/
│   └── img/
├── README.md
├── LICENSE
└── MEDIHUB_PROJECT_DOCUMENTATION.md
```

---

## 🛠️ Technology Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Java | 21 |
| Framework | Spring Boot | 3.x |
| ORM | Spring Data JPA + Hibernate | Latest |
| Database | MySQL/PostgreSQL | 8.0+/13+ |
| Build Tool | Maven | 3.9+ |
| API Style | RESTful | Stateless |

### Frontend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Markup | HTML5 | Page structure |
| Styling | CSS3, Bootstrap 5, Tailwind CSS | Responsive design |
| Programming | JavaScript (ES6+) | Interactivity |
| Calendar | FullCalendar | Appointment scheduling |
| Tables | DataTables | Data display |
| Alerts | SweetAlert2 | User notifications |
| Charts | Chart.js | Analytics |

---

## 🚨 Troubleshooting

### Backend Won't Start
1. **Check Java version:**
   ```bash
   java -version
   ```
   Should be Java 21 or higher

2. **Check MySQL/PostgreSQL:**
   ```bash
   # MySQL
   mysql -u root -p
   
   # PostgreSQL
   psql -U postgres
   ```

3. **Check database connection:**
   ```bash
   # Verify database exists
   SHOW DATABASES; (MySQL)
   \l (PostgreSQL)
   ```

4. **Clear Maven cache:**
   ```bash
   mvn clean
   mvn install
   ```

### Frontend Not Loading Data
1. **Check backend is running:**
   - Visit http://localhost:8080/api/doctors
   - Should return JSON data

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for API errors

3. **Check CORS configuration:**
   - If API calls fail, backend may need CORS configuration

4. **Clear browser cache:**
   - Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)

### Database Connection Error
1. **Check connection string:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/medihub_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

2. **Verify database exists:**
   ```sql
   CREATE DATABASE IF NOT EXISTS medihub_db;
   ```

3. **Check database credentials:**
   - Ensure username and password are correct

---

## 📝 Common Tasks

### How to Add New Module?

1. Create Java entity in `backend/src/main/java/com/medihub/model/`
2. Create repository extending `JpaRepository`
3. Create service class for business logic
4. Create controller with REST endpoints
5. Create frontend HTML page in `frontend/src/ModuleName/`
6. Create JavaScript file for API integration
7. Create CSS file for styling
8. Add navigation link to `index.html`

### How to Deploy?

1. Build production JAR:
   ```bash
   mvn clean package -DskipTests
   ```

2. Run JAR file:
   ```bash
   java -jar target/medihub-*.jar
   ```

3. Deploy frontend to web server (Nginx, Apache)

### How to Backup Database?

**MySQL:**
```bash
mysqldump -u root -p medihub_db > backup.sql
```

**PostgreSQL:**
```bash
pg_dump -U postgres medihub_db > backup.sql
```

---

## 📊 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|------------|
| Java | JDK 21 | JDK 21+ |
| RAM | 2GB | 4GB+ |
| Disk Space | 500MB | 1GB+ |
| Database | MySQL 8.0 | MySQL 8.0+ |
| Browser | Modern (Chrome/Firefox) | Latest version |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Kamaleshwaran.S**
- GitHub: [@Kamaleshwaran11](https://github.com/Kamaleshwaran11)
- Project: [MediHub Repository](https://github.com/Kamaleshwaran11/MediHub)

---

## 📞 Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Check existing documentation
3. Review MEDIHUB_PROJECT_DOCUMENTATION.md for detailed information

---

**Last Updated:** November 30, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
