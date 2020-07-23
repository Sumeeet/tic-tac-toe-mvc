exports.rules = ((symbols) => {
  const isValidBoard = (width, height) => width !== height

  // public api's
  // const IsValidCell = cellIndex => cellIndex >= 0 && cellIndex < width * height

  const canIntersect = (symbolMatrix, boardMatrix) => {
    const symbolSize = symbolMatrix.length * symbolMatrix[0].length
    const boardSize = boardMatrix.length * boardMatrix[0].length
    if (symbolSize !== boardSize) return false

    const isRowIntersect = (row1, row2) => {
      for (let index = 0; index < row1.length; ++index) {
        if ((row1[index] === 0 && row2[index] !== 0) ||
        (row1[index] !== 0 && row2[index] === 0) ||
        (row1[index] === 0 && row2[index] === 0)) continue
        else return true
      }
      return false
    }

    for (let index = 0; index < symbolMatrix.length; ++index) {
      if (isRowIntersect(symbolMatrix[index], boardMatrix[index])) return true
    }
    return false
  }

  const canRowCollapse = row => !row.some(value => value === 0)

  return { isValidBoard, canIntersect, canRowCollapse }
})(require('../tetris/symbols').symbols)
