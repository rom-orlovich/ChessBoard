import {
  makeArray,
  movePawnToOtherPile,
  removeEventListenerByQuery,
  selectElement,
  toLog,
} from "./Helpers/helperFun.js";

export const checkDir = (boardDir, color, number) =>
  (boardDir === "1" && color === "white") ||
  (boardDir === "2" && color === "black")
    ? number * -1
    : number;

const checkIligalePos = (index, arr) => {
  let length = arr.length - 1;
  let Index = index * 1;
  return Index > length ? length : Index < 0 ? 0 : Index;
};

export const getDataFromDataSet = (
  el,
  pos,
  datasetName = "typePawn",
  split = "-"
) => el && el.dataset?.[datasetName]?.split(split)[pos];

export const getNextPileChild = (index, arr) =>
  arr[checkIligalePos(index, arr)]?.firstElementChild;

const checkTheBoarderOfPile = (index, change, color, arr) => {
  const nextPile = getNextPileChild(index - 7, arr);

  return nextPile && getDataFromDataSet(nextPile, 3) !== color;
};

const obliquePossibleMovment = (change, curIndex, arr, color) => {
  const newIndex = checkIligalePos(curIndex + change, arr);
  const [row, coulmn] = arr[curIndex]?.dataset.indexPos.split(",");
  const [rowNext, coulmnNext] = arr[newIndex]?.dataset.indexPos.split(",");

  if (Math.abs(rowNext - row) !== Math.abs(coulmnNext - coulmn)) {
    return 0;
  }
  const firstChildEl = getNextPileChild(newIndex, arr);
  if (firstChildEl && firstChildEl.dataset.typePawn?.split("-")[3] === color)
    return 0;
  // toLog({
  //   pile: arr[newIndex],
  //   bool: getNextPileChild(newIndex, arr)?.dataset.typePawn?.split("-")[3],
  // });
  return change;
};

const breakLoop = (change, curIndex, arrTd, color) => {
  const newPos = change + curIndex;

  const nextPileChild = getNextPileChild(newPos, arrTd);
  if (!nextPileChild) return;

  const getColorDataSet = getDataFromDataSet(nextPileChild, 3);
  console.log(getColorDataSet);
  return getColorDataSet !== color;
  // toLog({ newPos: getNextPileChild(newPos, arrTd) });
  // return !(
  //   getNextPileChild(newPos, arrTd)?.dataset.typePawn?.split("-")[3] !== color
  // );
};

const bishopMove = (lengthLoop, curIndex, change, arrTd, color) => {
  const nextPileChild = getNextPileChild(curIndex + change, arrTd);
  const getColorDataSet = getDataFromDataSet(nextPileChild, 3);
  return getColorDataSet === color
    ? []
    : makeArray(
        lengthLoop,
        (i) => obliquePossibleMovment(i * change, curIndex, arrTd, color),
        (i) => breakLoop(i * change, curIndex, arrTd, color)
      );
};

const pawnMove = (curIndex, change, arrTd, boardDir, color) => {
  return getNextPileChild(
    curIndex + checkDir(boardDir, color, change),
    arrTd
  )?.dataset.typePawn?.split("-")[3] === color
    ? []
    : [checkDir(boardDir, color, change)];
};

