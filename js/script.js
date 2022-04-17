import { dataImg } from "./dataImg.js";
import { createImg } from "./utlities.js";
const SIZE = 8;
// typePawn,color,TDindex,numberPawn
const checkTypePawn = (numberPawn) => {
  if (numberPawn === 0 || SIZE - 1 - 1) return "rook";
  else if (numberPawn === 1 || SIZE - 1 - 2) return "knight";
  else if (numberPawn === 2 || SIZE - 1 - 3) return "rook";
  else if (numberPawn === 3) return "king";
  else if (numberPawn === 4) return "queen";
};

const checkColor = (row) => (row === 7 || row === 6 ? "white" : "black");

const createImgWithDataSet = (TDindex, numberPawn, color, typePawn) => {
  const img = createImg(dataImg[color][typePawn].src);
  img.dataset.typePawn = `${typePawn}-${numberPawn}-${color}-${TDindex}`;
  img.classList.add("center-abs");
  return img;
};

const setPawn = (TDindex, numberPawn, color) => {
  const typePawn = "pawn";
  return createImgWithDataSet(TDindex, numberPawn, color, typePawn);
};
const setOtherPawn = (TDindex, numberPawn, color) => {
  const typePawn = checkTypePawn(numberPawn);
  return createImgWithDataSet(TDindex, numberPawn, color, typePawn);
};
const setUpPawn = {
  0: setOtherPawn,
  1: setPawn,
  6: setOtherPawn,
  7: setPawn,
};
const createRows = (tr, tdNumber, row) => {
  for (let coulmn = 0; coulmn < SIZE; coulmn++) {
    tdNumber++;
    const td = document.createElement("td");
    td.dataset.indexPos = [row, coulmn];
    td.dataset.TdIndex = tdNumber;
    if (row === 7 || row === 6 || row === 0 || row === 1)
      setUpPawn[row](tdNumber, coulmn, checkColor(row));
    tr.appendChild(td);
  }
};

const generateTable = () => {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  let tdNumber = -1;
  for (let row = 0; row < SIZE; row++) {
    const tr = document.createElement("tr");
    tr.dataset.indexRow = row;
    // for (let coulmn = 0; coulmn < SIZE; coulmn++) {
    //   tdNumber++;
    //   const td = document.createElement("td");
    //   td.dataset.indexPos = [row, coulmn];
    //   td.dataset.indexTD = tdNumber;
    //   tr.appendChild(td);
    // }
    createRows(tr, tdNumber, row);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
};

const selectByQuery = (query, scope = document) => scope.querySelector(query);

const appendToDom = (newEl, query) => {
  const parentEl = selectByQuery(query);
  parentEl.innerHtml = "";
  parentEl.appendChild(newEl);
};

appendToDom(generateTable(), "#container_ChessBoard");