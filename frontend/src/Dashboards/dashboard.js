// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    initializeCharts();
    setupEventListeners();
});

// Global variables for charts
let patientActivityChart;
let revenueChart;
let appointmentChart;

async function loadDashboardStats() {
    try {
        const stats = await fetchDashboardStats();
        updateStatCards(stats);
        updateCharts(stats);
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        showAlert('Error loading dashboard statistics', 'error');
    }
}

async function fetchDashboardStats() {
    const response = await fetch('http://localhost:8080/api/dashboard/stats');
    return await response.json();
}

function updateStatCards(stats) {
    document.getElementById('totalPatients').textContent = stats.totalPatients;
    document.getElementById('totalAppointments').textContent = stats.todayAppointments;
    document.getElementById('totalStaff').textContent = stats.totalStaff;
    document.getElementById('totalRevenue').textContent = `₹${stats.monthlyRevenue.toFixed(2)}`;
}

function initializeCharts() {
    // Patient Activity Chart
    const patientCtx = document.getElementById('patientActivityChart').getContext('2d');
    patientActivityChart = new Chart(patientCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'New Patients',
                data: [],
                borderColor: '#2470dc',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Monthly Revenue',
                data: [],
                backgroundColor: '#28a745'
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

    // Appointment Chart
    const appointmentCtx = document.getElementById('appointmentChart').getContext('2d');
    appointmentChart = new Chart(appointmentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Scheduled', 'Completed', 'Cancelled'],
            datasets: [{
                data: [],
                backgroundColor: ['#ffc107', '#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true
        }
    });
}

function updateCharts(stats) {
    // Update Patient Activity Chart
    patientActivityChart.data.labels = stats.patientActivity.labels;
    patientActivityChart.data.datasets[0].data = stats.patientActivity.data;
    patientActivityChart.update();

    // Update Revenue Chart
    revenueChart.data.labels = stats.revenue.labels;
    revenueChart.data.datasets[0].data = stats.revenue.data;
    revenueChart.update();

    // Update Appointment Chart
    appointmentChart.data.datasets[0].data = [
        stats.appointments.scheduled,
        stats.appointments.completed,
        stats.appointments.cancelled
    ];
    appointmentChart.update();
}

function setupEventListeners() {
    // Date range selector
    document.getElementById('dateRange').addEventListener('change', function(e) {
        loadDashboardStats();
    });

    // Quick action buttons
    document.querySelectorAll('.quick-action').forEach(button => {
        button.addEventListener('click', function(e) {
            const action = e.target.dataset.action;
            switch(action) {
                case 'newAppointment':
                    window.location.href = '../Appoinment/Appointment.html';
                    break;
                case 'newPatient':
                    window.location.href = '../Patients/patients.html';
                    break;
                case 'newBill':
                    window.location.href = '../Billings/billing.html';
                    break;
                case 'pharmacy':
                    window.location.href = '../Pharmacy/Pharmacy.html';
                    break;
            }
        });
    });
}

// Recent Activity Feed
async function loadRecentActivity() {
    try {
        const response = await fetch('http://localhost:8080/api/dashboard/activity');
        const activities = await response.json();
        displayRecentActivity(activities);
    } catch (error) {
        console.error('Error loading recent activity:', error);
    }
}

function displayRecentActivity(activities) {
    const activityFeed = document.getElementById('activityFeed');
    activityFeed.innerHTML = '';

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${getActivityIcon(activity.type)}">
                <i class="bi ${getActivityIconClass(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${formatActivityTime(activity.timestamp)}</div>
                <div class="activity-description">${activity.description}</div>
            </div>
        `;
        activityFeed.appendChild(activityItem);
    });
}

function getActivityIcon(type) {
    switch(type) {
        case 'APPOINTMENT': return 'bg-primary';
        case 'PATIENT': return 'bg-success';
        case 'BILLING': return 'bg-warning';
        case 'STAFF': return 'bg-info';
        default: return 'bg-secondary';
    }
}

function getActivityIconClass(type) {
    switch(type) {
        case 'APPOINTMENT': return 'bi-calendar-check';
        case 'PATIENT': return 'bi-person-plus';
        case 'BILLING': return 'bi-receipt';
        case 'STAFF': return 'bi-people';
        default: return 'bi-bell';
    }
}

function formatActivityTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        return `${hours} hours ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Alert System
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.querySelector('main').insertAdjacentElement('afterbegin', alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}