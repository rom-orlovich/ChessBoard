import { ChessBoard } from "./ChessBoard.js";
import { ButtonControlInit } from "./ButtonsControl.js";
import { PlayGame } from "./PlayGame.js";
import { movePawnToOtherPile } from "./Helpers/helperFun.js";

ButtonControlInit();
const chess = new ChessBoard();

chess.render();

ButtonControlInit((color) => {
  chess.setNewSetUp(color);
  chess.render();
});

const playGame = new PlayGame();
// console.log("chess.tdBoardChess", chess.tdBoardChess);
playGame.initAddEvent(chess.tdBoardChess);
// movePawnToOtherPile("52", [4, 4]);
// movePawnToOtherPile("queen-3-white", [5, 5]);
// movePawnToOtherPile("6", [2, 5]);
// movePawnToOtherPile("61", [4, 2]);
// movePawnToOtherPile("53", [5, 5]);
// movePawnToOtherPile("53", [5, 5]);
