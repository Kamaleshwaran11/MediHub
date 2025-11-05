const API = 'http://localhost:8080/api/staff';

async function fetchStaff() {
    const res = await fetch(API);
    const data = await res.json();
    const tbody = document.querySelector('#staffTable tbody');
    tbody.innerHTML = '';
    
    data.forEach(s => {
        const tr = document.createElement('tr');
        tr.dataset.department = s.department || '';
        tr.innerHTML = `
            <td>${s.name || ''}</td>
            <td>${s.role || ''}</td>
            <td>${s.department || ''}</td>
            <td>${s.qualification || ''}</td>
            <td>${s.licenseNumber || ''}</td>
            <td>${s.experienceYears ? s.experienceYears + ' years' : ''}</td>
            <td>${s.shift || ''}</td>
            <td class="contact-info">
                <div>${s.email || ''}</div>
                <div>${s.phone || ''}</div>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button data-id="${s.id}" class="btn btn-outline-primary edit">Edit</button>
                    <button data-id="${s.id}" class="btn btn-outline-danger delete">Delete</button>
                </div>
            </td>`;
        tbody.appendChild(tr);
    });
}

async function saveStaff(e) {
    e.preventDefault();
    const id = document.getElementById('staffId').value;
    const payload = {
        name: document.getElementById('name').value,
        role: document.getElementById('role').value,
        department: document.getElementById('department').value,
        qualification: document.getElementById('qualification').value,
        licenseNumber: document.getElementById('licenseNumber').value,
        experienceYears: parseInt(document.getElementById('experienceYears').value) || null,
        shift: document.getElementById('shift').value,
        specialization: document.getElementById('specialization').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    try {
        if(id) {
            await fetch(`${API}/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
        } else {
            await fetch(API, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
        }
        resetForm();
        fetchStaff();
    } catch (error) {
        alert('Error saving staff member. Please try again.');
        console.error('Error:', error);
    }
}

function resetForm() {
    document.getElementById('staffForm').reset();
    document.getElementById('staffId').value = '';
}

document.getElementById('staffForm').addEventListener('submit', saveStaff);
document.getElementById('cancel').addEventListener('click', resetForm);

document.querySelector('#staffTable tbody').addEventListener('click', async (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const id = button.dataset.id;
    
    if (button.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this staff member?')) {
            try {
                await fetch(`${API}/${id}`, {method: 'DELETE'});
                fetchStaff();
            } catch (error) {
                alert('Error deleting staff member. Please try again.');
                console.error('Error:', error);
            }
        }
    } else if (button.classList.contains('edit')) {
        try {
            const res = await fetch(`${API}/${id}`);
            const s = await res.json();
            document.getElementById('staffId').value = s.id || '';
            document.getElementById('name').value = s.name || '';
            document.getElementById('role').value = s.role || '';
            document.getElementById('department').value = s.department || '';
            document.getElementById('qualification').value = s.qualification || '';
            document.getElementById('licenseNumber').value = s.licenseNumber || '';
            document.getElementById('experienceYears').value = s.experienceYears || '';
            document.getElementById('shift').value = s.shift || '';
            document.getElementById('specialization').value = s.specialization || '';
            document.getElementById('email').value = s.email || '';
            document.getElementById('phone').value = s.phone || '';
        } catch (error) {
            alert('Error loading staff member details. Please try again.');
            console.error('Error:', error);
        }
    }
});

fetchStaff();