/* eslint-disable no-undef */
const Board = require('../board')
const Rules = require('../tictactoe-rules')

describe('TicTacToe', () => {
  context('(PrintBoard)', () => {
    it('Initialize Board', () => {
      const board = Board.board(3, Rules.rules())
      board.makeMove(8, 'X')
      board.print()
    })
  })
})
