const Constants = require('../tetris/constants')

exports.board = (width, height, rules, offset = 1) => {
  const board = Array.from({ length: height }, () => Array(width).fill(0))

  const withinBoardBounds = (column, symbolMatrix) => {
    const boardLeftEdge = 0
    const boardRightEdge = width - 1
    const symbolWidth = symbolMatrix[0].length
    column = Math.max(boardLeftEdge, column)
    column = Math.min(column, boardRightEdge)

    if (column + symbolWidth > width) {
      // bring column within limits
      column = width - symbolWidth
    }
    return column
  }

  const collapseRow = () => {
    board.map(row => {
      if (rules.canRowCollapse(row)) {
        board.splice(board.indexOf(row), 1)
        board.unshift(Array(width).fill(0))
      }
    })
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

  const isBoardFull = () => board[offset].some(cell => cell !== 0)

  // TODO: use row as parameter too
  const makeMove = (column, symbolMatrix) => {
    if (isBoardEmty()) {
      console.error(`Empty board ${board}. Initialize board first.`)
      return false
    }

    if (isBoardFull()) {
      console.error('Board is full. Reset the board.')
      return false
    }

    column = withinBoardBounds(column, symbolMatrix)

    const symbHeight = symbolMatrix.length
    const symbWidth = symbolMatrix[0].length

    // TODO: improve block placement
    let startRow = offset
    let endRow = startRow + symbHeight
    while (endRow <= height) {
      if (!rules.isValidMove(startRow, column, symbolMatrix, board)) break
      startRow = startRow + 1
      endRow = startRow + symbHeight
    }

    // eslint-disable-next-line one-var
    // let validRow = offset, row = offset
    // while (isValid(row, column, symbolMatrix)) {
    //   validRow = row
    //   row = row + 1
    // }

    // update board
    // symbolMatrix.forEach((row, ri) => {
    //   row.forEach((value, ci) => {
    //     if (value > 0) {
    //       board[validRow + ri][column + ci] = value
    //     }
    //   })
    // })

    startRow = startRow - 1
    endRow = startRow + symbHeight - 1
    let index = symbHeight - 1
    const boardMatrix = board.slice(startRow, endRow + 1).map(row => row.slice(column, column + symbWidth))
    while (endRow >= startRow) {
      board[endRow].splice(column, symbWidth, ...merge(symbolMatrix[index], boardMatrix[index]))
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

    const row = [...board[0].keys()].map(cell => cell)
    console.log(` ${row.reduce((accum, value) => `${accum}   ${value}`)}`)

    for (let index = 0; index < height; index++) {
      const rowSymbols = board[index].map(value => Constants.VALUE_TO_SYMBOLS_MAP[value])
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
