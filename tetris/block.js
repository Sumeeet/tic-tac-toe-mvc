/* eslint-disable one-var */
const Constants = require('../tetris/constants')
const Symbols = require('../tetris/symbols')

exports.block = (symbol) => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row: 0, column: 3 }

  const getRandom = () => Math.floor(Math.random() * (symbols.length - 1 - 0)) + 0;

  (() => {
    if (!symbol) {
      if (symbols.length === 0) symbols = [...Constants.SYMBOLS]
      const index = getRandom()
      matrix = Symbols.symbols.getBoundedSymbolValue(Constants.SYMBOLS_MAP[symbols[index]])
      symbols.splice(index, 1)
    } else {
      matrix = Symbols.symbols.getBoundedSymbolValue(Constants.SYMBOLS_MAP[symbol])
    }
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  return { matrix, size, position }
}
