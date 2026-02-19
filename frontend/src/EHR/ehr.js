const API_URL = "http://localhost:8081/api/ehr";

let ehrList = [];
let currentEditingEhrId = null;

document.addEventListener("DOMContentLoaded", function () {
    loadEhr();
    setupEventListeners();
});

function setupEventListeners() {
    const form = document.getElementById("ehrForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const filtered = ehrList.filter(ehr =>
                ehr.patientName.toLowerCase().includes(this.value.toLowerCase()) ||
                ehr.doctorName.toLowerCase().includes(this.value.toLowerCase())
            );
            displayEhr(filtered);
        });
    }
}

async function loadEhr() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load EHR records");
        ehrList = await response.json();
        displayEhr(ehrList);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load EHR records. Make sure backend is running.");
    }
}

function displayEhr(records) {
    const container = document.getElementById("ehrList");
    container.innerHTML = "";

    if (records.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No EHR records found.</p></div>';
        return;
    }

    records.forEach(ehr => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4 mb-4";
        
        const visitDate = new Date(ehr.visitDate).toLocaleDateString();
        
        card.innerHTML = `
            <div class="card ehr-card h-100">
                <div class="card-header bg-primary text-white">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-file-medical"></i> ${ehr.patientName}
                    </h5>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <strong>Doctor:</strong> ${ehr.doctorName}
                    </div>
                    <div class="mb-2">
                        <strong>Visit Date:</strong> ${visitDate}
                    </div>
                    ${ehr.diagnosis ? `
                    <div class="mb-2">
                        <strong>Diagnosis:</strong>
                        <p class="text-muted">${ehr.diagnosis}</p>
                    </div>
                    ` : ''}
                    ${ehr.treatment ? `
                    <div class="mb-2">
                        <strong>Treatment:</strong>
                        <p class="text-muted">${ehr.treatment}</p>
                    </div>
                    ` : ''}
                </div>
                <div class="card-footer bg-light">
                    <button class="btn btn-sm btn-outline-secondary" onclick="editEhr(${ehr.id})" title="Edit">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteEhr(${ehr.id})" title="Delete">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openAddEhrPopup() {
    currentEditingEhrId = null;
    document.getElementById("ehrForm").reset();
    document.getElementById("ehrId").value = "";
    document.getElementById("ehrModalLabel").textContent = "New EHR Record";
    
    const visitDateInput = document.getElementById("visitDate");
    if (visitDateInput) {
        visitDateInput.value = new Date().toISOString().split("T")[0];
    }
    
    const modal = new bootstrap.Modal(document.getElementById("ehrModal"));
    modal.show();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const ehrId = document.getElementById("ehrId").value;
    const patientName = document.getElementById("patientName").value;
    const doctorName = document.getElementById("doctorName").value;
    const visitDate = document.getElementById("visitDate").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const treatment = document.getElementById("treatment").value;

    if (!patientName || !doctorName || !visitDate) {
        alert("Please fill in all required fields");
        return;
    }

    const ehrData = {
        patientName: patientName,
        doctorName: doctorName,
        visitDate: visitDate,
        diagnosis: diagnosis,
        treatment: treatment
    };

    try {
        const method = ehrId ? "PUT" : "POST";
        const url = ehrId ? `${API_URL}/${ehrId}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ehrData)
        });

        if (!response.ok) throw new Error("Failed to save EHR record");

        alert(ehrId ? "EHR record updated successfully!" : "EHR record created successfully!");
        
        const modal = bootstrap.Modal.getInstance(document.getElementById("ehrModal"));
        if (modal) modal.hide();
        
        loadEhr();
    } catch (error) {
        console.error("Error:", error);
        alert("Error saving EHR record: " + error.message);
    }
}

async function editEhr(ehrId) {
    try {
        const response = await fetch(`${API_URL}/${ehrId}`);
        if (!response.ok) throw new Error("EHR record not found");

        const ehr = await response.json();

        document.getElementById("ehrId").value = ehr.id;
        document.getElementById("patientName").value = ehr.patientName;
        document.getElementById("doctorName").value = ehr.doctorName;
        document.getElementById("diagnosis").value = ehr.diagnosis || "";
        document.getElementById("treatment").value = ehr.treatment || "";
        
        const visitDateInput = document.getElementById("visitDate");
        if (visitDateInput && ehr.visitDate) {
            visitDateInput.value = ehr.visitDate;
        }

        document.getElementById("ehrModalLabel").textContent = "Edit EHR Record";
        
        currentEditingEhrId = ehrId;
        const modal = new bootstrap.Modal(document.getElementById("ehrModal"));
        modal.show();
    } catch (error) {
        console.error("Error:", error);
        alert("Error loading EHR record details");
    }
}

async function deleteEhr(ehrId) {
    if (!confirm("Are you sure you want to delete this EHR record?")) return;

    try {
        const response = await fetch(`${API_URL}/${ehrId}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete EHR record");

        alert("EHR record deleted successfully!");
        loadEhr();
    } catch (error) {
        console.error("Error:", error);
        alert("Error deleting EHR record");
    }
}
