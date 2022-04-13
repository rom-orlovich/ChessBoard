import { dataImg } from "./chessPawns.js";
import { createEl, createImgHtml } from "./helperFun.js";
const tdBoardChess = Array.from(document.querySelectorAll("td"));
const otherBlackPawnsTd = tdBoardChess.slice(0, 8);
const soliderBlackTd = tdBoardChess.slice(8, 16);
const soliderWhiteTd = tdBoardChess.slice(48, 56);
const otherWhitePawnsTd = tdBoardChess.slice(56);

const appendSolidersImg = (arr, color) => {
  arr.forEach((el) => {
    const { src } = dataImg[color].solider;
    const innerHtml = createImgHtml(src);
    el.appendChild(createEl(innerHtml));
  });
};

const appendOtherPawns = (arr, color) => {
  arr.forEach((el, i) => {
    let typePawn = "";
    let innerHtml = "";
    if (i === 0 || i === otherWhitePawnsTd.length - 1) typePawn = "castle";
    else if (i === 1 || i === otherWhitePawnsTd.length - 2) typePawn = "horse";
    else if (i === 2 || i === otherWhitePawnsTd.length - 3) typePawn = "runner";
    else if (i === 3) typePawn = "queen";
    else if (i === 4) typePawn = "king";

    innerHtml = createImgHtml(dataImg[color][typePawn].src);
    el.appendChild(createEl(innerHtml));
  });
};

export function initChessBoard() {
  appendSolidersImg(soliderWhiteTd, "white");
  appendSolidersImg(soliderBlackTd, "black");
  appendOtherPawns(otherWhitePawnsTd, "white");
  appendOtherPawns(otherBlackPawnsTd, "black");
}
