/* eslint-disable no-undef */
const Board = require('../board')

describe('TicTacToe', () => {
  context('(PrintBoard)', () => {
    it('Initialize Board', () => {
      const board = Board.board(12)
      board.makeMove(8, 'X')
      board.print()
    })
  })
})
