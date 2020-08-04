/* eslint-disable one-var */
const Constants = require('../tetris/constants')

exports.block = (symbol) => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row: 0, column: 3 }

  const getRandom = () => Math.floor(Math.random() * (symbols.length - 1 - 0)) + 0

  const compose = (a, b) => (value) => b(a(value))

  const transpose = (matrix) => {
    const rowToCol = (row, matrix) => row.map((cell, index) => matrix[index].push(cell))
    const transMatrix = matrix.map(row => [])
    matrix.map(row => rowToCol(row, transMatrix))
    return transMatrix
  }

  const flipVertical = matrix => matrix.reverse()

  const reverse = matrix => matrix.map(row => row.reverse())

  const rotateAux = (matrix, nTimes, rotate) => {
    if (nTimes === 0) return matrix
    const rotMatrix = rotate(matrix)
    return rotateAux(rotMatrix, --nTimes, rotate)
  }

  const rowEmpty = row => row.every(value => value === 0)

  const getBoundedSymbolValue = (matrix) => {
    const width = matrix[0].length
    let rowStart = width, colStart = width, rowEnd = 0, colEnd = 0
    matrix.forEach((row, ri) => {
      if (!rowEmpty(row)) {
        rowStart = Math.min(ri, rowStart)
        rowEnd = Math.max(ri, rowEnd)
        row.forEach((value, ci) => {
          if (value !== 0) {
            colStart = Math.min(ci, colStart)
            colEnd = Math.max(ci, colEnd)
          }
        })
      }
    })
    return matrix.slice(rowStart, rowEnd + 1).map(row => row.slice(colStart, colEnd + 1))
  }

  (() => {
    if (!symbol) {
      if (symbols.length === 0) symbols = [...Constants.SYMBOLS]
      const index = getRandom()
      matrix = getBoundedSymbolValue(Constants.SYMBOLS_MAP[symbols[index]])
      symbols.splice(index, 1)
    } else {
      matrix = getBoundedSymbolValue(Constants.SYMBOLS_MAP[symbol])
    }
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  const rotate90ClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, reverse))

  const rotate90AntiClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, flipVertical))

  return { matrix, size, position, getBoundedSymbolValue, rotate90ClockWise, rotate90AntiClockWise }
}
