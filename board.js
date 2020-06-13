/* eslint-disable no-unused-vars */
exports.board = () => {
  let board = []
  let defaultCellValue
  let boardDimension = 0

  function isBoardEmty () { return boardDimension === 0 }

  function getRow (index) { return board.slice(index * boardDimension, index * boardDimension + boardDimension) }

  return {
    /**
     * Initialize the board with desired dimension i.e. if dimension is 3 then board will be 3X3
     * and shall have 9 cells.
     * @param {number} dimension dimension specifies the board size.
     * @param {number} defaultState defaultState is a 1-dim array of default board state
     */
    initialize: function (dimension, defaultValue) {
      const dim = parseInt(dimension)
      if (isNaN(dim)) {
        console.error(`${dimension} : is not a valid number`)
        return
      }

      defaultCellValue = defaultValue
      boardDimension = dimension
      board = Array(dimension * dimension).fill(defaultValue)
    },

    /**
     * Place appropriate values at board cell
     * @param {number} index index is a position in 1-dim array
     * @param {number} value value to be stored at array index
     */
    makeMove: function (index, value) {
      if (isBoardEmty()) {
        console.error(`${board} : Empty borad. Initialize board first.`)
      }
    },

    /**
     * Reset board to default state
     */
    reset: () => { board = Array(boardDimension * boardDimension).fill(defaultCellValue) },

    /**
     * Print the board on console
     */
    print: function () {
      if (isBoardEmty()) {
        console.error(`${board} : Empty borad. Initialize board first.`)
        return
      }

      const getEmptyRow = (nCells, cellLayout) => {
        if (nCells === 0) return cellLayout
        return cellLayout + getEmptyRow(nCells - 1, cellLayout)
      }

      for (let index = 0; index < boardDimension; index++) {
        console.log(` ${getRow(index).reduce((accum, value) => `${accum} | ${value}`)} |`)
        console.log(getEmptyRow(boardDimension - 1, '---|'))
      }

      console.log('')
    }
  }
}
