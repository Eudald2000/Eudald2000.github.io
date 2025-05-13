# Guía para Crear el Juego de las Parejas en React

## 1. Estructura del Proyecto
- Define los siguientes componentes:
  - **Container**: Contenedor principal.
  - **Board**: Tablero donde estarán las cartas.
  - **Fila**: Filas de cartas.
  - **Card**: Representa una carta individual.
  - **Controls**: Controles del juego (botón de reinicio y marcador).
  - **PopUp**: Mensaje de victoria.

## 2. Estado Global
- Usa `useState` para manejar el estado del juego:
  - Lista de cartas (con imágenes y estado: volteada o no).
  - Cartas seleccionadas (primera y segunda).
  - Número de turnos.
  - Contador de parejas encontradas.
  - Estado del juego (ganado o no).

## 3. Generar las Cartas
- Crea un array con las imágenes de las cartas (duplicadas para formar parejas).
- Mezcla las cartas aleatoriamente al inicio del juego.
- Usa el estado para almacenar esta lista de cartas.

## 4. Renderizar las Cartas
- Pasa las cartas como `props` desde el componente `App` al `Board`, luego a cada `Fila` y `Card`.
- Cada carta debe mostrar su imagen solo si está volteada o si ya fue encontrada como pareja.

## 5. Manejo de Eventos
- Implementa un evento `onClick` en cada carta para manejar la lógica de selección:
  - Si es la primera carta seleccionada, guárdala en el estado.
  - Si es la segunda carta seleccionada, verifica si es una pareja:
    - Si coinciden, márcalas como encontradas.
    - Si no coinciden, vuelve a ocultarlas después de un breve retraso.

## 6. Actualizar el Marcador
- Incrementa el número de turnos cada vez que se seleccionen dos cartas.
- Muestra el número de turnos en el componente `Controls`.

## 7. Detectar el Fin del Juego
- Comprueba si todas las parejas han sido encontradas.
- Si el juego ha terminado, muestra el componente `PopUp` con un mensaje de victoria.

## 8. Reiniciar el Juego
- Implementa la lógica para reiniciar el juego:
  - Mezclar las cartas nuevamente.
  - Restablecer el estado del juego (turnos, parejas encontradas, etc.).

## 9. Estilos
- Usa el archivo `parejas.css` para estilizar los componentes.
- Asegúrate de que las cartas tengan un diseño atractivo y que el tablero sea responsivo.

## 10. Pruebas y Mejoras
- Prueba el juego para asegurarte de que la lógica funciona correctamente.
- Considera agregar animaciones al voltear las cartas o al mostrar el mensaje de victoria.

---

## Recursos Útiles
- **Hooks de React**: `useState`, `useEffect`.
- **Props**: Para pasar datos entre componentes.
- **Eventos**: Usa `onClick` para manejar interacciones.

---

## Flujo de Trabajo
1. En `App.jsx`, inicializa el estado del juego y pasa los datos necesarios a los componentes.
2. En `Board.jsx`, renderiza las filas y las cartas basándote en el estado.
3. En `Card.jsx`, maneja el evento de clic para voltear la carta y verificar parejas.
4. En `Controls.jsx`, muestra el marcador y el botón de reinicio.
5. En `PopUp.jsx`, muestra el mensaje de victoria cuando el juego termine.

¡Buena suerte y diviértete practicando!