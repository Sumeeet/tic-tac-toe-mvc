exports.rules = ((symbols) => {
  const isValidBoard = (width, height) => width !== height

  // public api's
  const isValidMove = (value) => value === 0

  const isWin = (getValues, index) => {
    return false
  }

  const isTie = (getValues, board, symbols) => {
    return false
  }

  return { isValidBoard, isValidMove, isWin, isTie }
})(require('../tetris/symbols').symbols)
