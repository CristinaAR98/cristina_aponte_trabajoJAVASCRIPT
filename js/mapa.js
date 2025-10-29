// mapa.js
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.warn("No se encontró el contenedor del mapa (#map).");
    return;
  }

  // Coordenadas del negocio
  const negocioLatLng = [42.7070, -8.2292];

  // Crear mapa centrado en el negocio
  const map = L.map("map").setView(negocioLatLng, 13);

  // Capa base de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Marcador del negocio
  L.marker(negocioLatLng)
    .addTo(map)
    .bindPopup("<b>Better Clean</b><br>Silleda, Pontevedra")
    .openPopup();

  // Función para dibujar la ruta
  const dibujarRuta = (visitanteLatLng) => {
    // Marcador del visitante
    L.marker(visitanteLatLng)
      .addTo(map)
      .bindPopup("📍 Tu ubicación")
      .openPopup();

    // Verifica si Leaflet Routing Machine está disponible
    if (typeof L.Routing !== "undefined") {
      const control = L.Routing.control({
        waypoints: [
          L.latLng(visitanteLatLng[0], visitanteLatLng[1]),
          L.latLng(negocioLatLng[0], negocioLatLng[1])
        ],
        routeWhileDragging: false,
        showAlternatives: true,
        lineOptions: {
          styles: [{ color: "#0078FF", opacity: 0.7, weight: 5 }]
        },
        createMarker: (i, wp) => L.marker(wp.latLng),
        collapsible: true,
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1"
        })
      }).addTo(map);

      // Estilo del panel de rutas
      control.on("routesfound", () => {
        const container = document.querySelector(".leaflet-routing-container");
        if (container) {
          container.style.backgroundColor = "white";
          container.style.color = "black";
          container.style.padding = "10px";
          container.style.borderRadius = "8px";
          container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        }
      });
    }

    // Ajustar vista para mostrar ambos puntos
    map.fitBounds([negocioLatLng, visitanteLatLng], { padding: [50, 50] });
  };

  // Intentar obtener la ubicación del usuario
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const visitanteLatLng = [
          position.coords.latitude,
          position.coords.longitude
        ];
        dibujarRuta(visitanteLatLng);
      },
      (error) => {
        console.warn("⚠️ Geolocalización no disponible o denegada:", error.message);
        map.setView(negocioLatLng, 13);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    console.warn("🚫 El navegador no soporta geolocalización.");
    map.setView(negocioLatLng, 13);
  }
});
