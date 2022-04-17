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
  initChessBoardControl(arr) {
    this.dataTd = arr;
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
    let { normalMove, eatMove } = posibleMovementsObj(dataSetInfo, this.dataTd);
    normalMove = getObjKeyWithValue(normalMove);
    let allMovement = genrateObjKeyValueToArr(normalMove);
    handlePosibleMovment(dataSetInfo, allMovement, arrTD, addEvent);
  }

  handlerClickMovement(dataSetInfo, arrTD) {
    let { normalMove, eatMove } = posibleMovementsObj(dataSetInfo, arrTD);
    let allMovement = genrateObjKeyValueToArr(normalMove);
    handleClickPawn(dataSetInfo, allMovement, arrTD);
  }
}