/* eslint-disable no-undef */
'use strict'

let block, context, nextContext, oldTimeStamp, timeElapsed//, fps
const level = 400
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
  reset()
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
  oldTimeStamp = performance.now()
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
  timeElapsed = (timestamp - oldTimeStamp)

  if(timeElapsed > level) {
    oldTimeStamp = timestamp
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
  }
 
  
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

  document.addEventListener('keydown', handleKeyDownEvents)
}

const handleKeyDownEvents = (event) => {
  event.preventDefault();
  switch (event.code) {
    case "ArrowDown":
      if (board.isBlockFloat(block) && board.isValidMove(block.position.row + 1, block.position.column, block)) {
        block.position.row += 1
        board.keepWithinBoard(block)
      }      
      break
    case "ArrowLeft":
      block.position.column -= 1
      board.keepWithinBoard(block)
      break
    case "ArrowRight":
      block.position.column += 1
      board.keepWithinBoard(block)
      break
    case "ArrowUp":
      let clone = {...block}
      clone.symbolMatrix = block.rotate90ClockWise(block.symbolMatrix)
      clone.matrix = clone.getBoundedSymbolValue(clone.symbolMatrix)
      clone.updateSize(clone.matrix)
      block = clone
      board.keepWithinBoard(block)
      break
  }
}