exports.symbols = (() => {
  const symbols = ['X', 'O']
  const symbolMap = { X: 4, O: 1 }

  // public api's
  const isSymbol = (symbol) => symbols.indexOf(symbol) > -1
  const toString = () => symbols.toString()
  const getSymbolValue = (symbol) => symbolMap[symbol]

  return { isSymbol, toString, getSymbolValue }
})()
