document.addEventListener("DOMContentLoaded", function () {
   fetch("http://localhost:8080/api/doctors")
   //fetch("https://beta.myupchar.com/api/v1/get_live_doctors_for_third_party?key=API_KEY&lang=en&name=USER_NAME&telephone=...&speciality_id=25")
    .then(response => response.json())
        .then(doctors => {
            const container = document.getElementById("doctorGrid");
            container.innerHTML = "";
            doctors.forEach(doctor => {
                const card = document.createElement("div");
                card.className = "doctor-card";
                card.innerHTML = `
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: #ccc;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            color: #fff;
                            margin-right: 15px;">
                            ${doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
                        </div>
                        <div>
                            <p style="margin:0;"><strong>${doctor.name}</strong></p>
                            <p style="margin:0; font-size: 12px; color: #666;">${doctor.specialization}</p>
                        </div>
                    </div>
                    <p><strong>ID:</strong> ${doctor.id}</p>
                    <p><strong>Phone:</strong> ${doctor.phone}</p>
                    <p><strong>Email:</strong> ${doctor.email}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading doctors:", error));
}); 




    // Preloader with expanded duration
window.addEventListener('load', function () {
	const preloader = document.getElementById('preloader');
	preloader.classList.add('fade-out');
	setTimeout(function() {
		preloader.classList.add('hidden');
	}, 2500); // 1500ms = 1.5s, adjust as needed
});


    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupWindow = document.getElementById('popupWindow');

    openPopupBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'block';
        popupWindow.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        popupWindow.style.display = 'none';
    });

    popupOverlay.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        popupWindow.style.display = 'none';
    });


        document.getElementById('openAddDoctorPopupBtn').onclick = function() {
        document.getElementById('addDoctorPopupOverlay').style.display = 'block';
        document.getElementById('addDoctorPopupWindow').style.display = 'block';
    };
    document.getElementById('closeAddDoctorPopupBtn').onclick = function() {
        document.getElementById('addDoctorPopupOverlay').style.display = 'none';
        document.getElementById('addDoctorPopupWindow').style.display = 'none';
    };
    document.getElementById('addDoctorPopupOverlay').onclick = function() {
        document.getElementById('addDoctorPopupOverlay').style.display = 'none';
        document.getElementById('addDoctorPopupWindow').style.display = 'none';
    };