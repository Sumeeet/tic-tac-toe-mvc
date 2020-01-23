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
        // initialize "Reset" button handler
        let button = document.querySelector("#button-reset");
        button.addEventListener('click', event => onButtonClicked());
    }

    MarkCell(cellId, state) {
        let element = document.getElementById(cellId);
        element.textContent = 'X';
    }

    ResetBoard() {

    }
}