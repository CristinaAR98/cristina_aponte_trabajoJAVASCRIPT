// cargaJSON.js

document.addEventListener('DOMContentLoaded', () => {
  // Cargar productos desde JSON
  fetch('json/productos.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar productos.json');
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('productos-container');
      if (!container) return;

      data.productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.alt || producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          ${producto.precio ? `<p><strong>${producto.precio}</strong></p>` : ''}
          ${producto.badge ? `<span class="badge">${producto.badge}</span>` : ''}
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Error cargando productos:', error));

  // Cargar noticias desde JSON
  fetch('json/noticias.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar noticias.json');
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('noticias-container');
      if (!container) return;

      data.noticias.forEach(noticia => {
        const div = document.createElement('div');
        div.classList.add('noticia');
        div.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <p>${noticia.resumen}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Error cargando noticias:', error));
});
