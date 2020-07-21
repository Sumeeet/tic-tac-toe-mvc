exports.rules = ((symbols) => {
  const isValidBoard = (width, height) => width !== height

  // public api's
  // const IsValidCell = cellIndex => cellIndex >= 0 && cellIndex < width * height

  const isValidMove = (symbolMatrix, boardMatrix) => {
    const symbolSize = symbolMatrix.length * symbolMatrix[0].length
    const boardSize = boardMatrix.length * boardMatrix[0].length
    if (symbolSize !== boardSize) return false
    const sum = matrix => matrix.map(row => row.reduce((accum, value) => accum + value))
    const symbolSum = sum(symbolMatrix)
    const boardSum = sum(boardMatrix)
    for (let index = 0; index < symbolSum.length; ++index) {
      if (symbolSum[index] + boardSum[index] > symbolMatrix[0].length) return false
    }
    return true
  }

  return { isValidBoard, isValidMove }
})(require('../tetris/symbols').symbols)
