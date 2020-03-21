class Model {
  constructor () {
    // initialize board
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    this.symbolX = 'X'
    this.symbolO = 'O'

    // Player1 maps "X" => 4 and Player2 maps "0" => 1
    this.playerMap = { X: 4, O: 1 }

    // There can be maximum 8 states in a 3X3 matrix 3 rows, 3 columns and 2 diagonals.
    // To win a game any state should either have all "X" or "O".
    // gameState represent these state, index 0,1,2 are rows, 2,3,4 are columns, 5,6 are diagonals
    // To win, any index in gameState either has a value of 12(4+4+4) or 3(1+1+1)
    // for example for Player1 to win, if all the cell in the first row are "X" => 4
    // then sum of all the values at index 0,1,2 shall be 12 set at index 0 in gameState
    this.subMatrixSum = [0, 0, 0, 0, 0, 0, 0, 0]

    // if any of the sub matrix cells are either all 0's or all 1's
    // then respective player wins
    this.subMatrix = [
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
      Ready: 0, Progress: 1, Finished: 2, Error: 3
    }
    this.currentBoardState = this.boardStates.Ready
  }

  MakeMove (index, symbol) {
    if (this.currentBoardState === this.boardStates.Finished) {
      console.log('Game already over. Reset to start again')
      return this.currentBoardState
    }

    this.currentBoardState = this.boardStates.Progress

    if (!this.IsValidBoardCell(index)) return false

    const cellValue = this.GetVaueAt(index)
    if (cellValue !== 0) {
      console.log(`Cell is already occupied by ${this.GetPlayer(cellValue)}`)
      this.currentBoardState = this.boardStates.Error
      return this.currentBoardState
    }

    const symbolValue = this.GetPlayerValue(symbol)
    if (symbolValue === 0) {
      this.currentBoardState = this.boardStates.Error
      return this.currentBoardState
    }

    this.SetValueAt(index, symbolValue)

    const sum = (matrix) => {
      let accum = 0
      matrix.forEach(element => { accum += this.GetVaueAt(element) })
      return accum
    }

    const rowIndex = this.GetRowIndex(index)
    const colIndex = this.GetColIndex(index)

    this.subMatrixSum[rowIndex] = sum(this.subMatrix[rowIndex])

    this.subMatrixSum[colIndex + 3] = sum(this.subMatrix[colIndex + 3])

    if (index % 2 === 0) {
      const leftDiagonal = this.subMatrix[6]
      if (leftDiagonal.indexOf(index) !== -1) {
        this.subMatrixSum[6] = sum(leftDiagonal)
      }

      const rightDiagonal = this.subMatrix[7]
      if (rightDiagonal.indexOf(index) !== -1) {
        this.subMatrixSum[7] = sum(rightDiagonal)
      }
    }

    if (this.subMatrixSum.some((val) => val === 3 || val === 12)) {
      console.log(`${symbol} won the game`)
      this.currentBoardState = this.boardStates.Finished
      return this.currentBoardState
    }

    return this.currentBoardState
  }

  ResetBoard () {
    this.board.fill([0, 0, 0], 0)
    this.currentBoardState = this.boardStates.Ready
  }

  // eslint-disable-next-line class-methods-use-this
  IsValidBoardCell (index) {
    if (index < 0 || index > 8) {
      console.error(`${index} : Cell should be in range 0 to 8`)
      return false
    }
    return true
  }

  GetPlayer (cellValue) {
    if (cellValue !== this.playerMap.X && cellValue !== this.playerMap.O) {
      console.error(`Invalid symbol ${cellValue}. Valid symbols are ${this.playerMap.X} and ${this.playerMap.O}`)
      return ''
    }
    return Object.keys(this.playerMap).find((key) => this.playerMap[key] === cellValue)
  }

  GetPlayerValue (symbol) {
    if (symbol !== this.symbolX && symbol !== this.symbolO) {
      console.error(`Invalid symbol ${symbol}. Valid symbols are ${this.symbolX} and ${this.symbolO}`)
      return 0
    }

    return this.playerMap[symbol]
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
}

module.exports = Model
