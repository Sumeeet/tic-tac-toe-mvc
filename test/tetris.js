const assert = require('assert')/* eslint-disable no-undef */
// const Board = require('../tick-tac-toe/board')
const Symbols = require('../tetris/symbols')
// const Rules = require('../tetris/rules')

describe('Tetris', () => {
  context('(Symbols)', () => {
    const symb = Symbols.symbols
    it('RotateSymbol', () => {
      // const board = Board.board(10, 20, Symbols.symbols, Rules.rules)
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = symb.getSymbolValue(symbol)
        const rotMatrix = rotate(orgMatrix, 4)
        assert.deepEqual(orgMatrix, rotMatrix)
      }

      ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90ClockWise(matrix, nTimes)));
      ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90AntiClockWise(matrix, nTimes)))
    })
  })
})
