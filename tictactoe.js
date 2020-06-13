/* eslint-disable no-unused-vars */
const Board = () => {
    const board = []
  
    // There can be maximum 8 states in a 3X3 matrix 3 rows, 3 columns and 2 diagonals.
    // if any of the triplet are either 0 or 1 then respective player wins
    const triplets = [
      [0, 1, 2], // row 0
      [3, 4, 5], // row 1
      [6, 7, 8], // row 2
      [0, 3, 6], // column 0
      [1, 4, 7], // column 1
      [2, 5, 8], // column 2
      [0, 4, 8], // diagonal 0
      [2, 4, 6] // diagonal 1
    ]
  
    function IsValidIndex (index) { return (index >= 0 && index <= 8) }
  
    function IsBoardEmty () { return board.length === 0 }
  
    function GetCellPos (index) { return [parseInt(index / 3, 10), index % 3] }
  
    function GetVaueAt (index) {
      const [row, col] = GetCellPos(index)
      return board[row][col]
    }
  
    function SetValueAt (index, val) {
      const [row, col] = GetCellPos(index)
      board[row][col] = val
    }
  
    function IsWin () {
      const valueTriplets = triplets.map((triplet) => triplet.map((index) => GetVaueAt(index)))
      const tripletSum = valueTriplets.map((triplet) => triplet.reduce((accum, curVal) => accum + curVal))
      return tripletSum.some((val) => val === 3 || val === 12)
    }
  
    function IsTie () {
      // return true if all the cells are occupied by valid value
      const valueTriplets = triplets.slice(0, 3).map((triplet) => triplet.map((index) => GetVaueAt(index)))
      const emptyCellRow = valueTriplets.map((triplet) => triplet.some((val) => val === 0))
      return emptyCellRow.filter((val) => val === true).length === 0
    }
  
    return {
      /**
       * Initialize the board with desired dimension i.e. if dimension is 3 then board will be 3X3
       * and shall have 9 cells.
       * @param {number} dimension dimension specifies the board size.
       */
      Initialize: function (dimension, initialValue) {
        const dim = parseInt(dimension)
        if (NaN(dim)) {
          console.error(`${dimension} : is not a valid number`)
          return
        }
  
        if (dimesnions.indexOf(dim) === -1) {
          console.error(`${dimension} : is not supported. Supported dimensions are ${this.dimensions.toString()}`)
          return
        }
        this.board.fill(initialValue)
      },
  
      /**
       * 
       * @param {number} index 
       * @param {number} value 
       */
      MakeMove: function (index, value) {
        this.Initialize()
        if (IsBoardEmty()) {
          console.error(`${board} : Empty borad. Initialize board first.`)
          return
        }
  
        if (!IsValidIndex(index)) return
  
        // cell already occupied
        if (GetVaueAt(index) !== 0) return
  
        SetValueAt(index, (value === 'X' ? 4 : 1))
  
        const winner = IsWin()
        if (winner) return winner
        else return IsTie()
      },
  
      Reset: () => board.forEach((arr) => arr.fill(0, 0)),
  
      Print: () => {
        if (IsBoardEmty()) {
          console.error(`${board} : Empty borad. Initialize board first.`)
          return
        }
  
        console.log(` ${board[0][0]} | ${board[0][1]} | ${board[0][2]} `)
        console.log('---|---|---')
        console.log(` ${board[1][0]} | ${board[1][1]} | ${board[1][2]} `)
        console.log('---|---|---')
        console.log(` ${board[2][0]} | ${board[2][1]} | ${board[2][2]} `)
        console.log('')
      }
    }
  }
  