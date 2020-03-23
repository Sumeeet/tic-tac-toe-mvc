/* eslint-disable no-undef */
// import Model from './model'
// import View from './view'

class Controller {
  constructor (model, view) {
    this.ResetBoard(model, view)

    view.InitializeCellHandlers((cellIndex) => {
      const state = model.MakeMove(cellIndex)
      view.MakeMove(cellIndex, state)
    })

    view.InitializeButtonHandler(() => {
      this.ResetBoard(model, view)
    })
  }

  ResetBoard (model, view) {
    view.ResetBoard(model.ResetBoard())
  }
}

// eslint-disable-next-line no-unused-vars
const app = new Controller(new Model(), new View())
