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

  const withinBoardBounds = (column, symbolMatrix) => {
    const boardRightEdge = board[0].length - 1
    const boardLeftEdge = 0
    const symbolWidth = symbolMatrix[0].length
    column = Math.max(boardLeftEdge, column)
    column = Math.min(column, boardRightEdge)

    if (column + symbolWidth > boardRightEdge) {
      // bring column within limits
      column -= boardRightEdge - symbolWidth
    }
    return column
  }

  const merge = (row1, row2) => {
    const row = []
    for (let index = 0; index < row1.length; ++index) {
      row.push(row1[index] + row2[index])
    }
    return row
  }

  // public api's
  const isBoardEmty = () => board.length === 0

  const makeMove = (column, symbolMatrix) => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    const boundedColumn = withinBoardBounds(column, symbolMatrix)

    const symbHeight = symbolMatrix.length
    const symbWidth = symbolMatrix[0].length

    const getBoardMatrix = (startRow, endRow) => board.slice(startRow, endRow).map(row => row.slice(boundedColumn, boundedColumn + symbWidth))

    let startRow = 0
    let endRow = startRow + symbHeight
    while (endRow <= board.length) {
      const boardMatrix = getBoardMatrix(startRow, endRow)
      if (rules.canIntersect(symbolMatrix, boardMatrix)) break
      startRow = startRow + 1
      endRow = startRow + symbHeight
    }

    startRow = startRow - 1
    endRow = startRow + symbHeight
    let index = 0
    let rowIndex = startRow
    while (rowIndex < endRow && rowIndex >= 0) {
      const boardMatrix = getBoardMatrix(startRow, endRow)
      board[rowIndex].splice(boundedColumn, symbWidth, ...merge(symbolMatrix[index], boardMatrix[index]))
      ++rowIndex
      ++index
    }

    board.map(row => {
      if (rules.canRowCollapse(row)) {
        board.splice(board.indexOf(row), 1)
        board.splice(0, 0, Array(row.length).fill(0))
      }
    })
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
      const rowSymbols = board[index].map(value => symbols.getSymbol(value))
      console.log(` ${rowSymbols.reduce((accum, value) => `${accum} | ${value}`)}`)

      if (index < height - 1) {
        const emptyRow = getEmptyRow(width, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log('')
  }

  return { makeMove, clear, print }
}
