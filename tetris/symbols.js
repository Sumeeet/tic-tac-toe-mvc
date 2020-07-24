/* eslint-disable one-var */
exports.symbols = (() => {
  const symbols = ['L', 'J', 'T', 'I', 'O', 'Z', 'S']

  // useful for debugging purpose in console
  const valueToSymbolsMap = { 0: ' ', 1: 'L', 2: 'J', 3: 'I', 4: 'O', 5: 'S', 6: 'Z', 7: 'T' }

  const symbolMap = {
    L: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    J: [[0, 0, 0, 0], [2, 0, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0]],
    I: [[0, 0, 0, 0], [3, 3, 3, 3], [0, 0, 0, 0], [0, 0, 0, 0]],
    O: [[0, 0, 0, 0], [0, 4, 4, 0], [0, 4, 4, 0], [0, 0, 0, 0]],
    S: [[0, 0, 5, 5], [0, 5, 5, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    Z: [[0, 6, 6, 0], [0, 0, 6, 6], [0, 0, 0, 0], [0, 0, 0, 0]],
    T: [[0, 7, 0, 0], [7, 7, 7, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  }

  const rotate = (matrix) => {
    const map = (index, row, matrix) => row.map((element) => matrix[index++].push(element))
    const copy = matrix.map(row => [])
    matrix.map(row => map(0, row, copy))
    return copy
  }

  const flipVertical = matrix => [matrix[3], matrix[2], matrix[1], matrix[0]]

  const rotate90ClockWiseAux = (matrix, nTimes) => {
    if (nTimes === 0) return matrix
    const rotMatrix = rotate(matrix, nTimes).map(row => row.reverse())
    return rotate90ClockWiseAux(rotMatrix, --nTimes)
  }

  const rotate90AntiClockWiseAux = (matrix, nTimes) => {
    if (nTimes === 0) return matrix
    const rotMatrix = flipVertical(rotate(matrix, nTimes))
    return rotate90AntiClockWiseAux(rotMatrix, --nTimes)
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

  const rotate90ClockWise = (matrix, nTimes = 1) => rotate90ClockWiseAux(matrix, nTimes)

  const rotate90AntiClockWise = (matrix, nTimes = 1) => rotate90AntiClockWiseAux(matrix, nTimes)

  return { isSymbol, toString, getSymbolValue, rotate90ClockWise, rotate90AntiClockWise, getBoundedSymbolValue, getSymbols, getSymbol }
})()
