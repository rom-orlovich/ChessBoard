"use strict;";

const generateTable = (numRows = 8, numCoulmns = 8) => {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  let tdNumber = -1;
  for (let row = 0; row < numRows; row++) {
    const tr = document.createElement("tr");
    tr.dataset.indexRow = row;
    for (let coulmn = 0; coulmn < numCoulmns; coulmn++) {
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
};

const selectByQuery = (query, scope = document) => scope.querySelector(query);

const appendToDom = (newEl, query) => {
  const parentEl = selectByQuery(query);
  parentEl.innerHtml = "";
  parentEl.appendChild(newEl);
};

appendToDom(generateTable(8, 8), "#container_ChessBoard");
