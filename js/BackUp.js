import { GenerateBoard } from "./ChessBoard.js";
import { dataImg } from "./Helpers/ChessPawns.js";
import { createEl, createImgHtml } from "./Helpers/helperFun.js";

const chessPawnsPos = {
  white: {
    whitePawns: [48, 56],
    otherWhitePawns: [56],
    blackPawns: [8, 16],
    otherBlackPawns: [0, 8],
  },
  black: {
    whitePawns: [8, 16],
    otherWhitePawns: [0, 8],
    blackPawns: [48, 56],
    otherBlackPawns: [56],
  },
};

//knight-movement from start 57 to long 42-40
//from long 42-40  to short 36-32 long 25-27
// start- short 36  short  26-30

// export class ChessBoard extends GenerateBoard {
//   parentEl = document.querySelector("#container_ChessBoard");
//   #curBlackPawnsPos = [8, 16];
//   #curOtherBlackPawnsPos = [0, 8];
//   #curWhitePawnsPos = [48, 56];
//   #curOtherWhitePawnsPos = [56];
//   #boardDir = 1;

//   #makePawns(color, ...pos) {
//     const arr = this._tdBoardChess.slice(...pos);
//     const typePawn = "pawn";
//     arr.forEach((el, i) => {
//       const { src } = dataImg[color].soldier;
//       const pawnImg = createEl(createImgHtml(src));
//       pawnImg.dataset.typePawn = `${
//         el.dataset.indexPile
//       }-${typePawn}-${i}-${color}-${this.#boardDir}`;
//       pawnImg.classList.add("center-abs");
//       el.appendChild(pawnImg);
//     });
//   }

//   #makeOtherSoldier(color, ...pos) {
//     const arr = this._tdBoardChess.slice(...pos);
//     arr.forEach((el, i) => {
//       let typePawn = "";
//       let innerHtml = "";
//       if (i === 0 || i === arr.length - 1) typePawn = "rook";
//       else if (i === 1 || i === arr.length - 2) typePawn = "knight";
//       else if (i === 2 || i === arr.length - 3) typePawn = "bishop";
//       else if (i === 3) typePawn = "queen";
//       else if (i === 4) typePawn = "king";

//       innerHtml = createImgHtml(dataImg[color][typePawn].src);
//       const pawnImg = createEl(innerHtml);

//       pawnImg.dataset.typePawn = `${
//         el.dataset.indexPile
//       }-${typePawn}-${i}-${color}-${this.#boardDir}`;
//       pawnImg.classList.add("center-abs");
//       el.appendChild(pawnImg);
//     });
//   }

//   setNewSetUp(color) {
//     const { blackPawns, otherBlackPawns, whitePawns, otherWhitePawns } =
//       chessPawnsPos[color];
//     this.#boardDir = color === "white" ? 1 : 2;
//     this.#curWhitePawnsPos = whitePawns;
//     this.#curOtherWhitePawnsPos = otherWhitePawns;
//     this.#curBlackPawnsPos = blackPawns;
//     this.#curOtherBlackPawnsPos = otherBlackPawns;
//   }

//   generateHtml(handler = undefined) {
//     if (handler) return handler();
//     // this._tdBoardChess.forEach((el, i) => (el.dataset.index = `${i}`));
//     this.#makePawns("white", ...this.#curWhitePawnsPos);
//     this.#makePawns("black", ...this.#curBlackPawnsPos);
//     this.#makeOtherSoldier("white", ...this.#curOtherWhitePawnsPos);
//     this.#makeOtherSoldier("black", ...this.#curOtherBlackPawnsPos);
//   }
// }
