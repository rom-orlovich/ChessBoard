import { GenerateBoard } from "./GenerateBoard.js";
import {
  selectElement,
  addEventListenerByQuery,
  getObjKeyWithValue,
  genrateObjKeyValueToArr,
} from "./Helpers/helperFun.js";
import { checkPosibleMovement, posibleMovement } from "./PawnsMovement.js";

export class PlayGame extends GenerateBoard {
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
        this.handlerMovement(dataSetInfo, this.dataTd);
      },
      "#container_ChessBoard"
    );
    addEventListenerByQuery(
      "mouseover",
      (e) => {
        const dataSetInfo = e.target?.dataset?.typePawn;
        if (!dataSetInfo?.split("-")[4]) return;
        e.target.parentElement.classList.add("active");
        let { normalMove, eatMove } = posibleMovement(dataSetInfo, this.dataTd);
        normalMove = getObjKeyWithValue(normalMove);
        let allMovement = genrateObjKeyValueToArr(normalMove);
        console.log(allMovement);
        checkPosibleMovement(dataSetInfo, allMovement, dataTd);
      },
      "#container_ChessBoard"
    );

    addEventListenerByQuery(
      "mouseout",
      (e) => {
        const target = e.target;

        if (!target?.dataset?.typePawn?.split("-")[4]) return;
        e.target.parentElement.classList.remove("active");
      },
      "#container_ChessBoard"
    );
  }
  handlerMovement(dataSetInfo, arr) {
    const [index, type, number, color, playerTurn] = dataSetInfo.split("-");
    let { normalMove, eatMove, illegalMove } = posibleMovement(dataSetInfo);
    // console.log(target);
    // console.log(normalMove);
    // normalMove = getObjKeyWithValue(normalMove);
    // eatMove = getObjKeyWithValue(eatMove);
    // console.log(normalMove, eatMove);
    // let allMovement = genrateObjKeyValueToArr(normalMove);
    // checkPosibleMovement(dataSetInfo, allMovement, arr);
  }

  newBoardHtml() {
    this.dataTd.forEach((el, i) => {
      this._tdBoardChess[i].replaceChild(
        el.firstElementChild,
        this._tdBoardChess[i].firstElementChild
      );
    });
  }
}
