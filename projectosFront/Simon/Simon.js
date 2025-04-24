// Definimos los colores que vamos a usar
var colores = ['rojo', 'amarillo', 'verde', 'azul'];
var coloresFuertes = ['rojoFu', 'amarilloFu', 'verdeFu', 'azulFu'];
let score = document.getElementById('score');
var sequence = [];
const nuevo = document.getElementById('nuevo');
// Desactivamos los colores al iniciarc la página
colores.forEach(function (color) {
  document.getElementById(color).style.pointerEvents = 'none';
});

// Esta función genera una nueva secuencia de 4 colores aleatorios
function generateSequence() {
  sequence = [];
  for (var i = 0; i < 4; i++) {
    var randomColor = colores[Math.floor(Math.random() * colores.length)];
    sequence.push(randomColor);
  }
}

function playSequence() {

  nuevo.disabled = true

  colores.forEach(function (color) {
    document.getElementById(color).style.pointerEvents = 'none';
  });
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(() => {
      var cambio = document.getElementById(sequence[i]);
      var colorFuerte;
      if (sequence[i] === 'rojo') {
        colorFuerte = coloresFuertes[0];
      } else if (sequence[i] === 'amarillo') {
        colorFuerte = coloresFuertes[1];
      } else if (sequence[i] === 'verde') {
        colorFuerte = coloresFuertes[2];
      } else if (sequence[i] === 'azul') {
        colorFuerte = coloresFuertes[3];
      }
      cambio.classList.add(colorFuerte);
      setTimeout(() => {
        cambio.classList.remove(colorFuerte);
      }, 1000);
    }, i * 1500);
  }

  setTimeout(() => {
    colores.forEach(function (color) {
      document.getElementById(color).style.pointerEvents = 'auto';
    });
    nuevo.disabled = false;
  }, sequence.length * 1500);
}

//INICIAR JUEGO NUEVO (otra forma de ejecutar el codigo)
nuevo.addEventListener('click', startNewGame);
function startNewGame() {

  userSequence = [];
  // Habilitar los colores
  colores.forEach(function (color) {
    document.getElementById(color).style.pointerEvents = 'auto';
  });
  score.innerHTML = 'Colores: 4';
  generateSequence();
  playSequence();
}

//AÑADIR UN COLOR A LA SEQUENCIA
function nuevoColor() {
  var randomColor = colores[Math.floor(Math.random() * colores.length)];
  sequence.push(randomColor);
  playSequence();
}

var userSequence = [];
// Añade un evento de clic a cada color
colores.forEach(function (color) {
  document.getElementById(color).addEventListener('click', function () {
    userSequence.push(color);
    checkSequence();
  });
});

function checkSequence() {
  for (var i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      alert('Has perdido');
      return;
    }
  }

  if (userSequence.length === sequence.length) {
    alert('Secuencia correcta, sumamos un nuevo color');
    userSequence = [];
    nuevoColor();
    score.innerHTML = 'Colores: ' + sequence.length;
  }
}