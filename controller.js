class Controller {
    constructor(model, view) {
        
        view.InitializeCellHandlers((cellId) => {
            let state = model.MarkCell(cellId);
            view.MarkCell(cellId, state);
        });

        view.InitializeButtonHandler(() => {
            model.ResetBoard();
            view.ResetBoard();
        });
    }
}

const app = new Controller(new Model(), new View());