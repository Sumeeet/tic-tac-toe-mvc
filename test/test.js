/* eslint-disable no-undef */
const assert = require('assert')
const Model = require('../model')

describe('TicTacToe', () => {
  context('(InitializeBoard)', () => {
    it('Board state should be in Ready state', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.currentBoardState.BoardState, 0)
      ticktacmodel.board.forEach((arr) => arr.some((val) => assert.strictEqual(val, 0)))
    })
  })

  context('(GetPlayer)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.GetPlayer(1), 'O')
      assert.strictEqual(ticktacmodel.GetPlayer(4), 'X')
    })
  })

  context('(GetPlayerValue)', () => {
    it('Player 0 should be O and Plyaer 1 should be X', () => {
      const ticktacmodel = new Model()
      assert.strictEqual(ticktacmodel.GetPlayerValue('O'), 1)
      assert.strictEqual(ticktacmodel.GetPlayerValue('X'), 4)
    })
  })

  context('(IsValidBoardCell)', () => {
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

  context('(SimulateBoard)', () => {
    it('Simulate Board', () => {
      const ticktacmodel = new Model()
      // generate random numbers between [0,8]
      const min = 0
      const max = 8
      for (var i = 0; i < 100; ++i) {
        switch (ticktacmodel.currentBoardState) {
          case ticktacmodel.boardStates.Finished:
          case ticktacmodel.boardStates.Tie:
            ticktacmodel.ResetBoard()
            break
          default:
            break
        }
        const cellIndex = Math.floor(Math.random() * (max - min + 1)) + min
        ticktacmodel.MakeMove(cellIndex)
      }
      assert.strictEqual(i, 100)
    })
  })
})
