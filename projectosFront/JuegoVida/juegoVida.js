 // window.onload = function(){
    //     let start = document.getElementById("start").addEventListener("click", startGame);
    // }
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("start").addEventListener("click", gameStart);
    })
    let rows = parseInt(document.getElementById("rows").value);
    let cols = parseInt(document.getElementById("cols").value);
    let board = document.getElementById("board");

    function gameStart() {
      rows = parseInt(document.getElementById("rows").value);
      cols = parseInt(document.getElementById("cols").value);
      board.innerHTML = '';
      let started = new Date();
      for (i = 0; i < rows; i++) {
        let row = document.createElement('div')
        board.appendChild(row)
        for (let c = 0; c < cols; c++) {
          let cell = document.createElement('div')
          cell.addEventListener("click", changeState);
          row.appendChild(cell)
        }
      }
    }
    //OTRA FORMA DE CREAR EL TABLERO
    // let str = ""
    // for (let r = 0; r < rows; r++) {
    //     str += "<div>"
    //     for (let c = 0; c < cols; c++) {
    //         str += '<div onclick="changeState(event)"></div>'
    //     }
    //     str += "</div>"
    // }
    //board.innerHTML = str
    // let end = new Date();
    // let epleasedTime = end - start;
    // console.log(epleasedTime);

    function nextStep() {
      let rows = board.children.length;
      let cols = board.children[0].children.length;

      // Crear un nuevo tablero para almacenar el próximo estado
      let nuevoEstado = [];
      for (let i = 0; i < rows; i++) {
        nuevoEstado[i] = Array(cols).fill(0);
      }

      for (let r = 0; r < board.children.length; r++) {
        let row = board.children[r];
        for (let c = 0; c < row.children.length; c++) {
          let count = 0;

          // Verifica las posiciones alrededor del elemento en la posición [r][c]
          if (r > 0 && board.children[r - 1].children[c].classList.contains('alive')) {
            count++;
          }
          if (r < board.children.length - 1 && board.children[r + 1].children[c].classList.contains('alive')) {
            count++;
          }
          if (c > 0 && board.children[r].children[c - 1].classList.contains('alive')) {
            count++;
          }
          if (c < row.children.length - 1 && board.children[r].children[c + 1].classList.contains('alive')) {
            count++;
          }
          if (r > 0 && c > 0 && board.children[r - 1].children[c - 1].classList.contains('alive')) {
            count++;
          }
          if (r > 0 && c < row.children.length - 1 && board.children[r - 1].children[c + 1].classList.contains('alive')) {
            count++;
          }
          if (r < board.children.length - 1 && c > 0 && board.children[r + 1].children[c - 1].classList.contains('alive')) {
            count++;
          }
          if (r < board.children.length - 1 && c < row.children.length - 1 && board.children[r + 1].children[c + 1].classList.contains('alive')) {
            count++;
          }

          // Aplicar las reglas del juego al nuevo estado
          let contador = count;
          const cell = board.children[r].children[c];

          if (!cell.classList.contains('alive') && contador >= 3) {
            nuevoEstado[r][c] = 1;
          } else if (cell.classList.contains('alive') && (contador === 2 || contador === 3)) {
            nuevoEstado[r][c] = 1;
          } else {
            nuevoEstado[r][c] = 0;
          }
        }
      }

      // Aplicar el nuevo estado al tablero
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = board.children[r].children[c];
          if (nuevoEstado[r][c] === 1) {
            cell.classList.add('alive');
          } else {
            cell.classList.remove('alive');
          }
        }
      }
    }

    function changeState(event) {
      // Obtiene la fila y la columna de la celda clicada
      const row = event.currentTarget.parentElement;
      const col = Array.from(row.children).indexOf(event.currentTarget);

      // Aplica la clase 'alive' a la celda clicada
      event.currentTarget.classList.toggle('alive');

      // Aplica la clase 'alive' a las 8 celdas circundantes
      applyClassToCell(row, col - 1); // izquierda
      applyClassToCell(row, col + 1); // derecha

      const prevRow = row.previousElementSibling;
      const nextRow = row.nextElementSibling;

      if (prevRow) {
        applyClassToCell(prevRow, col - 1); // arriba izquierda
        applyClassToCell(prevRow, col);     // arriba
        applyClassToCell(prevRow, col + 1); // arriba derecha
      }

      if (nextRow) {
        applyClassToCell(nextRow, col - 1); // abajo izquierda
        applyClassToCell(nextRow, col);     // abajo
        applyClassToCell(nextRow, col + 1); // abajo derecha
      }
    }

    function applyClassToCell(row, col) {
      // Verifica si la celda está dentro de los límites del tablero
      if (row && col >= 0 && col < row.children.length) {
        const cell = row.children[col];
        cell.classList.toggle('alive');
      }
    }

    setInterval(nextStep, 1000);

