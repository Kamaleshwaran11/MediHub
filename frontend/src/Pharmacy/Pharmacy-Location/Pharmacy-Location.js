// Initialize map
const map = L.map("map").setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Add search bar
L.Control.geocoder({
  position: "topright",
  placeholder: "Search city or location...",
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    const latlng = e.geocode.center;
    map.setView(latlng, 13);
  })
  .addTo(map);

// 🧭 Detect user's location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here").openPopup();

      // ✅ Fetch nearby pharmacies (within 10km)
      const overpassUrl = "https://overpass-api.de/api/interpreter";
      const query = `
      [out:json];
      node["amenity"="pharmacy"](around:10000,${lat},${lon});
      out;
      `;

      fetch(overpassUrl, {
        method: "POST",
        body: query,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Nearby pharmacies:", data);

          data.elements.forEach((pharmacy) => {
            const { lat, lon, tags } = pharmacy;
            const name = tags.name || "Unnamed Pharmacy";
            const address = tags["addr:street"] || "Unknown location";

            L.marker([lat, lon])
              .addTo(map)
              .bindPopup(`<b>${name}</b><br>${address}`);
          });

          alert(`✅ Found ${data.elements.length} pharmacies near you!`);
        })
        .catch((err) =>
          console.error("Error fetching nearby pharmacies:", err)
        );
    },
    (error) => {
      alert("Unable to get your location. Please enable GPS and reload.");
      console.error(error);
    }
  );
} else {
  alert("Geolocation not supported in this browser.");
}
