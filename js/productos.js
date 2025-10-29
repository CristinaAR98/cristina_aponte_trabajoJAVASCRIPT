// productos.js
document.addEventListener("DOMContentLoaded", async () => {
  const productosContainer = document.getElementById("productos-container");
  const defaultImg = '../images/no-image.png'; // Imagen por defecto

  if (!productosContainer) return;

  try {
    const response = await fetch('../data/productos.json');
    const data = await response.json();
    productosContainer.innerHTML = '';

    data.productos.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'gallery-product';
      card.setAttribute('role', 'gridcell');
      card.setAttribute('tabindex', '0');

      const badgeClass = producto.badge === 'PRO' ? 'pro' :
                         producto.badge === 'Más vendido' ? 'bestseller' :
                         producto.badge === 'Nuevo' ? 'new' : '';

      const srcImg = producto.imagen + '.jpg';

      card.innerHTML = `
        <div class="product-thumbnail">
          <img src="${srcImg}" alt="${producto.nombre}" class="producto-img" loading="lazy" 
               onerror="this.onerror=null;this.src='${defaultImg}';">
          ${producto.badge ? `<div class="product-badge ${badgeClass}">${producto.badge}</div>` : ''}
        </div>
        <div class="product-meta">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <div class="product-price">${producto.precio || ''}</div>
          <button class="btn btn-outline" aria-label="Ver detalles del ${producto.nombre}">
            Ver detalles
          </button>
        </div>
      `;
      productosContainer.appendChild(card);
    });

    // Animación al hacer scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-product').forEach(card => observer.observe(card));

  } catch (error) {
    console.error('Error al cargar los productos:', error);
    productosContainer.innerHTML = `<p>Error al cargar los productos.</p>`;
  }
});

