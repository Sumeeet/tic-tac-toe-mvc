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
      ['l', 'j', 't', 'i'].forEach(s => assert.equal(symb.isSymbol(s), true))
    })
  })

  context(('Board'), () => {
    const symb = Symbols.symbols

    it('fillRandomSymbol', () => {
      const board = Board.board(10, 21, symb, Rules.rules)
      const getRandomValue = (max, min) => Math.floor(Math.random() * (max - min)) + min
      const getRandomCol = (max, min) => getRandomValue(max, min)

      while (!board.isBoardFull()) {
        board.makeMove(getRandomCol(10, 0), symb.getSymbolValue(symb.genRandomSymbol()))
      }
      board.print()
    })

    it('fillBoard', () => {
      const board = Board.board(10, 21, symb, Rules.rules)
      let rows = 20
      while (rows > 0) {
        board.makeMove(0, symb.getSymbolValue('I'))
        board.makeMove(4, symb.getSymbolValue('I'))
        board.makeMove(8, symb.getSymbolValue('O'))
        --rows
      }
      board.print()
    })
  })
})
