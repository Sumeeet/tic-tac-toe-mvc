exports.board = (dimension) => {
  let board = []
  const symbols = ['X', 'O']
  const symbolMap = { X: 4, O: 1 };

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

  function IsValidIndex (index) { return (index >= 0 && index < dimension * dimension) }

  function getRow (index) { return board.slice(index * dimension, index * dimension + dimension) }

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

      if (board[index] !== ' ') {
        console.error(`cell index ${index} is already occupied`)
        return
      }

      if (symbols.indexOf(value) === -1) {
        console.error(`Invalid symbol ${value}. Valid symbols are ${symbols.toString()}`)
        return
      }

      board[index] = symbolMap[value]
      console.log(`value at index[${index}] is ${board[index]}`)
    },

    /**
     * clear board
     */
    clear: () => { board = Array(dimension * dimension).fill(' ') },

    /**
     * Print the board on console
     */
    print: () => {
      if (isBoardEmty()) {
        console.error(`Empty borad ${board}. Initialize board first.`)
        return
      }

      const getEmptyRow = (nCells, cellLayout, rowLayout) => {
        if (nCells === 0) return rowLayout
        return getEmptyRow(nCells - 1, cellLayout, rowLayout + cellLayout)
      }

      for (let index = 0; index < dimension; index++) {
        console.log(` ${getRow(index).reduce((accum, value) => `${accum} | ${value}`)} |`)
        console.log(getEmptyRow(dimension, '---|', ''))
      }

      console.log('')
    }
  }
}
