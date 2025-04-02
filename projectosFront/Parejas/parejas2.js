// Mapa de imágenes: identificadores únicos mapeados a rutas reales
// Lista de rutas de imágenes
const rutasImagenes = [
  "img/ainz.jpg",
  "img/itadori.jpg",
  "img/luffy.jpg",
  "img/naruto.jpg",
  "img/gojo.jpg",
  "img/ichigo.jpg",
  "img/killua.jpg",
  "img/senku.jpg",
  "img/sjw.jpg",
  "img/tanjiro.jpg",
];

// Crear un mapa con identificadores únicos para cada carta
const mapaImagenes = {};
rutasImagenes.forEach((ruta, index) => {
  const id1 = `id${index}a`; // Identificador único para la primera carta
  const id2 = `id${index}b`; // Identificador único para la segunda carta
  mapaImagenes[id1] = ruta;
  mapaImagenes[id2] = ruta;
});
// Crear una lista de identificadores duplicados para las parejas
const imagenes = Object.keys(mapaImagenes);

const imgs = document.querySelectorAll(".card");
let primeraSeleccion = null;
let segundaSeleccion = null;
let bloqueo = false;
let turnos = 0;
let contadorParejas = 0
const marcador = document.getElementById("marcador");
const restart = document.getElementById("restart");
const popUp = document.getElementById("popUp")

function assignarImgs() {
  // Crear una copia de la lista para iterar
  const copiaImagenes = [...imagenes];
  const copiaImgs = [...imgs];

  copiaImgs.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * copiaImagenes.length);
    const randomId = copiaImagenes.splice(randomIndex, 1)[0];

    // Crear un elemento <img> sin asignar el atributo src inicialmente
    const imgElement = document.createElement("img");
    imgElement.alt = "hidden"; // Alt genérico para accesibilidad
    imgElement.classList.add("hidden"); // Ocultar la imagen inicialmente

    // Agregar el <img> a la carta
    card.appendChild(imgElement);

    // Asignar el identificador al atributo data-imagen
    card.setAttribute("data-imagen", randomId);
    card.classList.add("interrogante"); // Mantener la clase interrogante
  });
}

function primeraCarta(event) {
  const tarjeta = event.target.closest(".card");
  if (tarjeta && !bloqueo) {
    const img = tarjeta.querySelector("img");
    const idImagenCodificado = tarjeta.getAttribute("data-imagen");

    // Resolver el identificador codificado al nombre de la imagen real
    const rutaImagen = mapaImagenes[idImagenCodificado];

    // Asignar dinámicamente el src al voltear la carta
    img.src = rutaImagen;
    img.classList.remove("hidden"); // Mostrar la imagen
    primeraSeleccion = tarjeta;
    console.log("Primera seleccion: ", idImagenCodificado);
  }
}

function segundaCarta(event) {
  const tarjeta = event.target.closest(".card");
  if (tarjeta && tarjeta !== primeraSeleccion && !bloqueo) {
    const img = tarjeta.querySelector("img");
    const idImagenCodificado = tarjeta.getAttribute("data-imagen");

    // Resolver el identificador codificado al nombre de la imagen real
    const rutaImagen = mapaImagenes[idImagenCodificado];

    // Asignar dinámicamente el src al voltear la carta
    img.src = rutaImagen;
    img.classList.remove("hidden"); // Mostrar la imagen
    segundaSeleccion = tarjeta;
    console.log("Segunda seleccion: ", idImagenCodificado);
  }
  comprobarPareja();
}

function comprobarPareja() {
  bloqueo = true;
  if (!primeraSeleccion || !segundaSeleccion) {
    console.error("Error: Una de las selecciones es null.");
    bloqueo = false;
    return;
  }

  // Obtener los atributos src de las imágenes seleccionadas
  const srcPrimera = primeraSeleccion.querySelector("img").src;
  const srcSegunda = segundaSeleccion.querySelector("img").src;

  if (srcPrimera === srcSegunda) {
    console.log("Son iguales");
    primeraSeleccion.classList.add("correcto");
    segundaSeleccion.classList.add("correcto");
    contadorParejas += 2
    setTimeout(() => {
      primeraSeleccion = null;
      segundaSeleccion = null;
      bloqueo = false;
      turnos += 1;
      actualizarMarcador();
    }, 500);
  } else {
    console.log("No son iguales");
    setTimeout(() => {
      if (primeraSeleccion && segundaSeleccion) {
        // Ocultar las imágenes si no coinciden
        primeraSeleccion.querySelector("img").classList.add("hidden");
        primeraSeleccion.querySelector("img").src = ""; // Limpiar el src
        segundaSeleccion.querySelector("img").classList.add("hidden");
        segundaSeleccion.querySelector("img").src = ""; // Limpiar el src
      }
      primeraSeleccion = null;
      segundaSeleccion = null;
      bloqueo = false;
      turnos += 1;
      actualizarMarcador();
    }, 500);
  }
  esGanador()
}

function esGanador() {
  if (contadorParejas == imgs.length) {
    popUp.classList.remove('hidden');
    
    // TODO ESTO ES EL CONFETTI
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
}

function actualizarMarcador() {
  marcador.textContent = `Turnos: ${turnos}`;
}

document.addEventListener("DOMContentLoaded", () => {
  assignarImgs();
});
document.addEventListener("click", (event) => {
  // Bloquear clics si el juego está en estado de bloqueo
  if (bloqueo) return;
  if (!primeraSeleccion && !segundaSeleccion &&
    event.target.classList.contains("card") &&
    event.target.classList.contains("interrogante")) {
    primeraCarta(event);
  } else if (primeraSeleccion &&
    event.target.classList.contains("card") &&
    event.target.classList.contains("interrogante")) {
    segundaCarta(event);
  }
});

restart.addEventListener("click", () => {
  console.log("Reiniciando el juego...");
  primeraSeleccion = null;
  segundaSeleccion = null;
  bloqueo = false;
  turnos = 0;
  contadorParejas = 0
  popUp.classList.add('hidden')
  actualizarMarcador();
  imgs.forEach((card) => {
    card.className = "card interrogante"; // Restablecer las clases a su estado inicial
    const img = card.querySelector("img");
    if (img) {
      img.remove(); // Eliminar las imágenes existentes
    }
  });
  assignarImgs();
});