const Constants = require('../tetris/constants')

exports.board = (width, height, rules, offset = 1) => {
  const board = Array.from({ length: height }, () => Array(width).fill(0))

  const keepWithinBoard = (block) => {
    const boardLeftEdge = 0
    const boardRightEdge = width - 1
    const symbolWidth = block.size.width
    const column = Math.min(Math.max(boardLeftEdge, block.position.column), boardRightEdge)
    if (column + symbolWidth > width) {
      block.position.column = width - symbolWidth
    }
  }

  const collapseRow = () => {
    board.map(row => {
      if (rules.canRowCollapse(row)) {
        board.splice(board.indexOf(row), 1)
        board.unshift(Array(width).fill(0))
      }
    })
  }

  // const merge = (row1, row2) => {
  //   const row = []
  //   for (let index = 0; index < row1.length; ++index) {
  //     row.push(row1[index] + row2[index])
  //   }
  //   return row
  // }

  // public api's
  const isBoardEmty = () => board.length === 0

  const isBoardFull = () => board[offset].some(cell => cell !== 0)

  // TODO: use row as parameter too
  const moveBlock = (block) => {
    if (isBoardEmty()) {
      console.error(`Empty board ${board}. Initialize board first.`)
      return false
    }

    if (isBoardFull()) {
      console.error('Board is full. Reset the board.')
      return false
    }

    keepWithinBoard(block)

    let row = offset
    const symbolHeight = block.size.height
    while (row + symbolHeight <= height && rules.isValidMove(row, block.position.column, block, board)) {
      block.position.row = row
      row = row + 1
    }

    block.matrix.forEach((srow, ri) => {
      srow.forEach((value, ci) => {
        board[block.position.row + ri][block.position.column + ci] += block.matrix[ri][ci]
      })
    })

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

  return { moveBlock, clear, print, isBoardFull }
}
