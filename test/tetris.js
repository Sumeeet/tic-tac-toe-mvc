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

    it('GetBoundedSymbolValue', () => {
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('L')), [[0, 0, 1], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('J')), [[1, 0, 0], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('T')), [[0, 1, 0], [1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('I')), [[1, 1, 1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('O')), [[1, 1], [1, 1]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('S')), [[0, 1, 1], [1, 1, 0]])
      assert.deepEqual(symb.getBoundedSymbolValue(symb.getSymbolValue('Z')), [[1, 1, 0], [0, 1, 1]])

      const rotMatrix = symb.rotate90ClockWise(symb.getSymbolValue('L'), 2)
      assert.deepEqual(symb.getBoundedSymbolValue(rotMatrix), [[1, 1, 1], [1, 0, 0]])
    })

    it('RotateBoundedSymbol', () => {
      function rotateSymbols (symbol, rotate) {
        const orgMatrix = symb.getSymbolValue(symbol)
        return rotate(orgMatrix, 2)
      }

      const expectedBoundedSymbol = [
        [[1, 1, 1], [1, 0, 0]], /* L rotated CW 2 times */
        [[1, 1, 1], [0, 0, 1]], /* J rotated CW 2 times */
        [[1, 1, 1], [0, 1, 0]], /* T rotated CW 2 times */
        [[1, 1, 1, 1]], /* I rotated CW 2 times */
        [[1, 1], [1, 1]], /* O rotated CW 2 times */
        [[1, 1, 0], [0, 1, 1]], /* Z rotated CW 2 times */
        [[0, 1, 1], [1, 1, 0]] /* S rotated CW 2 times */
      ]

      const deepEqual = (actual, expected) => {
        for (let index = 0; index < actual.length; ++index) {
          assert.deepEqual(actual[index], expected[index])
        }
      }

      const rotateSymbCWFunc = (matrix, nTimes) => symb.rotate90ClockWise(matrix, nTimes)
      const actualCWBoundedSymbols = ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].map(s => rotateSymbols(s, rotateSymbCWFunc)).map(actual => symb.getBoundedSymbolValue(actual))
      deepEqual(actualCWBoundedSymbols, expectedBoundedSymbol)

      const rotateSymbACWFunc = (matrix, nTimes) => symb.rotate90AntiClockWise(matrix, nTimes)
      const actualACWBoundedSymbols = ['L', 'J', 'T', 'I', 'O', 'Z', 'S'].map(s => rotateSymbols(s, rotateSymbACWFunc)).map(actual => symb.getBoundedSymbolValue(actual))
      deepEqual(actualACWBoundedSymbols, expectedBoundedSymbol)
    })
  })

  context(('Board'), () => {
    const symb = Symbols.symbols

    // cons getBoundedSymbol = (symbol, matrix) => matrix.map(row => row.map(e => e === 0 ? 0: symbol))

    it('fillRandomSymbol', () => {
      const board = Board.board(10, 20, symb, Rules.rules)
      board.makeMove(0, symb.getBoundedSymbolValue(symb.getSymbolValue('L')))
      board.makeMove(0, symb.getBoundedSymbolValue(symb.getSymbolValue('S')))
      board.makeMove(0, symb.getBoundedSymbolValue(symb.getSymbolValue('S')))
      board.makeMove(4, symb.getBoundedSymbolValue(symb.getSymbolValue('I')))
      board.makeMove(8, symb.getBoundedSymbolValue(symb.getSymbolValue('O')))
      board.makeMove(8, symb.getBoundedSymbolValue(symb.getSymbolValue('O')))
      board.makeMove(0, symb.getBoundedSymbolValue(symb.rotate90ClockWise(symb.getSymbolValue('L'), 2)))
      board.print()
    })

    it('fillBoard', () => {
      const board = Board.board(10, 20, symb, Rules.rules)
      let rows = 20
      while (rows > 0) {
        board.makeMove(0, symb.getBoundedSymbolValue(symb.getSymbolValue('I')))
        board.makeMove(4, symb.getBoundedSymbolValue(symb.getSymbolValue('I')))
        board.makeMove(8, symb.getBoundedSymbolValue(symb.getSymbolValue('O')))
        --rows
      }
      board.print()
    })
  })
})
