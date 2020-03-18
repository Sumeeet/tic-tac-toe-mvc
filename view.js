/* eslint-disable class-methods-use-this */
class View {
  constructor() {}

  InitializeCellHandlers(onCellClicked) {
    // intialize cell - <td> handlers
    const elements = document.querySelectorAll(".row");
    elements.forEach((e) => e.addEventListener("click", (event) => {
      if (event.target.className === "cell") {
        onCellClicked(event.target.id);
      }
    }));
  }

  InitializeButtonHandler(onButtonClicked) {
    const button = document.querySelector("#button-reset");
    button.addEventListener("click", (event) => onButtonClicked());
  }

  MarkCell(cellId, state) {
    const element = document.getElementById(cellId);
    element.textContent = state.Symbol;
    const player = document.querySelector(".player");
    if (state.Winner === "") {
      player.textContent = `Player ${state.NextSymbol} turn`;
    } else {
      player.textContent = `Player ${state.Symbol} wins!`;
    }
  }

  ResetBoard(startSymbol) {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      const cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => cell.textContent = "");
    });
    const player = document.querySelector(".player");
    player.textContent = `Player ${startSymbol} turn`;
  }
}
