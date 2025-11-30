document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
    });

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    let isCalendarRendered = false;
    let calendarInstance = null;
    const API_BASE_URL = 'http://localhost:8080/api/appointments';

    // --- Sidebar Toggle ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-collapsed');
        sidebar.classList.toggle('sidebar-expanded');
        if (sidebar.classList.contains('sidebar-collapsed')) {
            mainContent.classList.remove('ml-64');
            mainContent.classList.add('ml-[4.5rem]');
        } else {
            mainContent.classList.remove('ml-[4.5rem]');
            mainContent.classList.add('ml-64');
        }
        // Adjust calendar after sidebar transition
        if (isCalendarRendered && calendarInstance) {
            setTimeout(() => calendarInstance.updateSize(), 350);
        }
    });

    // Collapse sidebar on mobile
    if (window.innerWidth < 768) {
        sidebar.classList.add('sidebar-collapsed');
        sidebar.classList.remove('sidebar-expanded');
        mainContent.classList.remove('ml-64');
        mainContent.classList.add('ml-[4.5rem]');
    }

    // --- Dark Mode Toggle ---
    const applyDarkMode = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            darkModeIcon.setAttribute('name', 'sunny-outline');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.documentElement.classList.remove('dark');
            darkModeIcon.setAttribute('name', 'moon-outline');
            localStorage.setItem('darkMode', 'disabled');
        }

        // Re-render calendar to match theme
        if (isCalendarRendered && calendarInstance) {
            calendarInstance.destroy();
            isCalendarRendered = false;
            initFullCalendar();
        }
    };

    // Apply saved theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        applyDarkMode(true);
    } else {
        applyDarkMode(false);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyDarkMode(!isDark);
    });

    // --- Sidebar Section Switching ---
    function styleActiveSidebarLink() {
        sidebarLinks.forEach(link => {
            const icon = link.querySelector('ion-icon');
            if (link.classList.contains('active')) {
                link.classList.add('bg-blue-600', 'text-white');
                icon?.classList.add('text-white');
            } else {
                link.classList.remove('bg-blue-600', 'text-white');
                icon?.classList.remove('text-white');
            }
        });
    }

    function showSection(sectionId) {
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
                AOS.refreshHard();
                if (sectionId === 'appointments' && !isCalendarRendered) {
                    initFullCalendar();
                }
            } else {
                section.classList.add('hidden');
            }
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            styleActiveSidebarLink();
            showSection(link.dataset.section);
        });
    });

    styleActiveSidebarLink();
    showSection('appointments');

    // --- API Functions ---
    async function fetchAppointments() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const appointments = await response.json();
            return appointments.map(apt => ({
                id: apt.id,
                title: `Dr. ${apt.doctor?.name || 'Doctor'} - ${apt.patient?.name || 'Patient'}`,
                start: apt.appointmentDate,
                extendedProps: {
                    doctorId: apt.doctor?.id,
                    patientId: apt.patient?.id,
                    reason: apt.reason,
                    appointmentId: apt.id
                },
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6'
            }));
        } catch (error) {
            console.error('Error fetching appointments:', error);
            Swal.fire('Error', 'Failed to load appointments', 'error');
            return [];
        }
    }

    async function createAppointment(appointmentData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create appointment');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }

    async function deleteAppointment(appointmentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/${appointmentId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete appointment');
            return true;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw error;
        }
    }

    // --- FullCalendar ---
    function initFullCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        calendarInstance = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            editable: false,
            selectable: true,
            dayMaxEvents: true,
            events: async function(info, successCallback, failureCallback) {
                try {
                    const events = await fetchAppointments();
                    successCallback(events);
                } catch (error) {
                    failureCallback(error);
                }
            },
            dateClick: async function (info) {
                // Fetch doctors for the dropdown
                const doctors = await fetchDoctors();
                const patients = await fetchPatients();

                const doctorOptions = doctors.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
                const patientOptions = patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

                const result = await Swal.fire({
                    title: 'Add Appointment',
                    html: `
                        <div style="text-align: left;">
                            <label>Patient:</label>
                            <select id="swal-input-patient" class="swal2-input" style="display: block;">
                                <option value="">Select Patient</option>
                                ${patientOptions}
                            </select>
                            <label style="margin-top: 10px;">Doctor:</label>
                            <select id="swal-input-doctor" class="swal2-input" style="display: block;">
                                <option value="">Select Doctor</option>
                                ${doctorOptions}
                            </select>
                            <label style="margin-top: 10px;">Date & Time:</label>
                            <input id="swal-input-datetime" type="datetime-local" class="swal2-input" value="${info.dateStr}T10:00">
                            <label style="margin-top: 10px;">Reason:</label>
                            <input id="swal-input-reason" class="swal2-input" placeholder="Reason for appointment">
                        </div>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Add',
                    customClass: {
                        popup: 'dark:bg-gray-800 dark:text-white'
                    },
                    preConfirm: () => {
                        const patientId = document.getElementById('swal-input-patient').value;
                        const doctorId = document.getElementById('swal-input-doctor').value;
                        const dateTime = document.getElementById('swal-input-datetime').value;
                        const reason = document.getElementById('swal-input-reason').value;

                        if (!patientId || !doctorId || !dateTime) {
                            Swal.showValidationMessage('Please fill in all required fields');
                            return false;
                        }

                        return {
                            patientId,
                            doctorId,
                            dateTime,
                            reason
                        };
                    }
                });

                if (result.isConfirmed && result.value) {
                    try {
                        const appointmentData = {
                            patient: { id: parseInt(result.value.patientId) },
                            doctor: { id: parseInt(result.value.doctorId) },
                            appointmentDate: new Date(result.value.dateTime).toISOString(),
                            reason: result.value.reason || null
                        };

                        await createAppointment(appointmentData);
                        Swal.fire('Success!', 'Appointment has been created.', 'success');
                        calendarInstance.refetchEvents();
                    } catch (error) {
                        Swal.fire('Error', error.message || 'Failed to create appointment', 'error');
                    }
                }
            },
            eventClick: function (info) {
                Swal.fire({
                    title: info.event.title,
                    html: `
                        <p><strong>Start:</strong> ${new Date(info.event.start).toLocaleString()}</p>
                        <p><strong>Reason:</strong> ${info.event.extendedProps.reason || 'N/A'}</p>
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    icon: 'info'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await deleteAppointment(info.event.extendedProps.appointmentId);
                            Swal.fire('Deleted!', 'Appointment removed.', 'success');
                            calendarInstance.refetchEvents();
                        } catch (error) {
                            Swal.fire('Error', 'Failed to delete appointment', 'error');
                        }
                    }
                });
            }
        });

        calendarInstance.render();
        isCalendarRendered = true;
    }

    // --- Helper Functions ---
    async function fetchDoctors() {
        try {
            const response = await fetch('http://localhost:8080/api/doctors');
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return [];
        }
    }

    async function fetchPatients() {
        try {
            const response = await fetch('http://localhost:8080/api/patients');
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error('Error fetching patients:', error);
            return [];
        }
    }
});

// Preloader with expanded duration
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 2500); // 1500ms = 1.5s, adjust as needed
});
