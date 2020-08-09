/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// const Constants = require('../tetris/constants')

const Board = (width = 10, height = 20, offset = 1) => {
  let state = BoardSates.Ready
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

  const collapse = () => {
    board.map(row => {
      if (canRowCollapse(row)) {
        board.splice(board.indexOf(row), 1)
        board.unshift(Array(width).fill(0))
      }
    })
  }

  const merge = (block) => {
    block.matrix.forEach((row, ri) => {
      row.forEach((value, ci) => {
        board[block.position.row + ri][block.position.column + ci] += value
      })
    })
  }

  const isBlockFloat = (block) => block.position.row + block.size.height < height

  const isValidBoard = (width, height) => width !== height

  const isValidMove = (row, column, block) => {
    return block.matrix.every((srow, ri) => {
      return srow.every((value, ci) => {
        return (value === 0 || board[row + ri][column + ci] === 0)
      })
    })
  }

  const canRowCollapse = row => row.every(value => value !== 0)

  // public api's
  const isBoardEmpty = () => board.length === 0

  const isBoardFull = () => board[offset].some(cell => cell !== 0)

  const moveBlock = (block) => {
    if (isBoardFull()) {
      console.error('Board is full. Reset the board.')
      state = BoardSates.Full
      return
    }

    keepWithinBoard(block)

    const row = block.position.row + offset
    const column = block.position.column
    if (isBlockFloat(block) && isValidMove(row, column, block)) {
      block.position.row = row
      block.position.column = column
      state = BoardSates.BlockInMotion
    } else {
      merge(block)
      collapse()
      state = BoardSates.BlockPlaced
    }
  }

  const clear = () => {
    state = BoardSates.Ready
    board.forEach((row) => row.fill(0, 0))
  }

  const getState = () => state

  const setState = (newState) => { state = newState }

  const print = () => {
    if (isBoardEmpty()) {
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
      const rowSymbols = board[index].map(value => SYMBOLS[value])
      console.log(` ${rowSymbols.reduce((accum, value) => `${accum} | ${value}`)}   ${index}`)

      if (index < height - 1) {
        const emptyRow = getEmptyRow(width, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log('')
  }

  return { moveBlock, clear, print, isBoardFull, state, board, getState, setState }
}
