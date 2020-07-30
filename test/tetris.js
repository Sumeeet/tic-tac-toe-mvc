/* eslint-disable dot-notation */
const assert = require('assert')/* eslint-disable no-undef */
const Board = require('../tetris/board')
const Symbols = require('../tetris/symbols')
const Rules = require('../tetris/rules')
const Constants = require('../tetris/constants')

describe('Tetris', () => {
  context('(Symbols)', () => {
    const symb = Symbols.symbols
    it('RotateSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = Constants.SYMBOLS_MAP[symbol]
        const rotMatrix = rotate(orgMatrix, 4)
        assert.deepEqual(orgMatrix, rotMatrix)
      }

      Constants.SYMBOLS.forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90ClockWise(matrix, nTimes)))
      Constants.SYMBOLS.forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90AntiClockWise(matrix, nTimes)))
    })

    it('GetBoundedSymbolValue', () => {
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['L']), [[0, 0, 1], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['J']), [[2, 0, 0], [2, 2, 2]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['T']), [[0, 7, 0], [7, 7, 7]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['I']), [[3, 3, 3, 3]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['O']), [[4, 4], [4, 4]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['S']), [[0, 5, 5], [5, 5, 0]])
      assert.deepEqual(symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['Z']), [[6, 6, 0], [0, 6, 6]])

      const rotMatrix = symb.rotate90ClockWise(Constants.SYMBOLS_MAP['L'], 2)
      assert.deepEqual(symb.getBoundedSymbolValue(rotMatrix), [[1, 1, 1], [1, 0, 0]])
    })

    it('RotateBoundedSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = Constants.SYMBOLS_MAP[symbol]
        return rotate(orgMatrix, 2)
      }

      const expectedBoundedSymbol = [
        [[1, 1, 1], [1, 0, 0]], /* L rotated CW 2 times */
        [[2, 2, 2], [0, 0, 2]], /* J rotated CW 2 times */
        [[7, 7, 7], [0, 7, 0]], /* T rotated CW 2 times */
        [[3, 3, 3, 3]], /* I rotated CW 2 times */
        [[4, 4], [4, 4]], /* O rotated CW 2 times */
        [[6, 6, 0], [0, 6, 6]], /* Z rotated CW 2 times */
        [[0, 5, 5], [5, 5, 0]] /* S rotated CW 2 times */
      ]

      const deepEqual = (actual, expected) => {
        for (let index = 0; index < actual.length; ++index) {
          assert.deepEqual(actual[index], expected[index])
        }
      }

      const rotateSymbCWFunc = (matrix, nTimes) => symb.rotate90ClockWise(matrix, nTimes)
      const actualCWBoundedSymbols = Constants.SYMBOLS.map(s => rotateSymbols(s, rotateSymbCWFunc)).map(actual => symb.getBoundedSymbolValue(actual))
      deepEqual(actualCWBoundedSymbols, expectedBoundedSymbol)

      const rotateSymbACWFunc = (matrix, nTimes) => symb.rotate90AntiClockWise(matrix, nTimes)
      const actualACWBoundedSymbols = Constants.SYMBOLS.map(s => rotateSymbols(s, rotateSymbACWFunc)).map(actual => symb.getBoundedSymbolValue(actual))
      deepEqual(actualACWBoundedSymbols, expectedBoundedSymbol)
    })
  })

  context(('Board'), () => {
    const symb = Symbols.symbols

    it('fillRandomSymbol', () => {
      const board = Board.board(10, 21, Rules.rules)
      let symbols = []

      const getRandomValue = (max, min) => Math.floor(Math.random() * (max - min)) + min

      const getRandomSymbol = () => {
        if (symbols.length === 0) symbols = [...Constants.SYMBOLS]
        const index = getRandomValue(symbols.length, 0)
        const symbol = symbols[index]
        symbols.splice(index, 1)
        return symbol
      }

      const getRandomCol = (max, min) => getRandomValue(max, min)

      while (!board.isBoardFull()) {
        board.makeMove(getRandomCol(10, 0), symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP[getRandomSymbol()]))
      }
      board.print()
    })

    it('fillBoard', () => {
      const board = Board.board(10, 21, Rules.rules)
      let rows = 20
      while (rows > 0) {
        board.makeMove(0, symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['I']))
        board.makeMove(4, symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['I']))
        board.makeMove(8, symb.getBoundedSymbolValue(Constants.SYMBOLS_MAP['O']))
        --rows
      }
      board.print()
    })
  })
})
