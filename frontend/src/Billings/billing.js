const API_BASE = 'http://localhost:8080/api';
const BILLING_API = `${API_BASE}/billing`;
const PATIENTS_API = `${API_BASE}/patients`;

let bills = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBills();
    loadPatients();
    setupEventListeners();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    loadBills();
    setupEventListeners();
    generateInvoiceNumber();
    // Initialize Chart.js
    loadCharts();
    // Set current month in invoice filter
    document.getElementById('invoiceMonth').value = new Date().toISOString().slice(0, 7);
});

function setupEventListeners() {
    // Calculate total amount when amount or tax changes
    document.getElementById('amount').addEventListener('input', calculateTotal);
    document.getElementById('taxAmount').addEventListener('input', calculateTotal);

    // Form submission
    document.getElementById('billingForm').addEventListener('submit', handleFormSubmit);

    // Payment method change
    document.getElementById('paymentMethod').addEventListener('change', function(e) {
        const insuranceField = document.getElementById('insuranceClaimNumber');
        insuranceField.required = e.target.value === 'INSURANCE';
    });
}

function showTab(tabName) {
    // Hide all content sections
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected content and activate nav link
    document.getElementById(`${tabName}Content`).style.display = 'block';
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');

    // Load specific tab data
    switch(tabName) {
        case 'invoices':
            loadInvoices();
            break;
        case 'payments':
            loadPayments();
            break;
        case 'reports':
            loadReports();
            break;
        default:
            loadBills();
    }
}

function calculateTotal() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const taxAmount = parseFloat(document.getElementById('taxAmount').value) || 0;
    const total = amount + taxAmount;
    document.getElementById('totalAmount').value = total.toFixed(2);
}

function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    document.getElementById('invoiceNumber').value = `INV-${year}${month}-${random}`;
}

async function loadPatients() {
    try {
        const response = await fetch(`${API_BASE_URL}/patients`);
        const patients = await response.json();
        const select = document.getElementById('patientSelect');
        select.innerHTML = '<option value="">Select Patient</option>';
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = `${patient.firstName} ${patient.lastName} (ID: ${patient.id})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading patients:', error);
        showAlert('Error loading patients', 'error');
    }
}

async function loadBills() {
    try {
        const response = await fetch(`${API_BASE_URL}/bills`);
        bills = await response.json();
        filterBills(currentFilter);
    } catch (error) {
        console.error('Error loading bills:', error);
        showAlert('Error loading bills', 'error');
    }
}

function filterBills(status) {
    currentFilter = status;
    const filteredBills = status === 'all' 
        ? bills 
        : bills.filter(bill => bill.status === status);
    displayBills(filteredBills);
}

function displayBills(billsToDisplay) {
    const tbody = document.querySelector('#billsTable tbody');
    tbody.innerHTML = '';

    billsToDisplay.forEach(bill => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bill.invoiceNumber}</td>
            <td>${bill.patientName}</td>
            <td>${new Date(bill.billDate).toLocaleDateString()}</td>
            <td>${bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : '-'}</td>
            <td>₹${bill.totalAmount.toFixed(2)}</td>
            <td><span class="bill-status ${bill.status.toLowerCase()}">${bill.status}</span></td>
            <td>${bill.paymentMethod || '-'}</td>
            <td class="action-btns">
                <button class="btn btn-sm btn-outline-primary" onclick="viewInvoice('${bill.id}')">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary" onclick="editBill('${bill.id}')">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteBill('${bill.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        patientId: document.getElementById('patientSelect').value,
        invoiceNumber: document.getElementById('invoiceNumber').value,
        billDate: document.getElementById('billDate').value,
        dueDate: document.getElementById('dueDate').value,
        status: document.getElementById('status').value,
        amount: parseFloat(document.getElementById('amount').value),
        taxAmount: parseFloat(document.getElementById('taxAmount').value),
        totalAmount: parseFloat(document.getElementById('totalAmount').value),
        paymentMethod: document.getElementById('paymentMethod').value,
        paymentDate: document.getElementById('paymentDate').value,
        insuranceClaimNumber: document.getElementById('insuranceClaimNumber').value,
        notes: document.getElementById('notes').value
    };

    const billId = document.getElementById('billId').value;
    const url = `${API_BASE_URL}/bills${billId ? `/${billId}` : ''}`;
    const method = billId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to save bill');

        showAlert('Bill saved successfully', 'success');
        cancelBillForm();
        loadBills();
    } catch (error) {
        console.error('Error saving bill:', error);
        showAlert('Error saving bill', 'error');
    }
}

function showNewBillForm() {
    document.getElementById('billId').value = '';
    document.getElementById('billingForm').reset();
    generateInvoiceNumber();
    document.getElementById('billDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('newBillForm').style.display = 'block';
}

function cancelBillForm() {
    document.getElementById('billingForm').reset();
    document.getElementById('newBillForm').style.display = 'none';
}

async function editBill(billId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bills/${billId}`);
        const bill = await response.json();
        
        document.getElementById('billId').value = bill.id;
        document.getElementById('patientSelect').value = bill.patientId;
        document.getElementById('invoiceNumber').value = bill.invoiceNumber;
        document.getElementById('billDate').value = bill.billDate;
        document.getElementById('dueDate').value = bill.dueDate || '';
        document.getElementById('status').value = bill.status;
        document.getElementById('amount').value = bill.amount;
        document.getElementById('taxAmount').value = bill.taxAmount;
        document.getElementById('totalAmount').value = bill.totalAmount;
        document.getElementById('paymentMethod').value = bill.paymentMethod || '';
        document.getElementById('paymentDate').value = bill.paymentDate || '';
        document.getElementById('insuranceClaimNumber').value = bill.insuranceClaimNumber || '';
        document.getElementById('notes').value = bill.notes || '';

        document.getElementById('newBillForm').style.display = 'block';
    } catch (error) {
        console.error('Error loading bill:', error);
        showAlert('Error loading bill details', 'error');
    }
}

