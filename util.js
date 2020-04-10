/* eslint-disable no-unused-vars */
const TicTakToeBoard = () => {
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
    //const valueTriplets = triplets.map((triplet) => triplet.map((index) => GetVaueAt(index)))
    const tripletSum = triplets.map((triplet) => triplet.reduce((accum, curVal) => accum + curVal))
    return tripletSum.some((val) => val === 3 || val === 12)
  }

  function IsTie () {
    const valueTriplets = triplets.slice(0, 3).map((triplet) => triplet.map((index) => GetVaueAt(index)))
    const emptyCellRow = valueTriplets.map((triplet) => triplet.some((val) => val === 0))
    return emptyCellRow.filter((val) => val === true).length === 0
  }

  return {

    Initialize: (board) => {
      // board should be 3X3 or in mutliple of 3 i.e. 9X9
      if(!Array.isArray(board)) {
        console.error(`${board} : is not a valid array. Valid array is of form [[0, 0, 0], [0, 0, 0], [0, 0, 0]]`)
        return
      }

      if(IsBoardEmty()) {
        console.error(`${board} : Empty borad. Initialize board first.`)
        return
      }

      this.board = board
    },

    MakeMove: (index, value) => {

      if(IsBoardEmty()) {
        console.error(`${board} : Empty borad. Initialize board first.`)
        return
      }

      if (!IsValidIndex(index)) return

      // cell already occupied
      if (GetVaueAt(index) !== 0) return

      SetValueAt(index, (value === 'X' ? 4 : 1))
      if (IsWin()) return
      IsTie()
    },

    Reset: () => board.forEach((arr) => arr.fill(0, 0)),

    Print: () => {

      if(IsBoardEmty()) {
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
