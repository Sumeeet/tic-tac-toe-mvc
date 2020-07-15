exports.rules = ((symbols) => {
  // There can be maximum 8 states in a 3X3 matrix 3 rows, 3 columns and 2 diagonals.
  // if any of the triplet are either 0 or 1 then respective player wins
  const triplets = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  // cell index to triplets index mapping
  const cellAdjacencyList = [[0, 3, 6], [0, 4], [0, 5, 7], [1, 3], [1, 4, 6, 7], [1, 5], [2, 3], [2, 4], [2, 5, 6]]

  const isValidBoard = (width, height) => width === height

  // public api's
  const isValidMove = (value) => value === 0

  const isWin = (getValues, index) => {
    const valueTriplets = cellAdjacencyList[index].map((index) => getValues(triplets[index]))
    const tripletSum = valueTriplets.map((triplet) => triplet.reduce((accum, curVal) => accum + curVal))
    const sum = (symbol) => 3 * symbols.getSymbolValue(symbol)
    return tripletSum.some((val) => val === sum('O') || val === sum('X'))
  }

  const isTie = (getValues, board, symbols) => {
    const valueTriplets = [0, 1, 2].map((index) => getValues(triplets[index]))
    const emptyCellRow = valueTriplets.map((triplet) => triplet.some((val) => val === 0))
    return emptyCellRow.filter((val) => val === true).length === 0
  }

  return { isValidBoard, isValidMove, isWin, isTie }
})(require('../tick-tac-toe/symbols').symbols)
