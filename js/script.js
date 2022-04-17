import { dataImg } from "./dataImg.js";
import { createImg } from "./utlities.js";
const SIZE = 8;
// typePawn,color,TDindex,numberPawn
const checkTypePawn = (numberPawn) => {
  let typePawn;

  if (numberPawn === 0 || SIZE - 1) typePawn = "rook";
  if (numberPawn === 1 || SIZE - 2) typePawn = "knight";
  if (numberPawn === 2 || SIZE - 3) typePawn = "rook";
  if (numberPawn === 3) typePawn = "king";
  if (numberPawn === 4) typePawn = "queen";
  console.log(typePawn);
  return typePawn;
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
const setUpPawns = {
  0: setOtherPawn,
  1: setPawn,

  6: setPawn,
  7: setOtherPawn,
};
const createRows = (tr, tdNumber, row) => {
  for (let coulmn = 0; coulmn < SIZE; coulmn++) {
    tdNumber++;

    const td = document.createElement("td");
    td.dataset.indexPos = [row, coulmn];
    td.dataset.TdIndex = tdNumber;
    if (row === 7 || row === 6 || row === 0 || row === 1)
      td.appendChild(setUpPawns[row](coulmn, coulmn, checkColor(row)));
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
