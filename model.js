'use strict';

class Model 
{
    constructor() {
        this.matrix = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        function getRow(row) {
            if(row > 2 || row < 0) {
                console.log('${row} : Not a valid row. Valid rows are in range 0 to 2');
                return [];
            }
    
            return this.matrix[row];
        }

        function getColumn(column) {
            if(column > 2 || column < 0) {
                console.log('${column} : Not a valid Column. Valid columns are in range 0 to 2');
                return [];
            }
    
            let column = [];
            for (let rowIndex = 0; rowIndex <= 2 ; rowIndex++) {
                const row = this.matrix[rowIndex];

                for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                    if(columnIndex == column) column.push(row[columnIndex]);
                }
            }
            return column;
        }

        function IsValidRow(row) {
            
            let row = getRow(cell % 3);
            if(row.length == 0) return false;
    
            let result = [];
            if(player1 === "player1") {
                // check if all the cells in row are 1's
                result = row.filter(c => c != 1);
            }
    
            if(result.length == 0) return true;
        }
    
        function IsValidColumn(cell) {
    
        }
    
        function IsValidDiagnal(cell) {
    
        }
    }

    IsWinner(cell, player1)
}


