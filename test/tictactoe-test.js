/* eslint-disable no-undef */
const Board = require('../board')
const Data = require('../tick-tac-toe/data')

describe('NewTicTacToe', () => {
  context('(InitializeBoard)', () => {
    it('PrintBoard', () => {
      const dim = 6
      const board = Board.board(dim, Data.data(), null)
      for (let i = 0; i < dim * dim; ++i) board.makeMove(i, 'X')
      board.print()
    })
  })
})
