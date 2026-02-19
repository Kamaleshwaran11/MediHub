const API_URL = "http://localhost:8081/api/doctors";
let doctors = [];
let currentEditingDoctorId = null;

// Load doctors on page load
document.addEventListener("DOMContentLoaded", function () {
    loadDoctors();
    setupEventListeners();
});

// Load doctors from API
function loadDoctors() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load doctors");
            return response.json();
        })
        .then(data => {
            doctors = data || [];
            displayDoctors(doctors);
        })
        .catch(error => {
            console.error("Error loading doctors:", error);
            alert("Failed to load doctors. Make sure the backend is running.");
        });
}

// Display doctors as cards
function displayDoctors(list) {
    const container = document.getElementById("doctorList");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p class='text-center col-12'>No doctors found.</p>";
        return;
    }

    list.forEach(doc => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card shadow border-0 h-100">
                <div class="card-body">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            background: #007bff;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            color: #fff;
                            margin-right: 10px;">
                            ${doc.name ? doc.name.charAt(0).toUpperCase() : "D"}
                        </div>
                        <div>
                            <h5 class="mb-0">${doc.name}</h5>
                            <p class="text-muted mb-0" style="font-size: 12px;">${doc.specialization}</p>
                        </div>
                    </div>
                    <p class="mb-2"><strong>Experience:</strong> ${doc.experience || "N/A"} years</p>
                    <p class="mb-2"><strong>Location:</strong> ${doc.location || "N/A"}</p>
                    <p class="mb-2"><strong>Phone:</strong> ${doc.phone || "N/A"}</p>
                    <p class="mb-3"><strong>Email:</strong> ${doc.email || "N/A"}</p>
                    <button class="btn btn-sm btn-primary w-100 mb-2" onclick="editDoctor(${doc.id})">Edit</button>
                    <button class="btn btn-sm btn-danger w-100" onclick="deleteDoctor(${doc.id})">Delete</button>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

// Search/Filter doctors
function filterDoctors() {
    const text = document.getElementById("searchInput").value.toLowerCase();

    if (!text) {
        displayDoctors(doctors);
        return;
    }

    const filtered = doctors.filter(doc =>
        (doc.name && doc.name.toLowerCase().includes(text)) ||
        (doc.specialization && doc.specialization.toLowerCase().includes(text)) ||
        (doc.location && doc.location.toLowerCase().includes(text))
    );

    displayDoctors(filtered);
}

// Open Add Doctor Popup
function openAddDoctorPopup() {
    document.getElementById("addDoctorForm").reset();
    currentEditingDoctorId = null;
    document.getElementById("addDoctorPopupOverlay").style.display = "block";
    document.getElementById("addDoctorPopupWindow").style.display = "block";
}

// Close Add Doctor Popup
function closeAddDoctorPopup() {
    document.getElementById("addDoctorPopupOverlay").style.display = "none";
    document.getElementById("addDoctorPopupWindow").style.display = "none";
}

// Submit Add Doctor Form
document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("addDoctorForm");
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newDoctor = {
                name: document.getElementById("doctorName").value.trim(),
                specialization: document.getElementById("doctorSpecialization").value.trim(),
                experience: parseInt(document.getElementById("doctorExperience").value),
                location: document.getElementById("doctorLocation").value.trim(),
                email: document.getElementById("doctorEmail").value.trim(),
                phone: document.getElementById("doctorPhone").value.trim(),
                password: document.getElementById("doctorPassword").value
            };

            // Validate fields
            if (!newDoctor.name || !newDoctor.specialization || !newDoctor.email || !newDoctor.phone || !newDoctor.password) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDoctor)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to add doctor");
                    return response.json();
                })
                .then(data => {
                    alert("Doctor added successfully!");
                    closeAddDoctorPopup();
                    loadDoctors();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to add doctor. Please try again.");
                });
        });
    }
});

// Edit Doctor
function editDoctor(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        alert("Doctor not found");
        return;
    }

    currentEditingDoctorId = doctorId;
    document.getElementById("editDoctorName").value = doctor.name;
    document.getElementById("editDoctorSpecialization").value = doctor.specialization;
    document.getElementById("editDoctorExperience").value = doctor.experience;
    document.getElementById("editDoctorLocation").value = doctor.location;
    document.getElementById("editDoctorEmail").value = doctor.email;
    document.getElementById("editDoctorPhone").value = doctor.phone;

    document.getElementById("editDoctorPopupOverlay").style.display = "block";
    document.getElementById("editDoctorPopupWindow").style.display = "block";
}

// Close Edit Doctor Popup
function closeEditDoctorPopup() {
    document.getElementById("editDoctorPopupOverlay").style.display = "none";
    document.getElementById("editDoctorPopupWindow").style.display = "none";
    currentEditingDoctorId = null;
}

// Submit Edit Doctor Form
document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editDoctorForm");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const updatedDoctor = {
                name: document.getElementById("editDoctorName").value.trim(),
                specialization: document.getElementById("editDoctorSpecialization").value.trim(),
                experience: parseInt(document.getElementById("editDoctorExperience").value),
                location: document.getElementById("editDoctorLocation").value.trim(),
                email: document.getElementById("editDoctorEmail").value.trim(),
                phone: document.getElementById("editDoctorPhone").value.trim()
            };

            if (!updatedDoctor.name || !updatedDoctor.specialization || !updatedDoctor.email || !updatedDoctor.phone) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(`${API_URL}/${currentEditingDoctorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedDoctor)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to update doctor");
                    return response.json();
                })
                .then(data => {
                    alert("Doctor updated successfully!");
                    closeEditDoctorPopup();
                    loadDoctors();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to update doctor. Please try again.");
                });
        });
    }
});

// Delete Doctor
function deleteDoctor(doctorId) {
    if (!confirm("Are you sure you want to delete this doctor?")) {
        return;
    }

    fetch(`${API_URL}/${doctorId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete doctor");
            alert("Doctor deleted successfully!");
            loadDoctors();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to delete doctor. Please try again.");
        });
}

// Setup Event Listeners
function setupEventListeners() {
    // Open Add Doctor Popup
    const openAddBtn = document.getElementById("openAddDoctorPopupBtn");
    if (openAddBtn) {
        openAddBtn.onclick = openAddDoctorPopup;
    }

    // Close Add Doctor Popup
    const closeAddBtn = document.getElementById("closeAddDoctorPopupBtn");
    if (closeAddBtn) {
        closeAddBtn.onclick = closeAddDoctorPopup;
    }

    // Close Edit Doctor Popup
    const closeEditBtn = document.getElementById("closeEditDoctorPopupBtn");
    if (closeEditBtn) {
        closeEditBtn.onclick = closeEditDoctorPopup;
    }

    // Overlay Click Close
    const addOverlay = document.getElementById("addDoctorPopupOverlay");
    if (addOverlay) {
        addOverlay.onclick = closeAddDoctorPopup;
    }

    const editOverlay = document.getElementById("editDoctorPopupOverlay");
    if (editOverlay) {
        editOverlay.onclick = closeEditDoctorPopup;
    }

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.onclick = loadDoctors;
    }
}
