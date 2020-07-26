exports.rules = ((symbols) => {
  const canCellIntersect = (cell1, cell2) => !(cell1 === 0 || cell2 === 0)

  const canRowIntersect = (row1, row2, index = 0) => {
    if (index > row1.length - 1) return false

    if (canCellIntersect(row1[index], row2[index])) return true
    return canRowIntersect(row1, row2, index + 1)
  }

  // public api's
  const isValidBoard = (width, height) => width !== height

  const canIntersect = (symbolMatrix, boardMatrix, index = 0) => {
    if (index > symbolMatrix.length - 1) return false

    if (canRowIntersect(symbolMatrix[index], boardMatrix[index])) return true
    return canIntersect(symbolMatrix, boardMatrix, index + 1)
  }

  const canRowCollapse = row => row.every(value => value > 0)

  return { isValidBoard, canIntersect, canRowCollapse }
})(require('../tetris/symbols').symbols)
