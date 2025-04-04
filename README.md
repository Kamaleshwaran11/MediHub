# MediHub
 MediHub is a healthcare application developed using Java and MySQL, focused on providing a seamless experience for managing patient records, appointments, and healthcare data. This project utilizes Java JDBC for performing CRUD operations to interact with the database.
## Project Structure
```
MediHub/
├── src/ 
│   ├── main/ 
│   │   ├── java/  
│   │   │   ├── com/medihub/ 
│   │   │   │   ├── controllers/      # Handles user requests and interactions 
│   │   │   │   ├── models/           # Java classes for data models (e.g., Patient, Appointment) 
│   │   │   │   ├── dao/              # Data Access Objects for CRUD operations with JDBC 
│   │   │   │   ├── utils/            # Utility classes for DB connections, etc.
│   │   │   │   └── MediHubApp.java   # Main application entry point
│   │   └── resources/
│   │       └── db.properties         # Database configurations
│
├── database/
│   ├── schema.sql                    # SQL script for creating tables
│   └── data.sql                      # Optional sample data for testing
│
├── docs/
│   └── README.md                     # Project documentation (this file)
│
└── .gitignore                        # Git ignore file to exclude unnecessary files from Git
```

## Project Components
- controllers/: Contains classes that handle user actions, such as adding or retrieving records.
- models/: Defines Java classes representing the data entities used in the application, like Patient and Appointment.
- dao/: Contains Data Access Object (DAO) classes responsible for CRUD operations, using JDBC to interact with the database.
- utils/: Utility classes for handling operations such as establishing a database connection.
- db.properties: Configuration file containing the database connection parameters (URL, username, password).
- schema.sql: SQL script for initializing the database structure.
- data.sql: Optional SQL script to insert sample data into the database for testing purposes.
## Features
- Patient Records Management: Register, update, view, and delete patient records.
- Appointment Scheduling: Schedule, modify, and cancel appointments.
- Medical Data Storage: Secure storage and easy retrieval of essential medical data.
## Technologies Used:
- Java (JDBC) for backend logic and database interaction. 
- MySQL for data storage and management.
## Getting Started
### Cloning the Repository 
To clone the project, open a terminal or command prompt and run:
```
git clone https://github.com/kamaleshwaran11/MediHub.git
cd MediHub
```
### Setting Up the Database
#### 1.Open MySQL and create a new database for the project:
```
CREATE DATABASE medihub_db;
```
#### 2.Execute the `schema.sql` file to create the necessary tables:
```
 USE medihub_db;
SOURCE path/to/schema.sql;
```
#### 3.(Optional) Execute the `data.sql` file to populate the database with initial test data:
```
SOURCE path/to/data.sql;
```
#### 4.Update the `db.properties` file with your MySQL credentials (username, password, and database URL). 
## Running the Application
### 1.Compile the Java files:
```
javac -d bin src/main/java/com/medihub/*.java
```
### 2.Run the main application:
```
java -cp bin com.medihub.MediHubApp
```
### Usage Guide
- Patient Management: Add, edit, or delete patient information through the application.
- Appointment Scheduling: Create, update, or delete appointments as needed.
- Medical Data Access: Access stored medical data securely and efficiently.


