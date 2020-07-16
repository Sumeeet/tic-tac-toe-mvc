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

  const rotate = matrix => {
    const map = (index, row, matrix) => row.map((element) => matrix[index++].push(element))
    const copy = matrix.map(row => [])
    matrix.map(row => map(0, row, copy))
    return copy
  }

  // public api's
  const isSymbol = (symbol) => symbols.indexOf(symbol) > -1

  const toString = () => symbols.toString()

  const getSymbolValue = (symbol) => symbolMap[symbol]

  const flip = matrix => {
    let end = matrix.length - 1
    let start = 0
    while (start <= end) {
      const row = matrix[start]
      matrix[start] = matrix[end]
      matrix[end] = row
      ++start
      --end
    }
  }

  const rotate90 = (matrix, clockWise = true) => {
    if (clockWise) return rotate(matrix).map(row => row.reverse())
    else {
      const rMatrix = rotate(matrix)
      flip(rMatrix)
      return rMatrix
    }
  }

  return { isSymbol, toString, getSymbolValue, rotate90 }
})()
