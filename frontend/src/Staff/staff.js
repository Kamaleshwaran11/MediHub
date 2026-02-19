const API_URL = "http://localhost:8081/api/staff";
let staffList = [];
let filteredStaffList = [];
let currentEditingStaffId = null;
let currentDepartmentFilter = "all";

// Load staff on page load
document.addEventListener("DOMContentLoaded", function () {
    loadStaff();
    setupEventListeners();
});

// Load staff from API
function loadStaff() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load staff");
            return response.json();
        })
        .then(data => {
            staffList = data || [];
            filteredStaffList = staffList;
            displayStaff(filteredStaffList);
        })
        .catch(error => {
            console.error("Error loading staff:", error);
            alert("Failed to load staff. Make sure the backend is running.");
        });
}

// Display staff as cards
function displayStaff(list) {
    const container = document.getElementById("staffList");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p class='text-center col-12'>No staff members found.</p>";
        return;
    }

    list.forEach(staff => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
            <div class="card shadow border-0 h-100">
                <div class="card-body">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <div style="
                            width: 50px;
                            height: 50px;
                            background: #28a745;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            color: #fff;
                            margin-right: 10px;">
                            ${staff.name ? staff.name.charAt(0).toUpperCase() : "S"}
                        </div>
                        <div>
                            <h5 class="mb-0">${staff.name}</h5>
                            <p class="text-muted mb-0" style="font-size: 12px;">${staff.role}</p>
                        </div>
                    </div>
                    <p class="mb-2"><strong>Department:</strong> ${staff.department || "N/A"}</p>
                    <p class="mb-2"><strong>Qualification:</strong> ${staff.qualification || "N/A"}</p>
                    <p class="mb-2"><strong>License:</strong> ${staff.licenseNumber || "N/A"}</p>
                    <p class="mb-2"><strong>Experience:</strong> ${staff.experienceYears || "N/A"} years</p>
                    <p class="mb-2"><strong>Shift:</strong> ${staff.shift || "N/A"}</p>
                    <p class="mb-3"><strong>Contact:</strong> ${staff.email || "N/A"} | ${staff.phone || "N/A"}</p>
                    <button class="btn btn-sm btn-primary w-100 mb-2" onclick="editStaff(${staff.id})">Edit</button>
                    <button class="btn btn-sm btn-danger w-100" onclick="deleteStaff(${staff.id})">Delete</button>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

// Search/Filter staff
function filterStaff() {
    const text = document.getElementById("searchInput").value.toLowerCase();
    let filtered = staffList;

    if (text) {
        filtered = staffList.filter(staff =>
            (staff.name && staff.name.toLowerCase().includes(text)) ||
            (staff.role && staff.role.toLowerCase().includes(text)) ||
            (staff.department && staff.department.toLowerCase().includes(text)) ||
            (staff.specialization && staff.specialization.toLowerCase().includes(text)) ||
            (staff.email && staff.email.toLowerCase().includes(text)) ||
            (staff.phone && staff.phone.toLowerCase().includes(text))
        );
    }

    if (currentDepartmentFilter !== "all") {
        filtered = filtered.filter(staff => staff.department === currentDepartmentFilter);
    }

    filteredStaffList = filtered;
    displayStaff(filteredStaffList);
}

// Filter by department
function filterByDepartment(department) {
    currentDepartmentFilter = department;
    filterStaff();
}

// Open Add Staff Popup
function openAddStaffPopup() {
    document.getElementById("addStaffForm").reset();
    currentEditingStaffId = null;
    document.getElementById("addStaffPopupOverlay").style.display = "block";
    document.getElementById("addStaffPopupWindow").style.display = "block";
}

// Close Add Staff Popup
function closeAddStaffPopup() {
    document.getElementById("addStaffPopupOverlay").style.display = "none";
    document.getElementById("addStaffPopupWindow").style.display = "none";
}

// Submit Add Staff Form
document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("addStaffForm");
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newStaff = {
                name: document.getElementById("staffName").value.trim(),
                role: document.getElementById("staffRole").value.trim(),
                department: document.getElementById("staffDepartment").value.trim(),
                qualification: document.getElementById("staffQualification").value.trim(),
                licenseNumber: document.getElementById("staffLicense").value.trim(),
                experienceYears: parseInt(document.getElementById("staffExperience").value) || null,
                shift: document.getElementById("staffShift").value.trim(),
                specialization: document.getElementById("staffSpecialization").value.trim(),
                email: document.getElementById("staffEmail").value.trim(),
                phone: document.getElementById("staffPhone").value.trim()
            };

            // Validate required fields
            if (!newStaff.name || !newStaff.role || !newStaff.department || !newStaff.qualification || !newStaff.licenseNumber || !newStaff.shift || !newStaff.email || !newStaff.phone) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newStaff)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to add staff");
                    return response.json();
                })
                .then(data => {
                    alert("Staff member added successfully!");
                    closeAddStaffPopup();
                    loadStaff();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to add staff member. Please try again.");
                });
        });
    }
});

