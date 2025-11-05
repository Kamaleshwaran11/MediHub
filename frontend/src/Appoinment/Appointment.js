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
            editable: true,
            selectable: true,
            dayMaxEvents: true,
            events: [
                {
                    title: 'Meeting with Dr. Smith',
                    start: '2025-11-05T10:30:00',
                    end: '2025-11-05T11:30:00',
                    backgroundColor: '#3B82F6',
                    borderColor: '#3B82F6'
                }
            ],
            dateClick: function (info) {
                Swal.fire({
                    title: 'Add Appointment',
                    html: `
                        <input id="swal-input-title" class="swal2-input" placeholder="Title">
                        <input id="swal-input-date" type="date" class="swal2-input" value="${info.dateStr}">
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Add',
                    preConfirm: () => ({
                        title: document.getElementById('swal-input-title').value,
                        date: document.getElementById('swal-input-date').value
                    }),
                    customClass: {
                        popup: 'dark:bg-gray-800 dark:text-white'
                    }
                }).then((result) => {
                    if (result.isConfirmed && result.value.title) {
                        calendarInstance.addEvent({
                            title: result.value.title,
                            start: result.value.date,
                            allDay: true,
                            backgroundColor: '#F59E0B',
                            borderColor: '#F59E0B'
                        });
                        Swal.fire('Added!', 'Appointment has been added.', 'success');
                    }
                });
            },
            eventClick: function (info) {
                Swal.fire({
                    title: info.event.title,
                    html: `<p><strong>Start:</strong> ${info.event.start.toLocaleString()}</p>`,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    icon: 'info'
                }).then((result) => {
                    if (result.isConfirmed) {
                        info.event.remove();
                        Swal.fire('Deleted!', 'Appointment removed.', 'success');
                    }
                });
            }
        });

        calendarInstance.render();
        isCalendarRendered = true;
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