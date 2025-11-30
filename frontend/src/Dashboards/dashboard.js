// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    initializeCharts();
    setupEventListeners();
    loadRecentActivity();
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
    }
}

async function fetchDashboardStats() {
    try {
        const response = await fetch('http://localhost:8080/api/dashboard/stats');
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

function updateStatCards(stats) {
    const patientsEl = document.getElementById('patientsCount');
    const doctorsEl = document.getElementById('doctorsCount');
    const appointmentsEl = document.getElementById('appointmentsCount');
    const revenueEl = document.getElementById('revenueCount');

    if (patientsEl) patientsEl.textContent = stats.totalPatients ?? 0;
    if (doctorsEl) doctorsEl.textContent = stats.totalDoctors ?? 0;
    if (appointmentsEl) appointmentsEl.textContent = stats.todayAppointments ?? 0;
    if (revenueEl) {
        const rev = stats.monthlyRevenue;
        if (typeof rev === 'number') {
            revenueEl.textContent = `₹${rev.toFixed(2)}`;
        } else if (rev && rev.amount !== undefined) {
            revenueEl.textContent = `₹${parseFloat(rev.amount).toFixed(2)}`;
        } else {
            revenueEl.textContent = '₹0.00';
        }
    }
}

function initializeCharts() {
    // Patient Activity Chart
    const patientCanvas = document.getElementById('patientActivityChart');
    if (patientCanvas) {
        const patientCtx = patientCanvas.getContext('2d');
        patientActivityChart = new Chart(patientCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Appointments',
                    data: [],
                    borderColor: '#2470dc',
                    backgroundColor: 'rgba(36, 112, 220, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Revenue Chart
    const revenueCanvas = document.getElementById('revenueChart');
    if (revenueCanvas) {
        const revenueCtx = revenueCanvas.getContext('2d');
        revenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Monthly Revenue (₹)',
                    data: [],
                    backgroundColor: '#28a745'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Appointment Chart
    const appointmentCanvas = document.getElementById('appointmentChart');
    if (appointmentCanvas) {
        const appointmentCtx = appointmentCanvas.getContext('2d');
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
}

function updateCharts(stats) {
    if (!stats || !stats.patientActivity || !stats.revenue || !stats.appointments) {
        return;
    }

    // Update Patient Activity Chart
    if (patientActivityChart && stats.patientActivity.labels) {
        patientActivityChart.data.labels = stats.patientActivity.labels;
        patientActivityChart.data.datasets[0].data = stats.patientActivity.data;
        patientActivityChart.update();
    }

    // Update Revenue Chart
    if (revenueChart && stats.revenue.labels) {
        revenueChart.data.labels = stats.revenue.labels;
        revenueChart.data.datasets[0].data = stats.revenue.data;
        revenueChart.update();
    }

    // Update Appointment Chart
    if (appointmentChart) {
        appointmentChart.data.datasets[0].data = [
            stats.appointments.scheduled || 0,
            stats.appointments.completed || 0,
            stats.appointments.cancelled || 0
        ];
        appointmentChart.update();
    }
}

function setupEventListeners() {
    // Setup event listeners safely (only if elements exist)
    const dateRangeEl = document.getElementById('dateRange');
    if (dateRangeEl) {
        dateRangeEl.addEventListener('change', function(e) {
            loadDashboardStats();
        });
    }

    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action');
    if (quickActionButtons.length > 0) {
        quickActionButtons.forEach(button => {
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
}

// Recent Activity Feed
async function loadRecentActivity() {
    try {
        const response = await fetch('http://localhost:8080/api/dashboard/activity');
        if (!response.ok) throw new Error('Failed to load recent activity');
        const activities = await response.json();
        displayRecentActivity(activities);
    } catch (error) {
        console.error('Error loading recent activity:', error);
    }
}

function displayRecentActivity(activities) {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;

    activityFeed.innerHTML = '';

    if (!activities || activities.length === 0) {
        activityFeed.innerHTML = '<p style="text-align:center;color:#888;padding:20px;">No recent activity</p>';
        return;
    }

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.cssText = `
            display: flex;
            align-items: flex-start;
            padding: 15px;
            background: #fff;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 4px solid ${getActivityColor(activity.type)};
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        `;

        const activityIcon = document.createElement('div');
        activityIcon.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${getActivityColor(activity.type)}20;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
            color: ${getActivityColor(activity.type)};
            font-size: 18px;
        `;
        activityIcon.innerHTML = `<i class="fa ${getActivityIconClass(activity.type)}"></i>`;

        const activityContent = document.createElement('div');
        activityContent.style.cssText = 'flex: 1;';
        activityContent.innerHTML = `
            <div style="font-weight:600;margin-bottom:4px;">${activity.title}</div>
            <div style="font-size:13px;color:#888;margin-bottom:4px;">${activity.description}</div>
            <div style="font-size:12px;color:#aaa;">${formatActivityTime(activity.timestamp)}</div>
        `;

        activityItem.appendChild(activityIcon);
        activityItem.appendChild(activityContent);
        activityFeed.appendChild(activityItem);
    });
}

function getActivityColor(type) {
    switch(type) {
        case 'APPOINTMENT': return '#2470dc';
        case 'PATIENT': return '#28a745';
        case 'BILLING': return '#ffc107';
        case 'STAFF': return '#17a2b8';
        default: return '#6c757d';
    }
}

function getActivityIconClass(type) {
    switch(type) {
        case 'APPOINTMENT': return 'fa-calendar-check';
        case 'PATIENT': return 'fa-user-plus';
        case 'BILLING': return 'fa-receipt';
        case 'STAFF': return 'fa-users';
        default: return 'fa-bell';
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
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}
