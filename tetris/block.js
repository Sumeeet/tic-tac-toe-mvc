/* eslint-disable one-var */
const Constants = require('../tetris/constants')
const Symbols = require('../tetris/symbols')

exports.block = () => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row: 0, column: 3 }

  const getRandom = () => Math.floor(Math.random() * (symbols.length - 1 - 0)) + 0;

  (() => {
    if (symbols.length === 0) symbols = [...Constants.SYMBOLS]
    const index = getRandom()
    matrix = Symbols.symbols.getBoundedSymbolValue(Constants.SYMBOLS_MAP[symbols[index]])
    symbols.splice(index, 1)
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  return { matrix, size, position }
}