async function deleteBill(billId) {
    if (!confirm('Are you sure you want to delete this bill?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/bills/${billId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete bill');

        showAlert('Bill deleted successfully', 'success');
        loadBills();
    } catch (error) {
        console.error('Error deleting bill:', error);
        showAlert('Error deleting bill', 'error');
    }
}

let currentBillId; // Add this at the top of the file with other global variables

function viewInvoice(billId) {
    const bill = bills.find(b => b.id === billId);
    if (!bill) return;

    currentBillId = billId; // Store the current bill ID
    const invoiceHtml = generateInvoiceHtml(bill);
    document.getElementById('invoicePrint').innerHTML = invoiceHtml;
    
    const modal = new bootstrap.Modal(document.getElementById('invoiceModal'));
    modal.show();
}

function generateInvoiceHtml(bill) {
    return `
        <div class="container">
            <div class="row mb-4">
                <div class="col">
                    <h2 class="text-primary">MediHub</h2>
                    <p>123 Healthcare Street<br>Medical District<br>City, State 12345</p>
                </div>
                <div class="col text-end">
                    <h1 class="text-secondary">INVOICE</h1>
                    <p class="mb-1"><strong>Invoice #:</strong> ${bill.invoiceNumber}</p>
                    <p class="mb-1"><strong>Date:</strong> ${new Date(bill.billDate).toLocaleDateString()}</p>
                    <p><strong>Due Date:</strong> ${bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <h5>Bill To:</h5>
                    <p class="mb-1">${bill.patientName}</p>
                    <p class="mb-1">Patient ID: ${bill.patientId}</p>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th class="text-end">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Medical Services</td>
                                <td class="text-end">₹${bill.amount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td class="text-end">₹${bill.taxAmount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Total Amount</th>
                                <th class="text-end">₹${bill.totalAmount.toFixed(2)}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <h5>Payment Information</h5>
                    <p class="mb-1"><strong>Status:</strong> ${bill.status}</p>
                    <p class="mb-1"><strong>Payment Method:</strong> ${bill.paymentMethod || 'Not specified'}</p>
                    ${bill.insuranceClaimNumber ? `<p class="mb-1"><strong>Insurance Claim #:</strong> ${bill.insuranceClaimNumber}</p>` : ''}
                </div>
            </div>

            ${bill.notes ? `
            <div class="row mb-4">
                <div class="col">
                    <h5>Notes</h5>
                    <p>${bill.notes}</p>
                </div>
            </div>
            ` : ''}

            <div class="row">
                <div class="col">
                    <p class="text-center text-muted">Thank you for choosing MediHub for your healthcare needs.</p>
                </div>
            </div>
        </div>
    `;
}

function printInvoice() {
    const printContent = document.getElementById('invoicePrint').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
        <div class="print-only">
            ${printContent}
        </div>
    `;

    window.print();
    document.body.innerHTML = originalContent;

    // Reinitialize event listeners and other necessary functions
    document.addEventListener('DOMContentLoaded', function() {
        loadPatients();
        loadBills();
        setupEventListeners();
        generateInvoiceNumber();
        loadCharts();
    });
}

