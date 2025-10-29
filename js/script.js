// script.js
document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Cargar productos desde JSON (solo en galería)
  // =========================
  const productosContainer = document.getElementById("productos-container");

  if (productosContainer) {
    fetch('./data/productos.json')
      .then(res => res.json())
      .then(data => {
        data.productos.forEach(prod => {
          const card = document.createElement("article");
          card.classList.add("producto-card");
          card.innerHTML = `
            <img src="images/${prod.imagen}" alt="${prod.alt}" loading="lazy">
            <h3>${prod.nombre}</h3>
            <p>${prod.descripcion}</p>
          `;
          productosContainer.appendChild(card);
        });
      })
      .catch(err => console.error("Error cargando JSON:", err));
  }

  // =========================
  // Actualizar año en footer
  // =========================
  const footerYear = document.getElementById("currentYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // =========================
  // Resaltar menú activo según página
  // =========================
  const links = document.querySelectorAll('.main-nav a');
  if (links.length) {
    const current = location.pathname.split('/').pop();
    links.forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }
});
