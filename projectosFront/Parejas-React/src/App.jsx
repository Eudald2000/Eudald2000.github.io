import { useState, useEffect } from 'react'
import './parejas.css'
import { Container } from './components/Container.jsx'
import { Board } from './components/Board.jsx'
import { Controls } from './components/Controls.jsx'
import { PopUp } from './components/Popup.jsx'
import { Fila } from './components/Fila.jsx'
import { Card } from './components/Card.jsx'

function App () {
  const images = [
    '/ainz.jpg', '/gojo.jpg', '/ichigo.jpg', '/itadori.jpg', '/luffy.jpg',
    '/naruto.jpg', '/senku.jpg', '/sjw.jpg', '/tanjiro.jpg', '/killua.jpg'
  ]

  // Duplicar y mezclar las imágenes
  const [cards, setCards] = useState(() =>
    [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map(img => ({ image: img, id: Math.random() }))
  )

  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [disabledClick, setDisabledClick] = useState(false)

  const handleCardClick = (index) => {
    if (
      disabledClick ||
      flippedCards.includes(index) ||
      matchedCards.includes(cards[index].image)
    ) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      checkForMatch(newFlipped)
    }
  }

  const checkForMatch = (flipped) => {
    setDisabledClick(true)
    const [first, second] = flipped

    if (cards[first].image === cards[second].image) {
      setMatchedCards(prev => [...prev, cards[first].image])
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    }
  }

  const resetTurn = () => {
    setFlippedCards([])
    setDisabledClick(false)
  }

  const renderRow = (start, end) => {
    return cards.slice(start, end).map((card, index) => (
      <Card
        key={card.id}
        image={card.image}
        isFlipped={flippedCards.includes(start + index) || matchedCards.includes(card.image)}
        onFlip={() => handleCardClick(start + index)}
      />
    ))
  }

  return (
    <Container>
      <Board>
        <Fila>{renderRow(0, 5)}</Fila>
        <Fila>{renderRow(5, 10)}</Fila>
        <Fila>{renderRow(10, 15)}</Fila>
        <Fila>{renderRow(15, 20)}</Fila>
      </Board>
      <Controls />
      <PopUp />
    </Container>
  )
}

export default App
