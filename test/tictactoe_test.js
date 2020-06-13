/* eslint-disable no-undef */
const Board = require('../board')

describe('TicTacToe', () => {
  context('(PrintBoard)', () => {
    it('Initialize Board', () => {
      const board = Board.board()
      board.initialize(3, 8)
      board.print()
    })
  })
})
