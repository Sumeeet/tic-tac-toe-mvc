class View {
    constructor() {}

    InitializeCellHandlers(onCellClicked) {
        // intialize cell - <td> handlers
        let elements = document.querySelectorAll(".row");
        elements.forEach(e => e.addEventListener('click', event => {
            if (event.target.className === 'cell') {
                onCellClicked(event.target.id);
            }
        }));
    }

    InitializeButtonHandler(onButtonClicked) {
        let button = document.querySelector("#button-reset");
        button.addEventListener('click', event => onButtonClicked());
    }

    MarkCell(cellId, state) {
        let element = document.getElementById(cellId);
        element.textContent = state.Symbol;
        let player = document.querySelector(".player");
        if(state.Winner === "") {
            player.textContent = `Player ${state.NextSymbol} turn`;
        }
        else {
            player.textContent = `Player ${state.Symbol} wins!`;
        }
    }

    ResetBoard(startSymbol) {
        let rows = document.querySelectorAll(".row");
        rows.forEach(row => {
            let cells = document.querySelectorAll(".cell");
            cells.forEach(cell => cell.textContent = "");
        });
        let player = document.querySelector(".player");
        player.textContent = `Player ${startSymbol} turn`;
    }
}