export const posibleMovement = (pawnType, arrTd) => {
  const [index, type, number, color, boardDir] = pawnType.split("-");

  const Index = index * 1;

  const [row, column] = arrTd[Index]?.dataset.indexPos.split(",");
  const Row = row * 1;
  const res = {
    pawn: {
      normalMove: {
        obliqueLeftFoward: undefined,
        obliqueRightFoward: undefined,
        obliqueLeftBackWard: undefined,
        obliqueRightBackWard: undefined,
        left: undefined,
        right: undefined,
        foward: pawnMove(Index, 8, arrTd, boardDir, color),
        backward: undefined,
      },

      eatMove: {
        obliqueLeftFoward: pawnMove(Index, 9, arrTd, boardDir, color),
        obliqueRightFoward: pawnMove(Index, 7, arrTd, boardDir, color),
        obliqueLeftBackWard: undefined,
        obliqueRightBackWard: undefined,
        left: undefined,
        right: undefined,
        foward: undefined,
        backward: undefined,
      },
    },

    rook: {
      normalMove: {
        obliqueLeftFoward: undefined,
        obliqueRightFoward: undefined,
        obliqueLeftBackWard: undefined,
        obliqueRightBackWard: undefined,
        left: makeArray(8, (i) => -i),
        right: makeArray(8, (i) => i),
        foward: makeArray(8, (i) => i * 8),
        backward: makeArray(8, (i) => -i * 8),
      },

      eatMove: {
        obliqueLeftFoward: undefined,
        obliqueRightFoward: undefined,
        obliqueLeftBackWard: undefined,
        obliqueRightBackWard: undefined,
        left: makeArray(8, (i) => -i),
        right: makeArray(8, (i) => i),
        foward: makeArray(8, (i) => i * 8),
        backward: makeArray(8, (i) => -i * 8),
      },
    },
    knight: {
      normalMove: {
        obliqueLeftFoward: [6, 15],
        obliqueRightFoward: [8, 17],
        obliqueLeftBackWard: [-6, -15],
        obliqueRightBackWard: [-8, -17],
        left: undefined,
        right: undefined,
        foward: undefined,
        backward: undefined,
      },

      eatMove: {
        obliqueLeftFoward: [6, 15],
        obliqueRightFoward: [8, 17],
        obliqueLeftBackWard: [-6, -15],
        obliqueRightBackWard: [-8, -17],
        left: undefined,
        right: undefined,
        foward: undefined,
        backward: undefined,
      },
    },
    bishop: {
      normalMove: {
        obliqueLeftFoward: bishopMove(8, Index, -9, arrTd, color),
        obliqueRightFoward: bishopMove(8, Index, -7, arrTd, color),
        obliqueLeftBackWard: bishopMove(8, Index, 9, arrTd, color),
        obliqueRightBackWard: bishopMove(8, Index, 7, arrTd, color),
        left: undefined,
        right: undefined,
        foward: undefined,
        backward: undefined,
      },

      eatMove: {
        obliqueLeftFoward: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightFoward: bishopMove(Row, Index, -7, arrTd, color),
        obliqueLeftBackWard: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightBackWard: bishopMove(Row, Index, 7, arrTd, color),
        left: undefined,
        right: undefined,
        foward: undefined,
        backward: undefined,
      },
    },
    queen: {
      normalMove: {
        obliqueLeftFoward: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightFoward: bishopMove(Row, Index, -7, arrTd, color),
        obliqueLeftBackWard: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightBackWard: bishopMove(Row, Index, 7, arrTd, color),
        left: makeArray(8, (i) => -i),
        right: makeArray(8, (i) => i),
        foward: makeArray(8, (i) => i * 8),
        backward: makeArray(8, (i) => -i * 8),
      },

      eatMove: {
        obliqueLeftFoward: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightFoward: bishopMove(Row, Index, -7, arrTd, color),
        obliqueLeftBackWard: bishopMove(Row, Index, -9, arrTd, color),
        obliqueRightBackWard: bishopMove(Row, Index, 7, arrTd, color),
        left: makeArray(8, (i) => -i),
        right: makeArray(8, (i) => i),
        foward: makeArray(8, (i) => i * 8),
        backward: makeArray(8, (i) => -i * 8),
      },
    },
    king: {
      normalMove: {
        obliqueLeftFoward: [-9],
        obliqueRightFoward: [-7],
        obliqueLeftBackWard: [9],
        obliqueRightBackWard: [7],
        left: [-1],
        right: [1],
        foward: [8],
        backward: [-8],
      },

      eatMove: {
        obliqueLeftFoward: [-9],
        obliqueRightFoward: [-7],
        obliqueLeftBackWard: [9],
        obliqueRightBackWard: [7],
        left: [-1],
        right: [1],
        foward: [8],
        backward: [-8],
      },
    },
  };

  return res[type];
};

export const checkPosibleMovement = (
  pawnType,
  arrMovement,
  arrTD,
  addEvent = true
) => {
  const [index, type, number, color, boardDir] = pawnType.split("-");

  arrMovement.forEach((change) => {
    const Index = index * 1;
    const newPos = checkIligalePos(Index + change, arrTD);
    addEvent
      ? arrTD[newPos].classList.add("active")
      : arrTD[newPos].classList.remove("active");
  });
};

export const handleClickPawn = (dataSetInfo, posibleMoves, arrTD) => {
  const [index, type, number, color, boardDir] = dataSetInfo.split("-");
  const curIndex = index * 1;
  posibleMoves.forEach((el) => {
    const newIndex = checkIligalePos(curIndex + el, arrTD);
    arrTD[newIndex].addEventListener("click", (e) => {
      const indexPosTDClick = e.target.dataset?.indexPos;
      if (!indexPosTDClick) return;
      arrTD[newIndex].classList.add("active");
      movePawnToOtherPile(curIndex, indexPosTDClick);
    });
  });
};
