/* eslint-disable no-undef */
'use strict'

let block, context, nextContext // , oldTimeStamp, fps
let requestId = null
const board = Board()

window.onload = () => {
  // get reference to canvas context
  const canvas = document.getElementById('boardcanvas')
  context = canvas.getContext('2d')
  context.scale(20, 20)
  const nextcanvas = document.getElementById('nextcanvas')
  nextContext = nextcanvas.getContext('2d')
  nextContext.scale(20, 20)
  addEventListeners()
}

const play = (event) => {
  window.requestAnimationFrame(gameLoop)
}

const reset = () => {
  board.clear()
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  cancelAnimationFrame(requestId)
  requestId = null
}

const pause = () => {
  cancelAnimationFrame(requestId)
  requestId = null

  context.fillStyle = 'black'
  context.fillRect(1, 3, 8, 1.2)
  context.font = '1px Arial'
  context.fillStyle = 'yellow'
  context.fillText('PAUSED', 3, 4)
}

const gameLoop = (timestamp = 0) => {
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
  requestId = window.requestAnimationFrame(gameLoop)
}

const addEventListeners = () => {
  const playElement = document.getElementById('play')
  playElement.addEventListener('click', event => { play() })

  const pauseElement = document.getElementById('pause')
  pauseElement.addEventListener('click', event => { pause() })

  const resetElement = document.getElementById('reset')
  resetElement.addEventListener('click', event => { reset() })
}
