   // Preloader with expanded duration
window.addEventListener('load', function () {
	const preloader = document.getElementById('preloader');
	preloader.classList.add('fade-out');
	setTimeout(function() {
		preloader.classList.add('hidden');
	}, 2500); // 1500ms = 1.5s, adjust as needed
});