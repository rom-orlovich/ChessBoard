// import { ChessBoard } from "./ChessBoardt.js";
import { ButtonControlInit } from "./ButtonsControl.js";
import { GameEvents } from "./GameEvents.js";

import { ChessBoard } from "./ChessBoard.js";
const gameState = {
  boardDir: 1,

  playerTurns: [0, 0],
  points: [0, 0],
  eatenPawns: {
    player1: [],
    player2: [],
  },
};

ButtonControlInit();
const chess = new ChessBoard();
chess.render();
const gameEvents = new GameEvents(gameState);
// console.log(gameEvents);
console.log(gameEvents.gameState);

ButtonControlInit((color) => {
  chess.changeDirBoard(
    color,
    gameEvents.gameState.boardDir,
    gameEvents.setBoardDir
  );
  chess.render(false);
});

gameEvents.initAddEvent(chess.tdBoardChess);
