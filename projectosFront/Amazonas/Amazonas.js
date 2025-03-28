// Variables globales
let board = document.getElementById('board');
let contador = 1;
let turnoActual = 0;
let reinaSeleccionada = null;
let celda;
let bloquarCamino = false;
const newGame = document.getElementById('newGame');

function administrarTurno() {
  for (let f = 0; f < board.children.length; f++) {
    for (let c = 0; c < board.children[f].children.length; c++) {
      if (turnoActual % 2 == 0 && board.children[f].children[c].children[0]) {
        if (board.children[f].children[c].children[0].getAttribute('src') == ('img/blanca.png')) {
          board.children[f].children[c].classList.add('bordeVerde')
        }
      } else if (turnoActual % 2 != 0 && board.children[f].children[c].children[0]) {
        if (board.children[f].children[c].children[0].getAttribute('src') == ('img/negra.png')) {
          board.children[f].children[c].classList.add('bordeVerde')
        }
      }
    }
  }
}

// Crea el tablero al iniciar el juego
function pintarTablero() {
  // Reiniciar variables globales
  contador = 1;
  turnoActual = 0;
  reinaSeleccionada = null;
  bloquarCamino = false;

  // Limpiar el tablero
  board.innerHTML = '';

  // Crear el tablero
  for (var f = 0; f < 10; f++) {
    let row = document.createElement('div');
    row.id = contador;
    board.appendChild(row);
    contador++;
    for (var c = 0; c < 10; c++) {
      let cell = document.createElement('div');
      cell.id = contador;
      row.appendChild(cell);
      if (contador % 2) {
        cell.classList.add('marron');
        cell.classList.add('bordeNegro');
      } else {
        cell.classList.add('negro');
        cell.classList.add('bordeNegro');
      }

      // Colocar las reinas blancas
      if (contador == 104 || contador == 107 || contador == 68 || contador == 77) {
        let celdaReina = cell;
        celdaReina.classList.add('reinaBlanca');
        let imgReinaBlanca = document.createElement('img');
        imgReinaBlanca.src = 'img/blanca.png';
        celdaReina.appendChild(imgReinaBlanca);
      }

      // Colocar las reinas negras
      if (contador == 35 || contador == 5 || contador == 8 || contador == 44) {
        let celdaReina = cell;
        celdaReina.classList.add('reinaNegra');
        let imgReinaNegra = document.createElement('img');
        imgReinaNegra.src = 'img/negra.png';
        celdaReina.appendChild(imgReinaNegra);
      }

      contador++;
    }
  }

  // Reiniciar el turno
  administrarTurno();
}

// Muestra los caminos de la reina selecionada
function mostrarCaminos(celda) {
  const fila = Array.from(board.children).findIndex(row => Array.from(row.children).includes(celda));
  const col = Array.from(celda.parentElement.children).indexOf(celda);

  if (celda.classList.contains('bordeVerde')) {
    // HACIA LA DERECHA
    for (let k = col; k < board.children[fila].children.length - 1; k++) {
      const celdaActual = board.children[fila].children[k + 1];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // HACIA LA IZQUIERDA
    for (let k = col; k > 0; k--) {
      const celdaActual = board.children[fila].children[k - 1];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // HACIA ARRIBA
    for (let k = fila; k > 0; k--) {
      const celdaActual = board.children[k - 1].children[col];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // HACIA ABAJO
    for (let k = fila; k < board.children.length - 1; k++) {
      const celdaActual = board.children[k + 1].children[col];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // DIAGONAL DERECHA ABAJO
    for (let k = 1; fila + k < board.children.length && col + k < board.children[fila + k].children.length; k++) {
      const celdaActual = board.children[fila + k].children[col + k];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // DIAGONAL IZQUIERDA ARRIBA
    for (let k = 1; fila - k >= 0 && col - k >= 0; k++) {
      const celdaActual = board.children[fila - k].children[col - k];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // DIAGONAL DERECHA ARRIBA
    for (let k = 1; fila - k >= 0 && col + k < board.children[fila - k].children.length; k++) {
      const celdaActual = board.children[fila - k].children[col + k];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
    // DIAGONAL IZQUIERDA ABAJO
    for (let k = 1; fila + k < board.children.length && col - k >= 0; k++) {
      const celdaActual = board.children[fila + k].children[col - k];
      if (celdaActual.children.length > 0 || celdaActual.classList.contains('flecha')) break;
      celdaActual.classList.remove('bordeNegro');
      celdaActual.classList.add('borde');
    }
  }
}

// Elimina los possibles caminos
function quitarCaminoRojo() {
  for (let f = 0; f < board.children.length; f++) {
    for (let c = 0; c < board.children[f].children.length; c++) {
      board.children[f].children[c].classList.remove('borde');
      board.children[f].children[c].classList.add('bordeNegro');
    }
  }
}

// Desselecciona las reinas que no se han movido
function quitarCaminoVerde() {
  for (let f = 0; f < board.children.length; f++) {
    for (let c = 0; c < board.children[f].children.length; c++) {
      board.children[f].children[c].classList.remove('bordeVerde');
      board.children[f].children[c].classList.add('bordeNegro');
    }
  }
}

// Selecciona la reina que queremos mover
function seleccionarReina(event) {
  quitarCaminoRojo();
  const target = event.target;

  if (target.tagName === 'IMG') {
    celda = target.parentElement;
    mostrarCaminos(celda); // Llamar a mostrarCaminos con la celda directamente
    reinaSeleccionada = celda;
  }
}

// Mueve la reina a la celda seleccionada
function moverReina(event) {
  const target = event.target;
  if (reinaSeleccionada && target.classList.contains('borde')) {
    const reina = reinaSeleccionada.querySelector('img');
    const claseReina = reinaSeleccionada.classList[2];

    if(reina){
      // Eliminar la reina de la celda actual
      reinaSeleccionada.removeChild(reina);
      reinaSeleccionada.classList.remove(claseReina);

      // Mover la reina a la nueva celda
      target.appendChild(reina);
      target.classList.add(claseReina);

      // Limpiar caminos resaltados
      quitarCaminoRojo();
      quitarCaminoVerde();

      reinaSeleccionada = target;
      reinaSeleccionada.classList.add('bordeVerde');
      mostrarCaminos(target);
      bloquarCamino = true;
    }
  }
}

// Bloquea el camino de la reina que se ha movido
function bloquearCamino(event){
  const target = event.target;
  
  if(target.classList.contains('borde')){
  target.classList.add('flecha')
  }
  bloquarCamino = false;
  quitarCaminoRojo();
  quitarCaminoVerde();
  turnoActual++;
  administrarTurno();
}


document.addEventListener("DOMContentLoaded", pintarTablero); {
};

document.addEventListener("click", (event) => {
  if (event.target.tagName === 'IMG') {
    console.log('entra en seleccionarReina');
    seleccionarReina(event);
  } else if (event.target.classList.contains('borde') && bloquarCamino == false) {
    console.log('entra en moverReina');
    moverReina(event);
  }else if(event.target.classList.contains('borde') && bloquarCamino == true){
    console.log('entra en bloquearCamino');
    bloquearCamino(event);
  }
});

newGame.addEventListener('click', pintarTablero); {
};