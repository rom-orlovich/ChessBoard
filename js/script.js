import {
  addEventListenerByQuery,
  appendToDom,
  createRows,
  SIZE,
} from "./utlities.js";

const generateTable = () => {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  let tdNumber = -1;
  for (let row = 0; row < SIZE; row++) {
    const tr = document.createElement("tr");
    tr.dataset.indexRow = row;

    createRows(tr, tdNumber, row);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
};

appendToDom(generateTable(), "#container_ChessBoard");
let v;

addEventListenerByQuery(
  "click",
  (e) => {
    const target = e.target;
    console.log(target);
    if (!target.dataset.typePawn) return;
    if (v) {
      v.classList.remove("active");
      v = undefined;
    }
    target.classList.add("active");
    v = target;
  },
  "table"
);
