const API = 'http://localhost:8080/api/patients';

async function fetchPatients(){
  const res = await fetch(API);
  const data = await res.json();
  const tbody = document.querySelector('#patientsTable tbody');
  tbody.innerHTML = '';
  data.forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id || ''}</td>
      <td>${p.name || ''}</td>
      <td>${p.age || ''}</td>
      <td>${p.gender || ''}</td>
      <td>${p.phone || ''}</td>
      <td>
        <button data-id="${p.id}" class="edit">Edit</button>
        <button data-id="${p.id}" class="delete">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

async function savePatient(e){
  e.preventDefault();
  const id = document.getElementById('patientId').value;
  const payload = {
    name: document.getElementById('name').value,
    age: parseInt(document.getElementById('age').value,10) || 0,
    gender: document.getElementById('gender').value,
    phone: document.getElementById('phone').value
  };
  if(id){
    await fetch(`${API}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  } else {
    await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  }
  document.getElementById('patientForm').reset();
  document.getElementById('patientId').value='';
  fetchPatients();
}

document.getElementById('patientForm').addEventListener('submit',savePatient);
document.getElementById('cancel').addEventListener('click',()=>{document.getElementById('patientForm').reset();document.getElementById('patientId').value='';});

document.querySelector('#patientsTable tbody').addEventListener('click',async (e)=>{
  if(e.target.classList.contains('delete')){
    const id = e.target.dataset.id;
    if(confirm('Delete patient '+id+'?')){
      await fetch(`${API}/${id}`,{method:'DELETE'});
      fetchPatients();
    }
  } else if(e.target.classList.contains('edit')){
    const id = e.target.dataset.id;
    const res = await fetch(`${API}/${id}`);
    const p = await res.json();
    document.getElementById('patientId').value = p.id || '';
    document.getElementById('name').value = p.name || '';
    document.getElementById('age').value = p.age || '';
    document.getElementById('gender').value = p.gender || '';
    document.getElementById('phone').value = p.phone || '';
  }
});

fetchPatients();
