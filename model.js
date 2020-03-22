class Model {
  constructor () {
    // initialize board
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    this.symbolX = 'X'
    this.symbolO = 'O'
    this.player = this.symbolX

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
      Ready: 0, Progress: 1, Finished: 2, Tie: 3
    }
    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.player, Message: `Player ${this.symbolX} turn` }
  }

  MakeMove (index) {
    switch (this.currentBoardState.BoardState) {
      case this.boardStates.Ready:
        this.currentBoardState.BoardState = this.boardStates.Progress
        this.MarkCell(index)
        break
      case this.boardStates.Progress:
        this.MarkCell(index)
        break
      case this.boardStates.Tie:
        this.currentBoardState.Message = 'Its a Tie. Reset to play again'
        break
      case this.boardStates.Finished:
        this.currentBoardState.Message = 'Game over. Reset to play again.'
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
      this.currentBoardState.Message = `Cell is already occupied by ${this.GetPlayer(cellValue)}`
      return
    }

    const symbolValue = this.GetPlayerValue(this.player)
    if (symbolValue === 0) { return }

    const sum = (matrix) => {
      let accum = 0
      matrix.forEach(element => { accum += this.GetVaueAt(element) })
      return accum
    }

    if (this.subMatrixSum.filter((val) => val === 0).length === 0) {
      // its a tie
      this.currentBoardState.BoardState = this.boardStates.Tie
      return
    }

    this.SetValueAt(index, symbolValue)

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
      // game finished
      this.currentBoardState.Message = `${this.player} won the game`
      this.currentBoardState.BoardState = this.boardStates.Finished
      return
    }

    this.player = (this.player === this.symbolX) ? this.symbolO : this.symbolX
    this.boardStates.Message = `Player ${this.player} turn`
  }

  ResetBoard () {
    this.board.forEach((arr) => arr.fill(0, 0))
    this.subMatrixSum.fill(0, 0)
    this.player = this.symbolX
    this.currentBoardState = { BoardState: this.boardStates.Ready, Player: this.player, Message: `Player ${this.symbolX} turn` }
    return this.currentBoardState
  }

  IsValidBoardCell (index) {
    if (index < 0 || index > 8) {
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

export default Model
