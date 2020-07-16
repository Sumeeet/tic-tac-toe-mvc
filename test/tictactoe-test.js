/* eslint-disable no-undef */
const Board = require('../tick-tac-toe/board')
const Symbols = require('../tick-tac-toe/symbols')
const Rules = require('../tick-tac-toe/rules')

describe('NewTicTacToe', () => {
  context('(InitializeBoard)', () => {
    it('PrintBoard', () => {
      const board = Board.board(6, 5, Symbols.symbols, Rules.rules)
      board.makeMove(6, 'X')
      board.print()
    })
  })
})