// Edit Staff
function editStaff(staffId) {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) {
        alert("Staff member not found");
        return;
    }

    currentEditingStaffId = staffId;
    document.getElementById("editStaffName").value = staff.name;
    document.getElementById("editStaffRole").value = staff.role;
    document.getElementById("editStaffDepartment").value = staff.department;
    document.getElementById("editStaffQualification").value = staff.qualification;
    document.getElementById("editStaffLicense").value = staff.licenseNumber;
    document.getElementById("editStaffExperience").value = staff.experienceYears || "";
    document.getElementById("editStaffShift").value = staff.shift;
    document.getElementById("editStaffSpecialization").value = staff.specialization || "";
    document.getElementById("editStaffEmail").value = staff.email;
    document.getElementById("editStaffPhone").value = staff.phone;

    document.getElementById("editStaffPopupOverlay").style.display = "block";
    document.getElementById("editStaffPopupWindow").style.display = "block";
}

// Close Edit Staff Popup
function closeEditStaffPopup() {
    document.getElementById("editStaffPopupOverlay").style.display = "none";
    document.getElementById("editStaffPopupWindow").style.display = "none";
    currentEditingStaffId = null;
}

// Submit Edit Staff Form
document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editStaffForm");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const updatedStaff = {
                name: document.getElementById("editStaffName").value.trim(),
                role: document.getElementById("editStaffRole").value.trim(),
                department: document.getElementById("editStaffDepartment").value.trim(),
                qualification: document.getElementById("editStaffQualification").value.trim(),
                licenseNumber: document.getElementById("editStaffLicense").value.trim(),
                experienceYears: parseInt(document.getElementById("editStaffExperience").value) || null,
                shift: document.getElementById("editStaffShift").value.trim(),
                specialization: document.getElementById("editStaffSpecialization").value.trim(),
                email: document.getElementById("editStaffEmail").value.trim(),
                phone: document.getElementById("editStaffPhone").value.trim()
            };

            if (!updatedStaff.name || !updatedStaff.role || !updatedStaff.department || !updatedStaff.qualification || !updatedStaff.licenseNumber || !updatedStaff.shift || !updatedStaff.email || !updatedStaff.phone) {
                alert("Please fill in all required fields");
                return;
            }

            fetch(`${API_URL}/${currentEditingStaffId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedStaff)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to update staff");
                    return response.json();
                })
                .then(data => {
                    alert("Staff member updated successfully!");
                    closeEditStaffPopup();
                    loadStaff();
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to update staff member. Please try again.");
                });
        });
    }
});

// Delete Staff
function deleteStaff(staffId) {
    if (!confirm("Are you sure you want to delete this staff member?")) {
        return;
    }

    fetch(`${API_URL}/${staffId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete staff");
            alert("Staff member deleted successfully!");
            loadStaff();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to delete staff member. Please try again.");
        });
}

// Setup Event Listeners
function setupEventListeners() {
    // Open Add Staff Popup
    const openAddBtn = document.getElementById("openAddStaffBtn");
    if (openAddBtn) {
        openAddBtn.onclick = openAddStaffPopup;
    }

    // Close Add Staff Popup
    const closeAddBtn = document.getElementById("closeAddStaffBtn");
    if (closeAddBtn) {
        closeAddBtn.onclick = closeAddStaffPopup;
    }

    // Close Edit Staff Popup
    const closeEditBtn = document.getElementById("closeEditStaffBtn");
    if (closeEditBtn) {
        closeEditBtn.onclick = closeEditStaffPopup;
    }

    // Overlay Click Close
    const addOverlay = document.getElementById("addStaffPopupOverlay");
    if (addOverlay) {
        addOverlay.onclick = closeAddStaffPopup;
    }

    const editOverlay = document.getElementById("editStaffPopupOverlay");
    if (editOverlay) {
        editOverlay.onclick = closeEditStaffPopup;
    }

    // Refresh button
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.onclick = loadStaff;
    }
}