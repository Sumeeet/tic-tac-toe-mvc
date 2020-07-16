exports.board = (width, height, symbols, rules) => {
  const board = [];
  (() => {
    if (!rules.isValidBoard(width, height)) {
      console.error(`Board dimensions ${width}, ${height} are not correct`)
      return
    }

    for (let h = 0; h < height; ++h) {
      const arr = new Array(width)
      board.push(arr.fill(0, 0))
    }
  })()

  const isBoardEmty = () => board.length === 0

  const IsValidCell = cellIndex => cellIndex >= 0 && cellIndex < width * height

  const getRowIndex = (cellIndex) => parseInt(cellIndex / width, 10)

  const getColIndex = (cellIndex) => cellIndex % width

  const get = (cellIndex) => board[getRowIndex(cellIndex)][getColIndex(cellIndex)]

  const set = (cellIndex, symbol) => { board[getRowIndex(cellIndex)][getColIndex(cellIndex)] = symbol }

  const makeMove = (index, symbol) => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    if (!IsValidCell(index)) {
      console.error(`Invalid cell index ${index}. Cell should be in range [0, ${width * height - 1}]`)
      return
    }

    if (!symbols.isSymbol(symbol)) {
      console.error(`Invalid symbol ${symbol}. Valid symbols are ${symbols.toString()}`)
      return
    }

    if (!rules.isValidMove(get(index))) {
      console.error(`Invalid move at ${index}`)
      return
    }

    // all ok, set symbol in grid
    set(index, symbols.getSymbolValue(symbol))

    const getValues = (indexes) => indexes.map((index) => get(index))

    if (rules.isWin(getValues, index, symbol)) {
      console.log(`${symbol} won the game`)
    } else if (rules.isTie(getValues, index, symbol)) {
      console.log('Its a tie')
    }
  }

  const clear = () => { board.forEach((arr) => arr.fill(0, 0)) }

  const print = () => {
    if (isBoardEmty()) {
      console.error(`Empty borad ${board}. Initialize board first.`)
      return
    }

    const getEmptyRow = (nCells, cellLayout, rowLayout) => {
      if (nCells === 0) return rowLayout
      return getEmptyRow(nCells - 1, cellLayout, rowLayout + cellLayout)
    }

    for (let index = 0; index < height; index++) {
      console.log(` ${board[index].reduce((accum, value) => `${accum} | ${value}`)}`)

      if (index < height - 1) {
        const emptyRow = getEmptyRow(width, '---|', '')
        console.log(emptyRow.substring(0, emptyRow.length - 1))
      }
    }
    console.log('')
  }

  return { makeMove, clear, print }
}
