import { useState, useEffect } from 'react'
import './parejas.css'
import { Container } from './components/Container.jsx'
import { Board } from './components/Board.jsx'
import { Controls } from './components/Controls.jsx'
import { PopUp } from './components/Popup.jsx'
import { Fila } from './components/Fila.jsx'
import { Card } from './components/Card.jsx'

function App () {
  const [listImg, setListImg] = useState([
    '/ainz.jpg', '/gojo.jpg', '/ichigo.jpg', '/itadori.jpg', '/luffy.jpg',
    '/naruto.jpg', '/senku.jpg', '/sjw.jpg', '/tanjiro.jpg', '/ainz.jpg',
    '/gojo.jpg', '/ichigo.jpg', '/itadori.jpg', '/luffy.jpg', '/naruto.jpg',
    '/senku.jpg', '/sjw.jpg', '/tanjiro.jpg', '/killua.jpg', '/killua.jpg'
  ])
  const [carta1, setCarta1] = useState(null)
  const [carta2, setCarta2] = useState(null)
  const [shuffledImages, setShuffledImages] = useState([])

  // Mezclar las imágenes
  useEffect(() => {
    setShuffledImages([...listImg].sort(() => Math.random() - 0.5))
  }, [])

  const seleccionarCarta = (e) => {
    const cartaSeleccionada = e.target // Asegúrate de que el evento sea válido
    if (cartaSeleccionada) {
      if (carta1 === null) {
        setCarta1(cartaSeleccionada)
      } else if (carta1 && !carta2) {
        setCarta2(cartaSeleccionada)
      }
    }
  }

  const comprobarPareja = () => {
    if (carta1.src === carta2.src) {
      console.log('Son iguales')
    } else {
      console.log('No son iguales')
    }
    setCarta1(null)
    setCarta2(null)
  }

  useEffect(() => {
    if (carta1 && carta2) {
      comprobarPareja()
    }
  }, [carta1, carta2])
  return (
    <>
      <Container>
        <Board>
          {/* Fila 1 */}
          <Fila>
            <Card image={shuffledImages[0]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[1]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[2]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[3]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[4]} mostrarCarta={seleccionarCarta} />
          </Fila>

          {/* Fila 2 */}
          <Fila>
            <Card image={shuffledImages[5]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[6]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[7]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[8]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[9]} mostrarCarta={seleccionarCarta} />
          </Fila>

          {/* Fila 3 */}
          <Fila>
            <Card image={shuffledImages[10]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[11]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[12]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[13]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[14]} mostrarCarta={seleccionarCarta} />
          </Fila>

          {/* Fila 4 */}
          <Fila>
            <Card image={shuffledImages[15]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[16]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[17]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[18]} mostrarCarta={seleccionarCarta} />
            <Card image={shuffledImages[19]} mostrarCarta={seleccionarCarta} />
          </Fila>
        </Board>
        <Controls />
        <PopUp />
      </Container>
    </>
  )
}

export default App
