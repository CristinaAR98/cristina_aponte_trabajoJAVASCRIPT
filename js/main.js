// Actualizar el año en el footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Cargar productos
fetch('data/productos.json')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar productos.json');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('productos-container');
    data.productos.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('producto');
      div.innerHTML = `
        <img src="images/${producto.imagen}" alt="${producto.alt || producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        ${producto.precio ? `<p><strong>${producto.precio}€</strong></p>` : ''}
        ${producto.badge ? `<span class="badge">${producto.badge}</span>` : ''}
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Error cargando productos:', error));

// Cargar noticias
fetch('data/noticias.json')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar noticias.json');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('noticias-container');
    data.forEach(noticia => {
      const div = document.createElement('div');
      div.classList.add('noticia');
      div.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p>${noticia.contenido}</p>
        <small>${noticia.fecha}</small>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Error cargando noticias:', error));

// Resaltar menú activo según página
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.main-nav a');
    const current = location.pathname.split('/').pop();
    links.forEach(link => {
        if(link.getAttribute('href') === current){
            link.classList.add('active');
        }
    });
});
