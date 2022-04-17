import {
  setPawnImg,
  SIZE,
  checkColor,
  checkPawnType,
} from "./ChessBoardHelpers.js";

export class ChessBoard {
  parentEl = document.querySelector("#container_ChessBoard");
  vtDom;
  curTable;
  tdBoardChess;
  boardDir = 1;
  chessPawnSetUp = {
    0: this.setOtherPawns,
    1: this.setPawns,
    6: this.setPawns,
    7: this.setOtherPawns,
  };

  setPawns(td, pawnIndex, indexPile, boardDir, color) {
    setPawnImg(td, "pawn", pawnIndex, indexPile, color, boardDir);
  }

  setOtherPawns(td, pawnIndex, indexPile, boardDir, color) {
    let typePawn = checkPawnType(pawnIndex);
    setPawnImg(td, typePawn, pawnIndex, indexPile, color, boardDir);
  }

  generateTable() {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    let indexPile = -1;
    for (let row = 0; row < SIZE; row++) {
      let tr = document.createElement("tr");
      tr.dataset.indexRow = row;
      for (let coulmn = 0; coulmn < SIZE; coulmn++) {
        indexPile++;
        const td = document.createElement("td");
        td.dataset.indexPos = [row, coulmn];
        td.dataset.indexPile = indexPile;
        if (row === 1 || row === 0 || row === 7 || row === 6)
          this.chessPawnSetUp[row](
            td,
            coulmn,
            indexPile,
            this.boardDir,
            checkColor(row, "white", "black")
          );

        tr.appendChild(td);
      }
      tr.dataset.rowIndex = row;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
  }

  changeDirBoard(color) {
    this.boardDir = color === "white" ? 1 : 2;
    this.boardDir === 2
      ? this.parentEl?.classList.add("rotate180")
      : this.parentEl?.classList.remove("rotate180");

    this.makeTDArr();
    this.tdBoardChess.forEach((el) => {
      const img = el?.firstElementChild;
      if (!img) return;
      this.boardDir === 2
        ? img.classList.add("rotate180Img")
        : img.classList.remove("rotate180Img");
    });
  }
  makeTDArr() {
    this.vtDom = document.createDocumentFragment().appendChild(this.curTable);
    this.tdBoardChess = Array.from(this.vtDom.querySelectorAll("td"));
  }

  initChessBoard(reRender) {
    this.parentEl.innerHTML = "";
    this.curTable = reRender ? this.generateTable() : this.curTable;
    this.makeTDArr();
  }

  render(reRender = true) {
    this.initChessBoard(reRender);
    this.parentEl.appendChild(this.vtDom);
  }
}
