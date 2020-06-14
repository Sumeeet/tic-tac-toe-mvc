exports.board = (dimension, rules) => {
  let board = [];

  // Initialize board
  (() => {
    const dim = parseInt(dimension)
    if (isNaN(dim)) {
      console.error(`${dimension} is not a valid number`)
      return
    }

    board = Array(dimension * dimension).fill(' ')
  })()

  function isBoardEmty () { return dimension === 0 }

  function getRow (index) { return board.slice(index * dimension, index * dimension + dimension) }

  function IsValidIndex (index) { return (index >= 0 && index < dimension * dimension) }

  return {

    /**
     * Place appropriate values at board cell
     * @param {number} index index is a position in 1-dim array
     * @param {number} value value to be stored at array index
     */
    makeMove: (index, value) => {
      if (isBoardEmty()) {
        console.error(`Empty borad ${board}. Initialize board first.`)
        return
      }

      if (!IsValidIndex(index)) {
        console.error(`Invalid cell index ${index}. Valid index is from 0 to ${dimension * dimension - 1}`)
        return
      }

      rules.move(index, value, board)
    },

    /**
     * Reset board to default state
     */
    reset: () => { board = Array(dimension * dimension).fill(' ') },

    /**
     * Print the board on console
     */
    print: () => {
      if (isBoardEmty()) {
        console.error(`Empty borad ${board}. Initialize board first.`)
        return
      }

      const getEmptyRow = (nCells, cellLayout) => {
        if (nCells === 0) return cellLayout
        return cellLayout + getEmptyRow(nCells - 1, cellLayout)
      }

      for (let index = 0; index < dimension; index++) {
        console.log(` ${getRow(index).reduce((accum, value) => `${accum} | ${value}`)} |`)
        console.log(getEmptyRow(dimension - 1, '---|'))
      }

      console.log('')
    }
  }
}
