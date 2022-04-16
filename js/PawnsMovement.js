import { makeArray } from "./Helpers/helperFun.js";

export const checkDir = (playerTurn, color, number) =>
  (playerTurn === "1" && color === "white") ||
  (playerTurn === "2" && color === "black")
    ? number * -1
    : number;

const checkIligalePos = (index, arr) => {
  let length = arr.length - 1;
  let Index = index * 1;
  return Index > length ? length : Index < 0 ? 0 : Index;
};
const getNextPileChild = (index, arr) =>
  arr[checkIligalePos(index, arr)]?.firstElementChild;

const obliquePossibleMovment = (change, curIndex, arr, color) => {
  const newIndex = checkIligalePos(curIndex + change, arr);
  const [row, coulmn] = arr[curIndex]?.dataset.indexPos.split(",");
  const [rowNext, coulmnNext] = arr[newIndex]?.dataset.indexPos.split(",");

  if (
    !(Math.abs(rowNext - row) === Math.abs(coulmnNext - coulmn)) ||
    getNextPileChild(newIndex, arr)?.dataset.typePawn?.split("-")[3] === color
  ) {
    console.log(
      "newIndex",
      arr[newIndex],
      arr[newIndex]?.dataset.indexPos,
      Math.abs(rowNext - row) === Math.abs(coulmnNext - coulmn)
    );
    return curIndex;
  }
  // if (
  //   getNextPileChild(newIndex, arr)?.dataset.typePawn?.split("-")[3] === color
  // )
  //   return curIndex;

  return change;
};

const makeCountionuLoop = (change, curIndex, arrTd, color) => {
  const newPos = checkIligalePos(change + curIndex, arrTd);

  return (
    getNextPileChild(newPos, arrTd)?.dataset.typePawn?.split("-")[3] !== color
  );
};

const bishopMove = (lengthLoop, curIndex, change, arrTd, color) =>
  getNextPileChild(curIndex + change, arrTd)?.dataset.typePawn?.split(
    "-"
  )[3] === color
    ? []
    : makeArray(
        lengthLoop,
        (i) => obliquePossibleMovment(i * change, curIndex, arrTd, color),
        (i) => {
          return makeCountionuLoop(i * change, curIndex, arrTd, color);
        }
      );

const pawnMove = (curIndex, change, arrTd, playerTurn, color) => {
  return getNextPileChild(
    curIndex + checkDir(playerTurn, color, change),
    arrTd
  )?.dataset.typePawn?.split("-")[3] === color
    ? []
    : [checkDir(playerTurn, color, change)];
};

export const posibleMovement = (pawnType, arrTd) => {
  const [index, type, number, color, playerTurn] = pawnType.split("-");
  const Index = index * 1;
  console.log(arrTd[Index]);
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
        foward: pawnMove(Index, 8, arrTd, playerTurn, color),
        backward: undefined,
      },

      eatMove: {
        obliqueLeftFoward: pawnMove(Index, 9, arrTd, playerTurn, color),
        obliqueRightFoward: pawnMove(Index, 7, arrTd, playerTurn, color),
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
      illegalMove: {
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
        obliqueLeftBackWard: bishopMove(8, Index, -9, arrTd, color),
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
  arrMovment,

  arrTD
) => {
  const [index, type, number, color, playerTurn] = pawnType.split("-");
  arrMovment.forEach((change) => {
    const Index = index * 1;
    const numChange = change * 1;
    const newPos = Index + numChange;
    // console.log(newPos);
    if (arrTD[newPos]) {
      arrTD[Index].firstElementChild?.addEventListener("mouseenter", (e) => {
        arrTD[newPos].classList.add("active");
      });
      arrTD[Index].firstElementChild?.addEventListener("mouseleave", (e) => {
        arrTD[newPos].classList.remove("active");
      });
    }
  });
};