function downloadInvoice(billId) {
    const bill = bills.find(b => b.id === billId);
    if (!bill) return;

    const invoiceHtml = generateInvoiceHtml(bill);
    
    // Create a styled HTML document
    const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice ${bill.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 800px; margin: 20px auto; padding: 20px; }
                .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .company-info { margin-bottom: 20px; }
                .bill-to { margin-bottom: 30px; }
                .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .table th, .table td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
                .total-amount { text-align: right; font-weight: bold; }
                .footer { margin-top: 50px; text-align: center; color: #666; }
                .bill-status { padding: 5px 10px; border-radius: 4px; font-size: 12px; }
                .bill-status.pending { background: #fff3cd; color: #856404; }
                .bill-status.paid { background: #d4edda; color: #155724; }
                .bill-status.overdue { background: #f8d7da; color: #721c24; }
            </style>
        </head>
        <body>
            ${invoiceHtml}
        </body>
        </html>
    `;

    // Create a Blob containing the HTML
    const blob = new Blob([fullHtml], { type: 'text/html' });
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `Invoice_${bill.invoiceNumber}.html`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function downloadPDF(billId) {
    const bill = bills.find(b => b.id === billId);
    if (!bill) return;

    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Write the invoice content to iframe
    iframe.contentDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice ${bill.invoiceNumber}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            ${generateInvoiceHtml(bill)}
        </body>
        </html>
    `);

    // Wait for content to load
    setTimeout(() => {
        // Print to PDF
        iframe.contentWindow.print();
        // Remove the iframe after printing
        document.body.removeChild(iframe);
    }, 500);
}

// Invoice Management
async function loadInvoices() {
    try {
        const response = await fetch(`${API_BASE_URL}/bills`);
        const invoices = await response.json();
        displayInvoices(invoices);
    } catch (error) {
        console.error('Error loading invoices:', error);
        showAlert('Error loading invoices', 'error');
    }
}

function filterInvoicesByMonth(monthYear) {
    const [year, month] = monthYear.split('-');
    const filteredInvoices = bills.filter(bill => {
        const billDate = new Date(bill.billDate);
        return billDate.getFullYear() === parseInt(year) && 
               billDate.getMonth() === parseInt(month) - 1;
    });
    displayInvoices(filteredInvoices);
}

function displayInvoices(invoices) {
    const tbody = document.querySelector('#invoicesTable tbody');
    tbody.innerHTML = '';

    invoices.forEach(invoice => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.patientName}</td>
            <td>${new Date(invoice.billDate).toLocaleDateString()}</td>
            <td>₹${invoice.totalAmount.toFixed(2)}</td>
            <td><span class="bill-status ${invoice.status.toLowerCase()}">${invoice.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewInvoice('${invoice.id}')">
                    <i class="bi bi-download"></i> Download
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Payment Management
async function loadPayments() {
    try {
        const response = await fetch(`${API_BASE_URL}/bills?status=PAID`);
        const payments = await response.json();
        displayPayments(payments);
    } catch (error) {
        console.error('Error loading payments:', error);
        showAlert('Error loading payments', 'error');
    }
}

function filterPaymentsByMethod(method) {
    const filteredPayments = method === 'all' 
        ? bills.filter(bill => bill.status === 'PAID')
        : bills.filter(bill => bill.status === 'PAID' && bill.paymentMethod === method);
    displayPayments(filteredPayments);
}

function displayPayments(payments) {
    const tbody = document.querySelector('#paymentsTable tbody');
    tbody.innerHTML = '';

    payments.forEach(payment => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(payment.paymentDate || payment.billDate).toLocaleDateString()}</td>
            <td>${payment.invoiceNumber}</td>
            <td>${payment.patientName}</td>
            <td>₹${payment.totalAmount.toFixed(2)}</td>
            <td>${payment.paymentMethod || 'N/A'}</td>
            <td><span class="bill-status paid">Paid</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Reports and Analytics
function loadReports() {
    updateRevenueChart();
    updatePaymentMethodsChart();
    displayOutstandingPayments();
}

function updateRevenueChart() {
    const monthlyRevenue = calculateMonthlyRevenue();
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(monthlyRevenue),
            datasets: [{
                label: 'Monthly Revenue',
                data: Object.values(monthlyRevenue),
                borderColor: '#2470dc',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value
                    }
                }
            }
        }
    });
}

function updatePaymentMethodsChart() {
    const methodStats = calculatePaymentMethodStats();
    const ctx = document.getElementById('paymentMethodsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(methodStats),
            datasets: [{
                data: Object.values(methodStats),
                backgroundColor: [
                    '#28a745',
                    '#007bff',
                    '#ffc107',
                    '#17a2b8'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Event listeners setup
function setupEventListeners() {
    // Filter by status
    document.getElementById('statusFilter').addEventListener('change', filterBills);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', filterBills);
}

// Load patients for select dropdown
async function loadPatients() {
    try {
        const response = await fetch(PATIENTS_API);
        const patients = await response.json();
        const select = document.getElementById('patientSelect');
        select.innerHTML = '<option value="">Select Patient</option>';
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = `${patient.name} (ID: ${patient.id})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading patients:', error);
        showAlert('Failed to load patients list', 'danger');
    }
}

// Load all bills
async function loadBills() {
    try {
        const response = await fetch(BILLING_API);
        bills = await response.json();
        displayBills(bills);
    } catch (error) {
        console.error('Error loading bills:', error);
        showAlert('Failed to load bills', 'danger');
    }
}

// Filter and search bills
function filterBills() {
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredBills = bills.filter(bill => {
        const matchStatus = !status || bill.status === status;
        const matchSearch = !search || 
            bill.invoiceNumber.toLowerCase().includes(search) ||
            bill.patient.name.toLowerCase().includes(search);
        return matchStatus && matchSearch;
    });
    
    displayBills(filteredBills);
}

// Display bills in table
function displayBills(billsToShow) {
    const tbody = document.querySelector('#billsTable tbody');
    tbody.innerHTML = '';
    
    billsToShow.forEach(bill => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${bill.invoiceNumber}</td>
            <td>${bill.patient.name}</td>
            <td>${formatDate(bill.billDate)}</td>
            <td>₹${bill.amount.toFixed(2)}</td>
            <td><span class="status-badge status-${bill.status}">${bill.status}</span></td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewBill(${bill.id})">View</button>
                <button class="btn btn-sm btn-primary" onclick="editBill(${bill.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBill(${bill.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Save bill (create or update)
async function saveBill() {
    try {
        const billId = document.getElementById('billId').value;
        const billData = {
            patientId: document.getElementById('patientSelect').value,
            amount: parseFloat(document.getElementById('amount').value),
            paymentMethod: document.getElementById('paymentMethod').value,
            status: document.getElementById('status').value,
            notes: document.getElementById('notes').value
        };

        const url = billId ? `${BILLING_API}/${billId}` : BILLING_API;
        const method = billId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billData)
        });

        if (response.ok) {
            showAlert('Bill saved successfully', 'success');
            $('#billModal').modal('hide');
            loadBills();
        } else {
            throw new Error('Failed to save bill');
        }
    } catch (error) {
        console.error('Error saving bill:', error);
        showAlert('Failed to save bill', 'danger');
    }
}

// View bill details
async function viewBill(id) {
    try {
        const response = await fetch(`${BILLING_API}/${id}`);
        const bill = await response.json();
        
        document.getElementById('billDetails').innerHTML = `
            <div class="bill-details">
                <h4 class="mb-3">Bill Details</h4>
                <p><strong>Invoice Number:</strong> ${bill.invoiceNumber}</p>
                <p><strong>Patient:</strong> ${bill.patient.name}</p>
                <p><strong>Bill Date:</strong> ${formatDate(bill.billDate)}</p>
                <p><strong>Amount:</strong> ₹${bill.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${bill.status}">${bill.status}</span></p>
                <p><strong>Payment Method:</strong> ${bill.paymentMethod || 'N/A'}</p>
                ${bill.notes ? `<p><strong>Notes:</strong> ${bill.notes}</p>` : ''}
            </div>
        `;
        
        $('#viewBillModal').modal('show');
    } catch (error) {
        console.error('Error loading bill details:', error);
        showAlert('Failed to load bill details', 'danger');
    }
}

// Edit bill
async function editBill(id) {
    try {
        const response = await fetch(`${BILLING_API}/${id}`);
        const bill = await response.json();
        
        document.getElementById('billId').value = bill.id;
        document.getElementById('patientSelect').value = bill.patient.id;
        document.getElementById('amount').value = bill.amount;
        document.getElementById('paymentMethod').value = bill.paymentMethod || '';
        document.getElementById('status').value = bill.status;
        document.getElementById('notes').value = bill.notes || '';

        document.getElementById('modalTitle').textContent = 'Edit Bill';
        $('#billModal').modal('show');
    } catch (error) {
        console.error('Error loading bill for edit:', error);
        showAlert('Failed to load bill for editing', 'danger');
    }
}

// Delete bill
async function deleteBill(id) {
    if (!confirm('Are you sure you want to delete this bill?')) {
        return;
    }
    
    try {
        const response = await fetch(`${BILLING_API}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Bill deleted successfully', 'success');
            loadBills();
        } else {
            throw new Error('Failed to delete bill');
        }
    } catch (error) {
        console.error('Error deleting bill:', error);
        showAlert('Failed to delete bill', 'danger');
    }
}

// Utility function to format dates
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}