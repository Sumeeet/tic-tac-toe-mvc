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
  if (state === BOARDSTATES.Ready) {
    block = Block()
    board.moveBlock(block)
  } else if (state === BOARDSTATES.BlockInMotion) {
    board.moveBlock(block)
  } else if (state === BOARDSTATES.BlockPlaced) {
    block = Block()
    board.setState(BOARDSTATES.BlockInMotion)
  }
  // secondsPassed = (timestamp - oldTimeStamp) / 1000
  // oldTimeStamp = timestamp
  // fps = Math.round(1 / secondsPassed)
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  block.drawBlock(context)
  board.drawBoard(context)
  window.requestAnimationFrame(gameLoop)
}
