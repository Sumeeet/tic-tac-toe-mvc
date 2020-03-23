/* eslint-disable no-unused-vars */
class Model {
  constructor () {
    // initialize board
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    this.symbolX = 'X'
    this.symbolO = 'O'
    this.symbol = this.symbolX

    this.symbolMap = { X: 4, O: 1 }

    // There can be maximum 8 states in a 3X3 matrix 3 rows, 3 columns and 2 diagonals.
    // if any of the triplet are either 0 or 1 then respective player wins
    this.triplets = [
      [0, 1, 2], // row 0
      [3, 4, 5], // row 1
      [6, 7, 8], // row 2
      [0, 3, 6], // column 0
      [1, 4, 7], // column 1
      [2, 5, 8], // column 2
      [0, 4, 8], // diagonal 0
      [2, 4, 6] // diagonal 1
    ]

    this.boardStates = {
      Ready: 0, Progress: 1, Finished: 2
    }
    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.symbol, Message: `Player ${this.symbolX} turn` }
  }

  MakeMove (index) {
    switch (this.currentBoardState.BoardState) {
      case this.boardStates.Ready:
        this.currentBoardState.BoardState = this.boardStates.Progress
        this.MarkCell(index)
        break
      case this.boardStates.Progress:
        this.currentBoardState.Player = this.symbol
        this.MarkCell(index)
        break
      default:
        break
    }
    return this.currentBoardState
  }

  MarkCell (index) {
    if (!this.IsValidBoardCell(index)) {
      this.currentBoardState.Message = `${index} : Cell should be in range 0 to 8`
      return
    }

    const cellValue = this.GetVaueAt(index)
    if (cellValue !== 0) {
      this.currentBoardState.Message = `Cell is already occupied by ${this.GetSymbol(cellValue)}`
      return
    }

    const symbolValue = this.GetSymbolValue(this.symbol)
    if (symbolValue === 0) { return }

    this.SetValueAt(index, symbolValue)
    if (this.IsWin()) { return } else if (this.IsTie()) { return }
    this.symbol = (this.symbol === this.symbolX) ? this.symbolO : this.symbolX
    this.currentBoardState.Message = `Player ${this.symbol} turn`
  }

  ResetBoard () {
    this.board.forEach((arr) => arr.fill(0, 0))
    this.symbol = this.symbolX
    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.symbol, Message: `Player ${this.symbolX} turn` }
    return this.currentBoardState
  }

  IsValidBoardCell (index) {
    return (index >= 0 && index <= 8)
  }

  GetSymbol (cellValue) {
    if (cellValue !== this.symbolMap.X && cellValue !== this.symbolMap.O) {
      console.error(`Invalid symbol ${cellValue}. Valid symbols are ${this.symbolMap.X} and ${this.symbolMap.O}`)
      return ''
    }
    return Object.keys(this.symbolMap).find((key) => this.symbolMap[key] === cellValue)
  }

  GetSymbolValue (symbol) {
    if (symbol !== this.symbolX && symbol !== this.symbolO) {
      console.error(`Invalid symbol ${symbol}. Valid symbols are ${this.symbolX} and ${this.symbolO}`)
      return 0
    }
    return this.symbolMap[symbol]
  }

  GetRowIndex (cellIndex) {
    return parseInt(cellIndex / 3, 10)
  }

  GetColIndex (cellIndex) {
    return cellIndex % 3
  }

  GetVaueAt (cellIndex) {
    const rowIndex = this.GetRowIndex(cellIndex)
    const colIndex = this.GetColIndex(cellIndex)
    return this.board[rowIndex][colIndex]
  }

  SetValueAt (cellIndex, val) {
    const rowIndex = this.GetRowIndex(cellIndex)
    const colIndex = this.GetColIndex(cellIndex)
    this.board[rowIndex][colIndex] = val
  }

  IsWin () {
    const valueTriplets = this.triplets.map((triplet) => triplet.map((index) => this.GetVaueAt(index)))
    const tripletSum = valueTriplets.map((triplet) => triplet.reduce((accum, curVal) => accum + curVal))

    if (tripletSum.some((val) => val === 3 * this.symbolMap.O || val === 3 * this.symbolMap.X)) {
      this.currentBoardState.Message = `${this.symbol} won the game. Reset to play again.`
      this.currentBoardState.BoardState = this.boardStates.Finished
      return true
    }
    return false
  }

  IsTie () {
    const valueTriplets = this.triplets.slice(0, 3).map((triplet) => triplet.map((index) => this.GetVaueAt(index)))
    const emptyCellRow = valueTriplets.map((triplet) => triplet.some((val) => val === 0))
    if (emptyCellRow.filter((val) => val === true).length === 0) {
      this.currentBoardState.BoardState = this.boardStates.Finished
      this.currentBoardState.Message = 'Its a Tie. Reset to play again'
      return true
    }
    return false
  }
}
module.exports = Model
