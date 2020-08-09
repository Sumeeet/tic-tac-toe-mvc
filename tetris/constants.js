/* eslint-disable no-unused-vars */
'use strict'

const SYMBOLS = ['L', 'J', 'T', 'I', 'O', 'Z', 'S']

const SYMBOLS_MAP = {
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  J: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  I: [[0, 0, 0, 0], [3, 3, 3, 3], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[4, 4], [4, 4]],
  S: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  Z: [[6, 6, 0], [0, 6, 6], [0, 0, 0]],
  T: [[0, 7, 0], [7, 7, 7], [0, 0, 0]]
}

const COLORS = ['none', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red']

const BoardSates = { Ready: 'BoardReady', Full: 'BoardFull', BlockInMotion: 'BlockInMotion', BlockPlaced: 'BlockPlaced' }