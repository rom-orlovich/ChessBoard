// import { ChessBoard } from "./ChessBoardt.js";
import { ButtonControlInit } from "./ButtonsControl.js";
import { PlayGame } from "./PlayGame.js";
import { movePawnToOtherPile } from "./Helpers/helperFun.js";
import { ChessBoard } from "./ChessBoard.js";

ButtonControlInit();
const chess = new ChessBoard();
chess.render();

ButtonControlInit((color) => {
  chess.changeDirBoard(color);
  chess.render(false);
});

const playGame = new PlayGame();

playGame.initAddEvent(chess.tdBoardChess);
