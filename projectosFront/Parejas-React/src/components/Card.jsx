import { useState } from 'react'

export const Card = ({ image, mostrarCarta }) => {
  const [volteada, setVolteada] = useState(false)

  const handleClick = (e) => {
    setVolteada(!volteada)
    mostrarCarta(e) // Pasar el evento y la imagen
  }

  return (
    <>
    <div className="card" >
      <img onClick={handleClick} src={volteada ? image : '/interrogante.jpg'} alt="Carta" />
    </div>
    </>
  )
}
