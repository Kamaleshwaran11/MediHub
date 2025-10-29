async function loadMedicines(page=0) {
    let res = await fetch(`http://localhost:8080/api/medicines?page=${page}&size=1000`);
    let data = await res.json();
    let grid = document.querySelector("#medicineGrid");
    grid.innerHTML = "";

    data.content.forEach(m => {
        let card = `
          <div class="card">
            <h3>${m.productName}</h3>
            <p><b>Sub Category:</b> ${m.subCategory}</p>
            <p><b>Salt:</b> ${m.saltComposition}</p>
            <p class="price">₹${m.productPrice}</p>
            <p><b>Manufacturer:</b> ${m.productManufactured}</p>
            <!-- <p><b>Description:</b> ${m.medicineDesc}</p> -->
            <!-- <p><b>Side Effects:</b> ${m.sideEffects}</p> -->
            <!-- <p><b>Drug Interactions:</b> ${m.drugInteractions}</p> -->
          </div>`;
        grid.innerHTML += card;
    });
}

async function searchMedicines() {
    let keyword = document.getElementById("searchBox").value;
    if(keyword.length < 2) return;
    let res = await fetch(`http://localhost:8080/api/medicines/search?keyword=${keyword}`);
    let data = await res.json();
    let grid = document.querySelector("#medicineGrid");
    grid.innerHTML = "";

    data.forEach(m => {
        let card = `
          <div class="card">
            <h3>${m.productName}</h3>
            <p><b>Sub Category:</b> ${m.subCategory}</p>
            <p><b>Salt:</b> ${m.saltComposition}</p>
            <p class="price">₹${m.productPrice}</p>
            <p><b>Manufacturer:</b> ${m.productManufactured}</p>
            <p><b>Description:</b> ${m.medicineDesc}</p>
            <p><b>Side Effects:</b> ${m.sideEffects}</p>
            <p><b>Drug Interactions:</b> ${m.drugInteractions}</p>
          </div>`;
        grid.innerHTML += card;
    });
}

loadMedicines();

  // Preloader with expanded duration
window.addEventListener('load', function () {
	const preloader = document.getElementById('preloader');
	preloader.classList.add('fade-out');
	setTimeout(function() {
		preloader.classList.add('hidden');
	}, 2500); // 1500ms = 1.5s, adjust as needed
});