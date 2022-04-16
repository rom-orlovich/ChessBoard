import { ChessBoard } from "./ChessBoard.js";
import { ButtonControlInit } from "./ButtonsControl.js";
import { PlayGame } from "./PlayGame.js";
// ButtonControlInit()

ButtonControlInit();
const chess = new ChessBoard();

chess.render();

ButtonControlInit((color) => {
  chess.setNewSetUp(color);
  // chess.render();
});

const playGame = new PlayGame();
// console.log("chess.tdBoardChess", chess.tdBoardChess);
playGame.initAddEvent(chess.tdBoardChess);
