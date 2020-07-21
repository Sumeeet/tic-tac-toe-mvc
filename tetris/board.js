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

  // blocks are placed bottom up.
  let currentRow = board.length

  const isBoardEmty = () => board.length === 0

  const makeMove = (col, symbolMatrix) => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    if (currentRow < 0) {
      console.error(`Board is full ${print()}. Initialize board first.`)
      return
    }

    const symbWidth = symbolMatrix[0].length
    if (col + symbWidth > board[0].length) {
      console.error(`Block crosses the board boundary. Valid limits are from 0, ${board[0].length - 1}`)
      return
    }
    const symbHeight = symbolMatrix.length
    let startRow = currentRow - symbHeight
    const getBoardMatrix = (start, current) => board.slice(start, current).map(row => row.slice(col, symbWidth))
    let boardMatrix = getBoardMatrix(startRow, currentRow)
    if (!rules.isValidMove(symbolMatrix, boardMatrix)) {
      --startRow
      --currentRow
    }

    const addRows = (row1, row2) => {
      const row = []
      for (let index = 0; index < row1.length; ++index) {
        row.push(row1[index] + row2[index])
      }
      return row
    }

    boardMatrix = getBoardMatrix(startRow, currentRow)
    for (let rowIndex = startRow, sIndex = 0; rowIndex < currentRow; ++rowIndex, ++sIndex) {
      board[rowIndex].splice(col, symbWidth, ...addRows(symbolMatrix[sIndex], boardMatrix[sIndex]))
    }

    currentRow -= symbHeight - 1
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
