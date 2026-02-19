const API_URL = "http://localhost:8081/api/patients";
let patients = [];
let currentEditingPatientId = null;

// Load patients on page load
document.addEventListener("DOMContentLoaded", function () {
    loadPatients();
    setupEventListeners();
});

// Load patients from API
function loadPatients() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load patients");
            return response.json();
        })
        .then(data => {
            patients = data || [];
            displayPatients(patients);
        })
        .catch(error => {
            console.error("Error loading patients:", error);
            alert("Failed to load patients. Make sure the backend is running.");
        });
}

// Display patients as cards
function displayPatients(list) {
    const container = document.getElementById("patientList");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p class='text-center col-12'>No patients found.</p>";
        return;
    }

    list.forEach(patient => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card shadow border-0 h-100">
                <div class="card-body">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            background: #17a2b8;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            color: #fff;
                            margin-right: 10px;">
                            ${patient.name ? patient.name.charAt(0).toUpperCase() : "P"}
                        </div>
                        <div>
                            <h5 class="mb-0">${patient.name}</h5>
                            <p class="text-muted mb-0" style="font-size: 12px;">${patient.age} years, ${patient.gender}</p>
                        </div>
                    </div>
                    <p class="mb-2"><strong>Phone:</strong> ${patient.phone || "N/A"}</p>
                    <p class="mb-3"><strong>ID:</strong> ${patient.id || "N/A"}</p>
                    <button class="btn btn-sm btn-primary w-100 mb-2" onclick="editPatient(${patient.id})">Edit</button>
                    <button class="btn btn-sm btn-danger w-100" onclick="deletePatient(${patient.id})">Delete</button>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

// Search/Filter patients
function filterPatients() {
    const text = document.getElementById("searchInput").value.toLowerCase();

    if (!text) {
        displayPatients(patients);
        return;
    }

    const filtered = patients.filter(patient =>
        (patient.name && patient.name.toLowerCase().includes(text)) ||
        (patient.phone && patient.phone.toLowerCase().includes(text)) ||
        (patient.gender && patient.gender.toLowerCase().includes(text))
    );

    displayPatients(filtered);
}

// Open Add Patient Popup
function openAddPatientPopup() {
    document.getElementById("addPatientForm").reset();
    currentEditingPatientId = null;
    document.getElementById("addPatientPopupOverlay").style.display = "block";
    document.getElementById("addPatientPopupWindow").style.display = "block";
}

// Close Add Patient Popup
function closeAddPatientPopup() {
    document.getElementById("addPatientPopupOverlay").style.display = "none";
    document.getElementById("addPatientPopupWindow").style.display = "none";
}

// Submit Add Patient Form
document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("addPatientForm");
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newPatient = {
                name: document.getElementById("patientName").value.trim(),
                age: parseInt(document.getElementById("patientAge").value),
                gender: document.getElementById("patientGender").value.trim(),
                phone: document.getElementById("patientPhone").value.trim()
            };

            // Validate fields
            if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.phone) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPatient)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to add patient");
                    return response.json();
                })
                .then(data => {
                    alert("Patient added successfully!");
                    closeAddPatientPopup();
                    loadPatients();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to add patient. Please try again.");
                });
        });
    }
});

// Edit Patient
function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        alert("Patient not found");
        return;
    }

    currentEditingPatientId = patientId;
    document.getElementById("editPatientName").value = patient.name;
    document.getElementById("editPatientAge").value = patient.age;
    document.getElementById("editPatientGender").value = patient.gender;
    document.getElementById("editPatientPhone").value = patient.phone;

    document.getElementById("editPatientPopupOverlay").style.display = "block";
    document.getElementById("editPatientPopupWindow").style.display = "block";
}

// Close Edit Patient Popup
function closeEditPatientPopup() {
    document.getElementById("editPatientPopupOverlay").style.display = "none";
    document.getElementById("editPatientPopupWindow").style.display = "none";
    currentEditingPatientId = null;
}

// Submit Edit Patient Form
document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editPatientForm");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const updatedPatient = {
                name: document.getElementById("editPatientName").value.trim(),
                age: parseInt(document.getElementById("editPatientAge").value),
                gender: document.getElementById("editPatientGender").value.trim(),
                phone: document.getElementById("editPatientPhone").value.trim()
            };

            if (!updatedPatient.name || !updatedPatient.age || !updatedPatient.gender || !updatedPatient.phone) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(`${API_URL}/${currentEditingPatientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedPatient)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to update patient");
                    return response.json();
                })
                .then(data => {
                    alert("Patient updated successfully!");
                    closeEditPatientPopup();
                    loadPatients();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to update patient. Please try again.");
                });
        });
    }
});

// Delete Patient
function deletePatient(patientId) {
    if (!confirm("Are you sure you want to delete this patient?")) {
        return;
    }

    fetch(`${API_URL}/${patientId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete patient");
            alert("Patient deleted successfully!");
            loadPatients();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to delete patient. Please try again.");
        });
}

// Setup Event Listeners
function setupEventListeners() {
    // Open Add Patient Popup
    const openAddBtn = document.getElementById("openAddPatientBtn");
    if (openAddBtn) {
        openAddBtn.onclick = openAddPatientPopup;
    }

    // Close Add Patient Popup
    const closeAddBtn = document.getElementById("closeAddPatientBtn");
    if (closeAddBtn) {
        closeAddBtn.onclick = closeAddPatientPopup;
    }

    // Close Edit Patient Popup
    const closeEditBtn = document.getElementById("closeEditPatientBtn");
    if (closeEditBtn) {
        closeEditBtn.onclick = closeEditPatientPopup;
    }

    // Overlay Click Close
    const addOverlay = document.getElementById("addPatientPopupOverlay");
    if (addOverlay) {
        addOverlay.onclick = closeAddPatientPopup;
    }

    const editOverlay = document.getElementById("editPatientPopupOverlay");
    if (editOverlay) {
        editOverlay.onclick = closeEditPatientPopup;
    }

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.onclick = loadPatients;
    }
}
