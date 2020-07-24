exports.board = (width, height, offset, symbols, rules) => {
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
    const boardLeftEdge = 0
    const boardRightEdge = width - 1
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

  const collapseRow = () => {
    board.map(row => {
      if (rules.canRowCollapse(row)) {
        board.splice(board.indexOf(row), 1)
        board.splice(0, 0, Array(row.length).fill(0))
      }
    })
  }

  // public api's
  const isBoardEmty = () => board.length === 0

  const isBoardFull = () => board[offset].some(cell => cell !== 0)

  const makeMove = (column, symbolMatrix) => {
    if (isBoardEmty()) {
      console.error(`Empty board ${board}. Initialize board first.`)
      return false
    }

    if (isBoardFull()) {
      console.error('Board is full. Reset the board.')
      print()
      return false
    }

    const boundedColumn = withinBoardBounds(column, symbolMatrix)

    const symbHeight = symbolMatrix.length
    const symbWidth = symbolMatrix[0].length

    let startRow = offset
    let endRow = startRow + symbHeight
    while (endRow <= board.length) {
      const boardMatrix = board.slice(startRow, endRow).map(row => row.slice(boundedColumn, boundedColumn + symbWidth))
      if (rules.canIntersect(symbolMatrix, boardMatrix)) break
      startRow = startRow + 1
      endRow = startRow + symbHeight
    }

    // update board
    startRow = startRow - 1
    endRow = startRow + symbHeight - 1
    let index = symbHeight - 1
    const boardMatrix = board.slice(startRow, endRow + 1).map(row => row.slice(boundedColumn, boundedColumn + symbWidth))
    while (endRow >= startRow) {
      board[endRow].splice(boundedColumn, symbWidth, ...merge(symbolMatrix[index], boardMatrix[index]))
      --endRow
      --index
    }

    collapseRow()
    return true
  }

  const clear = () => { board.forEach((row) => row.fill(0, 0)) }

  const print = () => {
    if (isBoardEmty()) {
      console.error(`Empty board ${board}. Initialize board first.`)
      return
    }

    const getEmptyRow = (nCells, cellLayout, rowLayout) => {
      if (nCells === 0) return rowLayout
      return getEmptyRow(nCells - 1, cellLayout, rowLayout + cellLayout)
    }

    const row = [...board[0].keys()].map(cell => cell + 1)
    console.log(` ${row.reduce((accum, value) => `${accum}   ${value}`)}`)

    for (let index = offset; index < height; index++) {
      const rowSymbols = board[index].map(value => symbols.getSymbol(value))
      console.log(` ${rowSymbols.reduce((accum, value) => `${accum} | ${value}`)}   ${index}`)

      if (index < height - 1) {
        const emptyRow = getEmptyRow(width, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log('')
  }

  return { makeMove, clear, print, isBoardFull }
}
