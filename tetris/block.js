'use strict'

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable one-var */
// const { SYMBOLS_MAP, SYMBOLS } = require('./constants')

const Block = (row = -1, column = 3, symbol = null) => {
  let symbols = []
  let matrix = []
  const size = { width: 0, height: 0 }
  const position = { row, column }

  const getRandom = (min, max) => Math.floor(Math.random() * (max - 1 - min)) + min

  const compose = (a, b) => (value) => b(a(value))

  const transpose = (matrix) => {
    const rowToCol = (row, matrix) => row.map((cell, index) => matrix[index].push(cell))
    const transMatrix = matrix.map(row => [])
    matrix.map(row => rowToCol(row, transMatrix))
    return transMatrix
  }

  const flipVertical = matrix => matrix.reverse()

  const reverse = matrix => matrix.map(row => row.reverse())

  const rotateAux = (matrix, nTimes, rotate) => {
    if (nTimes === 0) return matrix
    const rotMatrix = rotate(matrix)
    return rotateAux(rotMatrix, --nTimes, rotate)
  }

  const rowEmpty = row => row.every(value => value === 0)

  const getBoundedSymbolValue = (matrix) => {
    const width = matrix[0].length
    let rowStart = width, colStart = width, rowEnd = 0, colEnd = 0
    matrix.forEach((row, ri) => {
      if (!rowEmpty(row)) {
        rowStart = Math.min(ri, rowStart)
        rowEnd = Math.max(ri, rowEnd)
        row.forEach((value, ci) => {
          if (value !== 0) {
            colStart = Math.min(ci, colStart)
            colEnd = Math.max(ci, colEnd)
          }
        })
      }
    })
    return matrix.slice(rowStart, rowEnd + 1).map(row => row.slice(colStart, colEnd + 1))
  }

  (() => {
    if (!symbol) {
      if (symbols.length === 0) symbols = [...SYMBOLS]
      const index = getRandom(1, symbols.length)
      matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbols[index]])
      symbols.splice(index, 1)
    } else {
      matrix = getBoundedSymbolValue(SYMBOLS_MAP[symbol])
    }
    size.width = matrix[0].length
    size.height = matrix.length
  })()

  const rotate90ClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, reverse))

  const rotate90AntiClockWise = (matrix, nTimes = 1) => rotateAux(matrix, nTimes, compose(transpose, flipVertical))

  const drawBlock = (context) => {
    block.matrix.forEach((row, ri) => {
      row.forEach((value, ci) => {
        if (value > 0) {
          context.fillStyle = COLORS[value]
          context.fillRect(position.column + ci, position.row + ri, 1, 1)
        }
      })
    })
  }

  return { matrix, size, position, getBoundedSymbolValue, rotate90ClockWise, rotate90AntiClockWise, drawBlock }
}

// module.exports = Block
