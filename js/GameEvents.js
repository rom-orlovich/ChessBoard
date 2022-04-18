import {
  handleClickPawn,
  handlePosibleMovment,
} from "./Helpers/handleEventFun.js";
import {
  selectElement,
  addEventListenerByQuery,
  getObjKeyWithValue,
  genrateObjKeyValueToArr,
  toLog,
} from "./Helpers/utilitesFun.js";
import { posibleMovementsObj } from "./pawnsMovement.js";

export class GameEvents {
  dataTd;
  _tdBoardChess;
  _vtDom;

  constructor(gameState) {
    this.gameState = gameState;
  }
  initChessBoardControl(arr) {
    this.dataTd = arr;
  }
  setBoardDir(num) {
    console.log(this.gameState);
    // this.gameState.boardDir = num;
  }

  initAddEvent(dataTd) {
    this.initChessBoardControl(dataTd);
    addEventListenerByQuery(
      "click",
      (e) => {
        const dataSetInfo = e.target.dataset.typePawn;
        if (!dataSetInfo) return;
        this.handlerClickMovement(dataSetInfo, this.dataTd);
      },
      "#container_ChessBoard"
    );
    addEventListenerByQuery(
      "mouseover",
      (e) => {
        const target = e.target;
        const dataSetInfo = target?.dataset?.typePawn;
        if (!dataSetInfo) return;
        e.target.parentElement.classList.add("active");
        this.handleMouseOver(dataSetInfo, this.dataTd);
      },
      "#container_ChessBoard"
    );

    addEventListenerByQuery(
      "mouseout",
      (e) => {
        const target = e.target;
        const dataSetInfo = target?.dataset?.typePawn;
        if (!dataSetInfo) return;
        e.target.parentElement.classList.remove("active");
        this.handleMouseOver(dataSetInfo, this.dataTd, false);
      },
      "#container_ChessBoard"
    );
  }

  handleMouseOver(dataSetInfo, arrTD, addEvent = true) {
    let { normalMove, eatMove } = posibleMovementsObj(
      dataSetInfo,
      this.dataTd,
      this.gameState
    );
    normalMove = getObjKeyWithValue(normalMove);
    let allMovement = genrateObjKeyValueToArr(normalMove);
    handlePosibleMovment(dataSetInfo, allMovement, arrTD, addEvent);
  }

  handlerClickMovement(dataSetInfo, arrTD) {
    let { normalMove, eatMove } = posibleMovementsObj(
      dataSetInfo,
      arrTD,
      this.gameState
    );
    let allMovement = genrateObjKeyValueToArr(normalMove);
    handleClickPawn(dataSetInfo, allMovement, arrTD);
  }
}
