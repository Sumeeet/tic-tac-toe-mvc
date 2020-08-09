/* eslint-disable no-undef */
'use strict'

let context, nextContext // , oldTimeStamp, fps
const board = Board()
let block

window.onload = () => {
  // get reference to canvas context
  const canvas = document.getElementById('boardcanvas')
  context = canvas.getContext('2d')
  context.scale(20, 20)
  const nextcanvas = document.getElementById('nextcanvas')
  nextContext = nextcanvas.getContext('2d')
  nextContext.scale(20, 20)
  window.requestAnimationFrame(gameLoop)
}

const gameLoop = (timestamp) => {
  if (board.isBoardFull()) return
  const state = board.getState()
  if (state === BoardSates.Ready) {
    block = Block()
    board.moveBlock(block)
  } else if (state === BoardSates.BlockInMotion) {
    board.moveBlock(block)
  } else if (state === BoardSates.BlockPlaced) {
    block = Block()
    board.setState(BoardSates.BlockInMotion)
  }
  // secondsPassed = (timestamp - oldTimeStamp) / 1000
  // oldTimeStamp = timestamp
  // fps = Math.round(1 / secondsPassed)
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  drawBlock(context, block)
  drawBoard(context, board.board)
  window.requestAnimationFrame(gameLoop)
}

const drawBlock = (context, block) => {
  // draw block
  const row = block.position.row
  const column = block.position.column
  block.matrix.forEach((srow, ri) => {
    srow.forEach((value, ci) => {
      if (value > 0) {
        context.fillStyle = COLORS[value]
        context.fillRect(column + ci, row + ri, 1, 1)
      }
    })
  })
}

const drawBoard = (context, board) => {
  board.forEach((row, ri) => {
    row.forEach((value, ci) => {
      if (value > 0) {
        context.fillStyle = COLORS[value]
        context.fillRect(ci, ri, 1, 1)
      }
    })
  })
}
