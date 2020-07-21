exports.board = (width, height, symbols, rules) => {
  const board = [];
  (() => {
    if (!rules.isValidBoard(width, height)) {
      console.error(`Board dimensions ${width}, ${height} are not correct`)
      return
    }

    for (let h = 0; h < height; ++h) {
      const arr = new Array(width)
      board.push(arr.fill(0, 0))
    }
  })()

  const isBoardEmty = () => board.length === 0

  const makeMove = (col, symbolMatrix) => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    const symbHeight = symbolMatrix.length
    const symbWidth = symbolMatrix[0].length

    if (col + symbWidth > board[0].length) {
      console.error(`Block crosses the board boundary. Valid limits are from 0, ${board[0].length - 1}`)
      return
    }

    const getBoardMatrix = (start, current) => board.slice(start, current).map(row => row.slice(col, col + symbWidth))

    const addRows = (row1, row2) => {
      const row = []
      for (let index = 0; index < row1.length; ++index) {
        row.push(row1[index] + row2[index])
      }
      return row
    }

    let startRow = 0
    let endRow = startRow + symbHeight
    while (endRow <= board.length) {
      const boardMatrix = getBoardMatrix(startRow, endRow)
      if (!rules.isValidMove(symbolMatrix, boardMatrix)) break

      startRow = startRow + 1
      endRow = startRow + symbHeight
    }

    startRow = startRow - 1
    endRow = startRow + symbHeight
    let index = 0
    let rowIndex = startRow
    while (rowIndex < endRow && rowIndex >= 0) {
      const boardMatrix = getBoardMatrix(startRow, endRow)
      board[rowIndex].splice(col, symbWidth, ...addRows(symbolMatrix[index], boardMatrix[index]))
      ++rowIndex
      ++index
    }
  }

  const clear = () => { board.forEach((arr) => arr.fill(0, 0)) }

  const print = () => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    const getEmptyRow = (nCells, cellLayout, rowLayout) => {
      if (nCells === 0) return rowLayout
      return getEmptyRow(nCells - 1, cellLayout, rowLayout + cellLayout)
    }

    for (let index = 0; index < height; index++) {
      console.log(` ${board[index].reduce((accum, value) => `${accum} | ${value}`)}`)

      if (index < height - 1) {
        const emptyRow = getEmptyRow(width, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log('')
  }

  return { makeMove, clear, print }
}
