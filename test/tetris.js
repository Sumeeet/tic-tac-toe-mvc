const assert = require('assert')/* eslint-disable no-undef */
const Board = require('../tetris/board')
const Symbols = require('../tetris/symbols')
const Rules = require('../tetris/rules')

describe('Tetris', () => {
  context('(Symbols)', () => {
    const symb = Symbols.symbols
    it('RotateSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = symb.getSymbolValue(symbol)
        const rotMatrix = rotate(orgMatrix, 4)
        assert.deepEqual(orgMatrix, rotMatrix)
      }

      ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90ClockWise(matrix, nTimes)));
      ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].forEach(s => rotateSymbols(s, (matrix, nTimes) => symb.rotate90AntiClockWise(matrix, nTimes)))
    })

    it('IsValidSymbol', () => {
      assert.equal(['l', 'j', 't', 'i'].forEach(s => Symbols.symbols.isSymbol(s)))
    })
  })

  context(('Board'), () => {
    const symb = Symbols.symbols
    it('InitializeBoard', () => {
      // const board = Board.board(10, 20, symb, Rules.rules)
      assert.deepEqual(symb.getBoundedSymbolValue('L'), [[0, 0, 1], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue('J'), [[1, 0, 0], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue('T'), [[0, 1, 0], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue('I'), [[1, 1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue('O'), [[1, 1], [1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue('S'), [[0, 1, 1], [1, 1, 0]])
      assert.deepEqual(symb.getBoundedSymbolValue('Z'), [[1, 1, 0], [0, 1, 1]])
      // board.makeMove(0, 'a')
      // board.print()
    })
  })
})
