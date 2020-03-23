/* eslint-disable no-unused-vars */
class View {
  InitializeCellHandlers (onCellClicked) {
    // intialize cell - <td> handlers
    const elements = document.querySelectorAll('.row')
    elements.forEach((e) => e.addEventListener('click', (event) => {
      if (event.target.className === 'cell') {
        onCellClicked(event.target.id)
      }
    }))
  }

  InitializeButtonHandler (onButtonClicked) {
    const button = document.querySelector('#button-reset')
    button.addEventListener('click', () => onButtonClicked())
  }

  MakeMove (cellId, state) {
    switch (state.BoardState) {
      case 1:
        // set cell with 'X' or 'O'
        document.getElementById(cellId).textContent = state.Player
        break
    }
    const player = document.querySelector('.player')
    player.textContent = state.Message
  }

  ResetBoard (state) {
    const rows = document.querySelectorAll('.row')
    rows.forEach(() => {
      const cells = document.querySelectorAll('.cell')
      cells.forEach((cell) => cell.textContent = '')
    })
    const player = document.querySelector('.player')
    player.textContent = state.Message
  }
}

// export default View
