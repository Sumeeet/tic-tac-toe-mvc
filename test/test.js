/* eslint-disable no-undef */
const assert = require('assert')
const Model = require('../model')

describe('TicTacToe', () => {
  describe('(InitializeBoard)', () => {
    it('Board state should be in Ready state', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.currentBoardState, 0)
      ticktacmodel.board.forEach((arr) => arr.some((val) => assert.strictEqual(val, 0)))
    })
  })

  describe('(GetPlayer)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.GetPlayer(1), 'O')
      assert.strictEqual(ticktacmodel.GetPlayer(4), 'X')
    })
  })

  describe('(GetPlayerValue)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.GetPlayerValue('O'), 1)
      assert.strictEqual(ticktacmodel.GetPlayerValue('X'), 4)
    })
  })

  describe('(IsValidBoardCell)', () => {
    it('Board cell is not valid', () => {
      const ticktacmodel = new Model()
      const numbers = [-1, -2, 9, 10]
      numbers.map((num) => assert.strictEqual(ticktacmodel.IsValidBoardCell(num), false))
    })

    it('Board cell is valid', () => {
      const ticktacmodel = new Model()
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      numbers.map((num) => assert.strictEqual(ticktacmodel.IsValidBoardCell(num), true))
    })
  })

  describe('(MakeMove)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Model()
      ticktacmodel.MakeMove(0, 'O')
      ticktacmodel.MakeMove(1, 'O')
      ticktacmodel.MakeMove(2, 'O')
      assert.strictEqual(ticktacmodel.currentBoardState, 2)
    })
  })
})
