import { createEl } from "./Helpers/helperFun.js";

export class GenerateBoard {
  _vtDom;
  _tdBoardChess;
  #generateTable() {
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    let tdNumber = -1;
    for (let row = 0; row < 8; row++) {
      const tr = document.createElement("tr");
      tr.dataset.indexRow = row;
      for (let coulmn = 0; coulmn < 8; coulmn++) {
        tdNumber++;
        const td = document.createElement("td");
        td.dataset.indexPos = [row, coulmn];

        td.dataset.indexTD = tdNumber;
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    return table;
    // return createEl(`<table><tbody>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // <tr>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // </tr>
    // </tbody></table>`);
  }
  initChessBoard() {
    this.parentEl.innerHTML = "";
    this._vtDom = document
      .createDocumentFragment()
      .appendChild(this.#generateTable());
    this._tdBoardChess = Array.from(this._vtDom.querySelectorAll("td"));
  }

  render(handler = undefined) {
    this.initChessBoard();
    this.generateHtml(handler);
    this.parentEl.appendChild(this._vtDom);
  }

  get tdBoardChess() {
    return this._tdBoardChess;
  }
  get vtDom() {
    return this._vtDom;
  }
}
