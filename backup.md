// const tdBoardChess = Array.from(document.querySelectorAll("td"));
// tdBoardChess.forEach((el, i) => (el.dataset.index = `${i}`));

const appendPawnsImg = (arr, color) => {
arr.forEach((el) => {
const { src } = dataImg[color].soldier;
const innerHtml = createImgHtml(src);
el.appendChild(createEl(innerHtml));
});
};

const appendOtherPawns = (arr, color) => {
arr.forEach((el, i) => {
let typePawn = "";
let innerHtml = "";

    if (i === 0 || i === arr.length - 1) typePawn = "rook ";
    else if (i === 1 || i === arr.length - 2) typePawn = "knight";
    else if (i === 2 || i === arr.length - 3) typePawn = "bishop";
    else if (i === 3) typePawn = "queen";
    else if (i === 4) typePawn = "king";

    innerHtml = createImgHtml(dataImg[color][typePawn].src);
    const pawnImg = createEl(innerHtml);
    pawnImg.dataset.typePawn = typePawn;
    el.appendChild(pawnImg);

});
};

export function initChessBoard(data = chessPawnsPos) {
// const { black, whites } = data;
// const { Pawns: blackPawns, otherPawns: otherBlackPawns } = black;
// const soldierBlackTd = tdBoardChess.slice(...blackPawns);
// const otherBlackPawnsTd = tdBoardChess.slice(...otherBlackPawns);
// const soldierWhiteTd = tdBoardChess.slice(48, 56);
// const otherWhitePawnsTd = tdBoardChess.slice(56);
// appendPawnsImg(soldierWhiteTd, "white");
// appendPawnsImg(soldierBlackTd, "black");
// appendOtherPawns(otherWhitePawnsTd, "white");
// appendOtherPawns(otherBlackPawnsTd, "black");
}
