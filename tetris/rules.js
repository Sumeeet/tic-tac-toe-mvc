exports.rules = ((symbols) => {
  const isValidBoard = (width, height) => width !== height

  // public api's
  // const IsValidCell = cellIndex => cellIndex >= 0 && cellIndex < width * height

  const isValidMove = (value) => value === 0

  return { isValidBoard, isValidMove }
})(require('../tetris/symbols').symbols)
