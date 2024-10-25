# MediHub
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
