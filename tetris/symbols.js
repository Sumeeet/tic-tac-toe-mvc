exports.symbols = (() => {
  const symbols = ['L', 'J', 'T', 'I', 'O', 'Z', 'S']
  const symbolMap = {
    L: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    J: [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]],
    I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    O: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
    S: [[0, 0, 1, 1], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    Z: [[0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    T: [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  }

  const rotate = (matrix) => {
    const map = (index, row, matrix) => row.map((element) => matrix[index++].push(element))
    const copy = matrix.map(row => [])
    matrix.map(row => map(0, row, copy))
    return copy
  }

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

  const flipVertical = matrix => [matrix[3], matrix[2], matrix[1], matrix[0]]

  // public api's
  const isSymbol = (symbol) => symbols.indexOf(symbol) > -1

  const toString = () => symbols.toString()

  const getSymbolValue = (symbol) => symbolMap[symbol]

  const rotate90ClockWise = (matrix, nTimes) => rotate90ClockWiseAux(matrix, nTimes)

  const rotate90AntiClockWise = (matrix, nTimes) => rotate90AntiClockWiseAux(matrix, nTimes)

  return { isSymbol, toString, getSymbolValue, rotate90ClockWise, rotate90AntiClockWise }
})()
