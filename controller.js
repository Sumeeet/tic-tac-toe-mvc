class Controller {
    constructor(model, view) {
        
        let startSymbol = model.ResetBoard();
        view.ResetBoard(startSymbol);

        view.InitializeCellHandlers((cellId) => {
            let state = model.MarkCell(cellId);
            view.MarkCell(cellId, state);
        });

        view.InitializeButtonHandler(() => {
            let startSymbol = model.ResetBoard();
            view.ResetBoard(startSymbol);
        });
    }
}

const app = new Controller(new Model(), new View());