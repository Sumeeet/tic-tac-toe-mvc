/* eslint-disable one-var */
exports.symbols = (() => {
  const symbols = ['L', 'J', 'T', 'I', 'O', 'Z', 'S']

  // useful for debugging purpose in console
  const valueToSymbolsMap = { 0: ' ', 1: 'L', 2: 'J', 3: 'I', 4: 'O', 5: 'S', 6: 'Z', 7: 'T' }

  const symbolMap = {
    L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    J: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    I: [[0, 0, 0, 0], [3, 3, 3, 3], [0, 0, 0, 0], [0, 0, 0, 0]],
    O: [[4, 4], [4, 4]],
    S: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    Z: [[6, 6, 0], [0, 6, 6], [0, 0, 0]],
    T: [[0, 7, 0], [7, 7, 7], [0, 0, 0]]
  }

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

  const isEmpty = row => row.reduce((accum, value) => accum + value) === 0

  const minMax = row => {
    let min = 3, max = 0, index = 0
    row.forEach(e => {
      if (e !== 0) {
        min = Math.min(min, index)
        max = Math.max(max, index)
      }
      ++index
    })
    return { min: min, max: max }
  }

  // public api's
  const getSymbol = symbolValue => valueToSymbolsMap[symbolValue]

  const getSymbols = () => symbols

  const isSymbol = (symbol) => symbols.indexOf(symbol.toUpperCase()) > -1

  const toString = () => symbols.toString()

  const getSymbolValue = (symbol) => symbolMap[symbol]

  const getBoundedSymbolValue = (matrix) => {
    let rMin = 3, rMax = 0, cMin = 3, cMax = 0, index = 0
    matrix.forEach(row => {
      if (!isEmpty(row)) {
        rMin = Math.min(rMin, index)
        rMax = Math.max(rMax, index)
        const range = minMax(row)
        cMin = Math.min(cMin, range.min)
        cMax = Math.max(cMax, range.max)
      }
      ++index
    })

    const boundedSymbols = []
    for (let ri = rMin; ri <= rMax; ++ri) {
      const row = []
      for (let ci = cMin; ci <= cMax; ++ci) {
        row.push(matrix[ri][ci])
      }
      boundedSymbols.push(row)
    }
    return boundedSymbols
  }

  const rotate90ClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, reverse))

  const rotate90AntiClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, flipVertical))

  return { isSymbol, toString, getSymbolValue, rotate90ClockWise, rotate90AntiClockWise, getBoundedSymbolValue, getSymbols, getSymbol }
})()
