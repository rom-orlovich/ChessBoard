// import { ChessBoard } from "./ChessBoardt.js";
import { ButtonControlInit } from "./ButtonsControl.js";
import { GameEvents } from "./GameEvents.js";

import { ChessBoard } from "./ChessBoard.js";

ButtonControlInit();
const chess = new ChessBoard();
chess.render();

ButtonControlInit((color) => {
  chess.changeDirBoard(color);
  chess.render(false);
});

const gameEvents = new GameEvents();

gameEvents.initAddEvent(chess.tdBoardChess);
