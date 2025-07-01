document.addEventListener("DOMContentLoaded", function () {
    fetch('presentacion.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('main-content').innerHTML = data;
        registerIframeLinks();
        registerCopyButtons();
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
  });

  function loadContent(page) {
    fetch(page)
      .then(response => response.text())
      .then(data => {
        document.getElementById('main-content').innerHTML = data;
        registerIframeLinks();
        registerCopyButtons();
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
  }

  function showIframe() {
    var modal = new bootstrap.Modal(document.getElementById('iframePopup'));
    modal.show();
  }

  function registerIframeLinks() {
    document.querySelectorAll('a[target="projectFrame"]').forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const title = this.getAttribute('data-title') || 'Proyecto';
        document.getElementById('iframePopupLabel').textContent = title;
        document.querySelector('iframe[name="projectFrame"]').src = this.href;
        showIframe();
      });
    });
  }

  // DARK/LIGHT MODE
  document.getElementById('modo-switch').addEventListener('click', function () {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-bs-theme');
    const mode = document.getElementById('mode');
    html.setAttribute('data-bs-theme', currentTheme === 'dark' ? 'light' : 'dark');
    if (currentTheme === 'dark') {
      mode.textContent = 'Dark Mode';
    } else {
      mode.textContent = 'Light Mode';
    }
  });

  // BOTONES DE COPIA
  function registerCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', function () {
        const text = this.getAttribute('data-text');
        navigator.clipboard.writeText(text).then(() => {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i>';
          this.classList.add('copied');
          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Error al copiar: ', err);
          alert('No se pudo copiar el texto');
        });
      });
    });
  }