document.addEventListener("DOMContentLoaded", () => {
  // Actualizar año en el footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contenedor de productos
  const grid = document.getElementById("productosGrid");
  if (!grid) return;

  // Ruta al JSON
  const jsonPath = "../data/productos.json"; 

  // Imagen de respaldo (debes tener este archivo en /images/)
  const defaultImg = "../images/no-image.png";

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar ${jsonPath}`);
      return res.json();
    })
    .then(data => {
      if (!data.productos || !Array.isArray(data.productos)) {
        throw new Error("El JSON no tiene la propiedad 'productos' o no es un array.");
      }

      data.productos.forEach(producto => {
        // Evitar tarjetas vacías si faltan datos importantes
        if (!producto.nombre || !producto.descripcion) return;

        const div = document.createElement("div");
        div.className = "gallery-product";
        div.innerHTML = `
          <div class="product-thumbnail">
            <img data-src="${producto.imagen}" 
                 alt="${producto.nombre}" 
                 class="lazy"
                 onerror="this.onerror=null;this.src='${defaultImg}';">
            ${producto.badge ? `<div class="product-badge">${producto.badge}</div>` : ""}
          </div>
          <div class="product-meta">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="product-price">${producto.precio || ""}</div>
          </div>
        `;
        grid.appendChild(div);
      });

      // Lazy loading de imágenes
      const lazyImages = document.querySelectorAll("img.lazy");
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.closest(".gallery-product").classList.add("visible");
            img.classList.remove("lazy");
            obs.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => observer.observe(img));
    })
    .catch(err => {
      console.error("Error cargando galería:", err);
      grid.innerHTML = `<p style="color:red;">No se pudieron cargar los productos. Comprueba la ruta y el JSON.</p>`;
    });
});
