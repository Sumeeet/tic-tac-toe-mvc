exports.rules = () => {
  const symbols = ['X', 'O']
  const symbolMap = { X: 4, O: 1 }

  return {
    /**
     * place new value at cell index if move is valid i.e. according to board rules
     * @param {number} index valid cell index
     * @param {any}  value value is the new value at cell index
     * @param {Array} data data is 1-dim array
     */
    move: function (index, value, data) {
      if (data[index] !== ' ') {
        console.error(`cell index ${index} is already occupied`)
        return
      }

      if (symbols.indexOf(value) === -1) {
        console.error(`Invalid symbol ${value}. Valid symbols are ${symbols.toString()}`)
        return
      }

      data[index] = symbolMap[value]
      console.log(`value at index[${index}] is ${data[index]}`)
    }

    /**
     *
     * @param {*} data
     */
    /*
    isWin: function (data) {
      const valueTriplets = triplets.map((triplet) => triplet.map((index) => data[index]))
      const tripletSum = valueTriplets.map((triplet) => triplet.reduce((accum, curVal) => accum + curVal))
      return tripletSum.some((val) => val === 3 || val === 12)
    }, */

    /**
     *
     * @param {*} data
     */
    /* IsTie: function (data) {
      // return true if all the cells are occupied by valid value
      const valueTriplets = triplets.slice(0, 3).map((triplet) => triplet.map((index) => data[index]))
      const emptyCellRow = valueTriplets.map((triplet) => triplet.some((val) => val === 0))
      return emptyCellRow.filter((val) => val === true).length === 0
    } */
  }
}
