/* eslint-disable no-undef */
const Board = require('../board')
const Symbols = require('../tick-tac-toe/symbols')
const Rules = require('../tick-tac-toe/rules')

describe('NewTicTacToe', () => {
  context('(InitializeBoard)', () => {
    it('PrintBoard', () => {
      const board = Board.board(Symbols.symbols, Rules.rules)
      board.makeMove(6, 'X')
      board.print()
    })
  })
})
