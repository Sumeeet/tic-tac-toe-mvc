exports.data = () => {
  const symbols = ['X', 'O']
  const symbolMap = { X: 4, O: 1 }

  return {
    isSymbol: (symbol) => (symbols.indexOf(symbol) > -1),
    getSymbols: () => symbols.toString(),
    getSymbolValue: (symbol) => symbolMap[symbol]
  }
}
