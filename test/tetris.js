/* eslint-disable no-undef */
const Board = require('../tick-tac-toe/board')
const Symbols = require('../tetris/symbols')
const Rules = require('../tetris/rules')

describe('Tetris', () => {
  context('(InitializeBoard)', () => {
    it('PrintBoard', () => {
      // const board = Board.board(10, 20, Symbols.symbols, Rules.rules)
      const matrix = Symbols.symbols.getSymbolValue('L')
      console.log(`L Matrix ${matrix}`)
      const ckMatrix = Symbols.symbols.rotate90ClockWise(matrix)
      console.log(`L Matrix rotate 90 clock-wise ${ckMatrix}`)
      const ackMatrix = Symbols.symbols.rotate90AntiClockWise(ckMatrix)
      console.log(`L Matrix rotate 90 anti clock-wise ${ackMatrix}`)
    })
  })
})
