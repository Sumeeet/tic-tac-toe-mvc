import { Model } from './model'
import { View } from './view'

class Controller {
  constructor (model, view) {
    this.ResetBoard(model, view)

    view.InitializeCellHandlers((cellId) => {
      const state = model.MarkCell(cellId)
      view.MarkCell(cellId, state)
    })

    view.InitializeButtonHandler(() => {
      this.ResetBoard(model, view)
    })
  }

  ResetBoard (model, view) {
    const player = model.ResetBoard()
    view.ResetBoard(player)
  }
}

// eslint-disable-next-line no-unused-vars
const app = new Controller(new Model(), new View())
