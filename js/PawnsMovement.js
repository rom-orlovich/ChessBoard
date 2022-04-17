import { makeArray } from "./Helpers/utilitesFun.js";
import {
  checkDir,
  checkIligalePos,
  getDataFromDataSet,
  getNextPileChild,
  movePawnToOtherPile,
} from "./Helpers/pawnMovementHelpers.js";

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
  return change;
};

const breakLoop = (change, curIndex, arrTd, color) => {
  const newPos = change + curIndex;
  const nextPileChild = getNextPileChild(newPos, arrTd);
  if (!nextPileChild) return;
  const getColorDataSet = getDataFromDataSet(nextPileChild, 3);
  return getColorDataSet !== color;
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

export const posibleMovementsObj = (pawnType, arrTd) => {
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
