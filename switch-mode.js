document.addEventListener('DOMContentLoaded', function() {
  const modoSwitch = document.querySelector('#modo-switch')

  const darkMode = localStorage.getItem('dark-mode')
  if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode')
  }

  modoSwitch.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode')

      if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('dark-mode', 'enabled')
      } else {
          localStorage.setItem('dark-mode', 'disabled')
      }
  })
})
