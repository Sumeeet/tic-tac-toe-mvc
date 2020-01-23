'use strict';

class Model {
    constructor() {
        // start symbol
        this.symbol = 'X';

        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        this.cellAdjacencyMatrix = [
            [   // cell 0            
                [0, 1, 2],
                [0, 4, 7],
                [0, 3, 6]
            ],
            [   // cell 1
                [0, 1, 2],
                [1, 4, 7]
            ],
            [   // cell 2
                [0, 1, 2],
                [2, 5, 8],
                [2, 4, 6]
            ],
            [   // cell 3
                [3, 4, 5],
                [0, 3, 6]
            ],
            [   // cell 4
                [1, 4, 7],
                [3, 4, 5],
                [2, 4, 6],
                [0, 4, 8]
            ],
            [   // cell 5
                [2, 5, 8],
                [3, 4, 5]
            ],
            [   // cell 6
                [0, 3, 6],
                [6, 7, 8]
            ],
            [   // cell 7
                [1, 4, 7],
                [6, 7, 8]
            ],
            [   // cell 8
                [2, 5, 8],
                [6, 7, 8],
                [0, 4, 8]
            ],
        ];

        this.ResetBoard();
    }

    ResetBoard() {
        this.board.forEach(row => {
            row[0] = '';
            row[1] = '';
            row[2] = '';
        });
        this.symbol = 'X';
        console.log(`${this.symbol} : turn`);
    }

    GetCell(cell) {
        if (cell < 0 && cell > 8) {
            console.log(`${cell} : Cell should be in range 0 to 8`);
        }

        return this.board[parseInt(cell / 3)][cell % 3];
    }

    MarkCell(cell) {

        if (cell < 0 && cell > 8) {
            console.log(`${cell} : cell should be in range 0 to 8`);
        }        

        if (this.GetCell(cell) !== '') {
            console.log(`Cell is already occupied with ${this.symbol}`);
            return;
        }

        // set cell value
        this.board[parseInt(cell / 3)][cell % 3] = this.symbol;

        // toggle symbol for next player
        let nextSymbol = this.symbol === 'O' ? 'X' : 'O';
        
        // check winner
        // we need to check all the possible cases rows, columns and diagnals
        // can we optimize this for minimum lookup ? todo: minmax algo
        let cells = this.cellAdjacencyMatrix[cell];
        let winner = false;
        for(let index = 0; index < cells.length; index++) {
            winner = cells[index].filter(s => this.GetCell(s) !== nextSymbol && this.GetCell(s) !== '').length == 3
            if(winner) {
                console.log(`${this.symbol} won the game`);
                this.ResetBoard();
                return;
            }
        }

        // toggle symbol for next player
        this.symbol = this.symbol === 'O' ? 'X' : 'O';        
        console.log(`${this.symbol} : turn`);
    }
}