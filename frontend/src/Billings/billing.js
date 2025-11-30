const API_URL = "http://localhost:8080/api/billing";
const PATIENTS_API = "http://localhost:8080/api/patients";

let bills = [];
let patients = [];
let currentEditingBillId = null;
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", function () {
    loadBills();
    loadPatients();
    setupEventListeners();
});

function setupEventListeners() {
    const form = document.getElementById("billingForm");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }

    const amountInput = document.getElementById("amount");
    if (amountInput) {
        amountInput.addEventListener("input", calculateTotal);
    }

    const taxInput = document.getElementById("taxAmount");
    if (taxInput) {
        taxInput.addEventListener("input", calculateTotal);
    }

    const paymentMethodSelect = document.getElementById("paymentMethod");
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener("change", function (e) {
            const insuranceField = document.getElementById("insuranceClaimNumber");
            if (insuranceField) {
                insuranceField.required = e.target.value === "INSURANCE";
            }
        });
    }
}

async function loadBills() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load bills");
        bills = await response.json();
        displayBills(bills);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load bills. Make sure backend is running.");
    }
}

async function loadPatients() {
    try {
        const response = await fetch(PATIENTS_API);
        if (!response.ok) throw new Error("Failed to load patients");
        patients = await response.json();
        
        const select = document.getElementById("patientSelect");
        if (select) {
            select.innerHTML = '<option value="">Select Patient</option>';
            patients.forEach(patient => {
                const option = document.createElement("option");
                option.value = patient.id;
                option.textContent = `${patient.name} (ID: ${patient.id})`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error loading patients:", error);
    }
}

function displayBills(billsToDisplay) {
    const tbody = document.querySelector("#billsTable tbody");
    if (!tbody) return;

    tbody.innerHTML = "";
    
    if (billsToDisplay.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No bills found.</td></tr>';
        return;
    }

    billsToDisplay.forEach(bill => {
        const tr = document.createElement("tr");
        const billDate = new Date(bill.billDate).toLocaleDateString();
        const statusBadge = `<span class="badge bg-${getStatusColor(bill.status)}">${bill.status}</span>`;
        
        tr.innerHTML = `
            <td>${bill.invoiceNumber || "N/A"}</td>
            <td>${bill.patientName}</td>
            <td>${billDate}</td>
            <td>₹${(bill.amount || 0).toFixed(2)}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewInvoice(${bill.id})" title="View Invoice">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="editBill(${bill.id})" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteBill(${bill.id})" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function getStatusColor(status) {
    switch (status) {
        case "PAID": return "success";
        case "PENDING": return "warning";
        case "OVERDUE": return "danger";
        default: return "secondary";
    }
}

function calculateTotal() {
    const amount = parseFloat(document.getElementById("amount")?.value) || 0;
    const taxAmount = parseFloat(document.getElementById("taxAmount")?.value) || 0;
    const totalInput = document.getElementById("totalAmount");
    if (totalInput) {
        totalInput.value = (amount + taxAmount).toFixed(2);
    }
}

function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const invoiceInput = document.getElementById("invoiceNumber");
    if (invoiceInput) {
        invoiceInput.value = `INV-${year}${month}-${random}`;
    }
}

function showNewBillForm() {
    document.getElementById("billId").value = "";
    document.getElementById("billingForm").reset();
    generateInvoiceNumber();
    
    const billDateInput = document.getElementById("billDate");
    if (billDateInput) {
        billDateInput.value = new Date().toISOString().split("T")[0];
    }
    
    const formDiv = document.getElementById("newBillForm");
    if (formDiv) {
        formDiv.style.display = "block";
    }
}

function cancelBillForm() {
    const formDiv = document.getElementById("newBillForm");
    if (formDiv) {
        formDiv.style.display = "none";
    }
    document.getElementById("billingForm").reset();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const billId = document.getElementById("billId").value;
    const patientName = document.getElementById("patientSelect").value;
    const invoiceNumber = document.getElementById("invoiceNumber").value;
    const amount = document.getElementById("amount").value;
    const taxAmount = document.getElementById("taxAmount").value || 0;
    const totalAmount = document.getElementById("totalAmount").value;
    const status = document.getElementById("status")?.value || "PENDING";
    const billDate = document.getElementById("billDate").value;
    const dueDate = document.getElementById("dueDate").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const paymentDate = document.getElementById("paymentDate").value;
    const insuranceClaimNumber = document.getElementById("insuranceClaimNumber").value;
    const notes = document.getElementById("notes").value;

    if (!patientName || !invoiceNumber || !amount) {
        alert("Please fill in all required fields");
        return;
    }

    const billingData = {
        patientName: patientName,
        invoiceNumber: invoiceNumber,
        amount: parseFloat(amount),
        taxAmount: parseFloat(taxAmount),
        totalAmount: parseFloat(totalAmount),
        status: status,
        billDate: billDate,
        dueDate: dueDate,
        paymentMethod: paymentMethod,
        paymentDate: paymentDate,
        insuranceClaimNumber: insuranceClaimNumber,
        notes: notes
    };

    try {
        const method = billId ? "PUT" : "POST";
        const url = billId ? `${API_URL}/${billId}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(billingData)
        });

        if (!response.ok) throw new Error("Failed to save bill");

        alert(billId ? "Bill updated successfully!" : "Bill created successfully!");
        cancelBillForm();
        loadBills();
    } catch (error) {
        console.error("Error:", error);
        alert("Error saving bill: " + error.message);
    }
}

async function editBill(billId) {
    try {
        const response = await fetch(`${API_URL}/${billId}`);
        if (!response.ok) throw new Error("Bill not found");

        const bill = await response.json();

        document.getElementById("billId").value = bill.id;
        document.getElementById("patientSelect").value = bill.patientName;
        document.getElementById("invoiceNumber").value = bill.invoiceNumber;
        document.getElementById("amount").value = bill.amount;
        document.getElementById("taxAmount").value = bill.taxAmount || 0;
        document.getElementById("totalAmount").value = bill.totalAmount;
        document.getElementById("status").value = bill.status;
        
        const billDateInput = document.getElementById("billDate");
        if (billDateInput && bill.billDate) {
            billDateInput.value = bill.billDate;
        }

        const dueDateInput = document.getElementById("dueDate");
        if (dueDateInput && bill.dueDate) {
            dueDateInput.value = bill.dueDate;
        }

        const paymentMethodSelect = document.getElementById("paymentMethod");
        if (paymentMethodSelect && bill.paymentMethod) {
            paymentMethodSelect.value = bill.paymentMethod;
        }

        const paymentDateInput = document.getElementById("paymentDate");
        if (paymentDateInput && bill.paymentDate) {
            paymentDateInput.value = bill.paymentDate;
        }

        const insuranceInput = document.getElementById("insuranceClaimNumber");
        if (insuranceInput && bill.insuranceClaimNumber) {
            insuranceInput.value = bill.insuranceClaimNumber;
        }

        const notesInput = document.getElementById("notes");
        if (notesInput && bill.notes) {
            notesInput.value = bill.notes;
        }

        const formDiv = document.getElementById("newBillForm");
        if (formDiv) {
            formDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error loading bill details");
    }
}

async function deleteBill(billId) {
    if (!confirm("Are you sure you want to delete this bill?")) return;

    try {
        const response = await fetch(`${API_URL}/${billId}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete bill");

        alert("Bill deleted successfully!");
        loadBills();
    } catch (error) {
        console.error("Error:", error);
        alert("Error deleting bill");
    }
}

function viewInvoice(billId) {
    const bill = bills.find(b => b.id === billId);
    if (!bill) {
        alert("Bill not found");
        return;
    }

    const invoiceHtml = generateInvoiceHtml(bill);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.print();
}

function generateInvoiceHtml(bill) {
    const billDate = new Date(bill.billDate).toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice ${bill.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .invoice { max-width: 800px; margin: 0 auto; }
                .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
                .header h1 { color: #2470dc; margin: 0; }
                .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f5f5f5; font-weight: bold; }
                .total { font-size: 18px; font-weight: bold; color: #2470dc; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="header">
                    <h1>MediHub Healthcare Management</h1>
                    <p>123 Healthcare Street, Medical District, City 12345</p>
                </div>

                <div class="invoice-details">
                    <div>
                        <h3>Bill To:</h3>
                        <p><strong>${bill.patientName}</strong></p>
                    </div>
                    <div style="text-align: right;">
                        <h2>INVOICE</h2>
                        <p><strong>Invoice #:</strong> ${bill.invoiceNumber}</p>
                        <p><strong>Date:</strong> ${billDate}</p>
                        <p><strong>Status:</strong> ${bill.status}</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Medical Services</td>
                            <td style="text-align: right;">₹${bill.amount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="text-align: right;">
                    <p class="total">Total: ₹${bill.amount.toFixed(2)}</p>
                </div>

                <div class="footer">
                    <p style="color: #666; font-size: 12px;">
                        Thank you for choosing MediHub. Please contact us for any queries regarding this invoice.
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Tab switching functionality
function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => {
        tab.style.display = "none";
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    const activeTab = document.getElementById(tabName + "Content");
    if (activeTab) {
        activeTab.style.display = "block";
    }

    const activeLink = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }

    if (tabName === "billing") {
        loadBills();
    }
}
