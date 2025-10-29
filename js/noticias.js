document.addEventListener('DOMContentLoaded', () => {
  const noticiasContainer = document.getElementById('noticias-container');

  if (!noticiasContainer) {
    console.warn('El contenedor #noticias-container no existe en esta página.');
    return; // No hacer nada si no existe
  }

  function cargarNoticias() {
    fetch('./data/noticias.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        noticiasContainer.innerHTML = '';
        data.forEach(noticia => {
          const div = document.createElement('div');
          div.classList.add('noticia');
          div.innerHTML = `
            <h3>${noticia.titulo}</h3>
            <p>${noticia.contenido}</p>
            <small>${new Date(noticia.fecha).toLocaleDateString()}</small>
          `;
          noticiasContainer.appendChild(div);
        });
      })
      .catch(err => {
        console.error('Error cargando noticias:', err);
        noticiasContainer.innerHTML = `
          <p>No se pudieron cargar las noticias. Intenta de nuevo más tarde.</p>
          <button id="retryNoticiasBtn">Reintentar</button>
        `;
        const retryBtn = document.getElementById('retryNoticiasBtn');
        if (retryBtn) {
          retryBtn.addEventListener('click', cargarNoticias);
        }
      });
  }

  cargarNoticias();
});
