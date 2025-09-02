  document.addEventListener('DOMContentLoaded', function () {
                    if (isCalendarRendered && calendarInstance && document.getElementById('appointments').classList.contains('hidden') === false) {
            // Destroy and re-initialize to pick up new theme context for some elements
            // This is a heavier approach but ensures theme consistency if CSS alone isn't enough
            calendarInstance.destroy();
            isCalendarRendered = false; // Reset flag
            initFullCalendar();
        }
                });

                 function showSection(sectionId) {
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
                AOS.refreshHard();
                if (sectionId === 'appointments' && !isCalendarRendered) {
                    initFullCalendar();
                } else if (sectionId === 'appointments' && calendarInstance) {
                    calendarInstance.updateSize();
                }
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    // --- FullCalendar ---
    function initFullCalendar() {
        const calendarEl = document.getElementById('calendar');
        if (calendarEl && !isCalendarRendered) {
            calendarInstance = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                events: [
                    { title: 'Meeting with Dr. Smith', start: '2025-05-20T10:30:00', end: '2025-05-20T11:30:00', backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
                    { title: 'Surgery - Patient X', start: '2025-05-22T09:00:00', end: '2025-05-22T13:00:00', backgroundColor: '#EF4444', borderColor: '#EF4444' },
                    { title: 'Conference Call', start: '2025-05-25', backgroundColor: '#10B981', borderColor: '#10B981' }
                ],
                editable: true, selectable: true, dayMaxEvents: true,
                dateClick: function (info) {
                    Swal.fire({
                        title: 'Add New Appointment',
                        html: `<input id="swal-input-title" class="swal2-input" placeholder="Event Title" value="New Appointment"> <input id="swal-input-date" type="date" class="swal2-input" value="${info.dateStr}">`,
                        focusConfirm: false,
                        preConfirm: () => ({ title: document.getElementById('swal-input-title').value, date: document.getElementById('swal-input-date').value }),
                        showCancelButton: true, confirmButtonText: 'Add Event',
                        customClass: { popup: 'dark:bg-gray-800 dark:text-white', confirmButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500', cancelButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-400 ml-2' }, buttonsStyling: false
                    }).then((result) => {
                        if (result.isConfirmed && result.value.title && result.value.date) {
                            calendarInstance.addEvent({ title: result.value.title, start: result.value.date, allDay: true, backgroundColor: '#F59E0B', borderColor: '#F59E0B' });
                            Swal.fire({ title: 'Success!', text: 'Appointment added.', icon: 'success', customClass: { popup: 'dark:bg-gray-800 dark:text-white', confirmButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' }, buttonsStyling: false });
                        }
                    });
                },
                eventClick: function (info) {
                    Swal.fire({
                        title: info.event.title,
                        html: `<p><strong>Starts:</strong> ${info.event.start ? info.event.start.toLocaleString() : 'N/A'}</p> <p><strong>Ends:</strong> ${info.event.end ? info.event.end.toLocaleString() : 'N/A'}</p>`,
                        icon: 'info', showCancelButton: true, confirmButtonText: 'Edit', denyButtonText: 'Delete', showDenyButton: true,
                        customClass: { popup: 'dark:bg-gray-800 dark:text-white', confirmButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500', denyButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 ml-2', cancelButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-400 ml-2' }, buttonsStyling: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({ title: 'Edit Event', text: 'Edit functionality placeholder.', icon: 'info', customClass: { popup: 'dark:bg-gray-800 dark:text-white', confirmButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' }, buttonsStyling: false });
                        } else if (result.isDenied) {
                            info.event.remove();
                            Swal.fire({ title: 'Deleted!', text: 'Appointment removed.', icon: 'success', customClass: { popup: 'dark:bg-gray-800 dark:text-white', confirmButton: 'px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' }, buttonsStyling: false });
                        }
                    });
                }
            });
            calendarInstance.render();
            isCalendarRendered = true;
        } else if (calendarInstance) {
            calendarInstance.updateSize();
        }
    }