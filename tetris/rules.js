exports.rules = (() => {
  // public api's
  const isValidBoard = (width, height) => width !== height

  const isValidMove = (row, column, block, boardMatrix) => {
    return block.matrix.every((srow, ri) => {
      return srow.every((value, ci) => {
        return (value === 0 || boardMatrix[row + ri][column + ci] === 0)
      })
    })
  }

  const canRowCollapse = row => row.every(value => value !== 0)

  return { isValidBoard, isValidMove, canRowCollapse }
})()
