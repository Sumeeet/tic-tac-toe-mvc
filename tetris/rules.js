exports.rules = (() => {
  // public api's
  const isValidBoard = (width, height) => width !== height

  const isValidMove = (row, col, symbolMatrix, boardMatrix) => {
    return symbolMatrix.every((srow, ri) => {
      return srow.every((value, ci) => {
        return (value === 0 || boardMatrix[row + ri][col + ci] === 0)
      })
    })
  }

  const canRowCollapse = row => row.every(value => value !== 0)

  return { isValidBoard, isValidMove, canRowCollapse }
})()
