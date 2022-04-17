import {
  makeArray,
  movePawnToOtherPile,
  removeEventListenerByQuery,
  selectElement,
  toLog,
} from "./Helpers/helperFun.js";

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
  // toLog({ nextPile });
  // toLog({ nextPile, bool: getDataFromDataSet(nextPile, 3) !== color });
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

// const makeCountinueLoop = (change, curIndex, arrTd, color) => {
//   const newPos = checkIligalePos(change + curIndex, arrTd);
//   // toLog({ newPos });
//   // console.log(getNextPileChild(newPos, arrTd));
//   // if (
//   //   getNextPileChild(newPos, arrTd)?.dataset.typePawn?.split("-")[3] !== color
//   // )
//   toLog({ newPos: getNextPileChild(newPos, arrTd) });
//   return !(
//     getNextPileChild(newPos, arrTd)?.dataset.typePawn?.split("-")[3] !== color
//   );
// };

const bishopMove = (lengthLoop, curIndex, change, arrTd, color) => {
  return getNextPileChild(curIndex + change, arrTd)?.dataset.typePawn?.split(
    "-"
  )[3] === color
    ? []
    : makeArray(
        lengthLoop,
        (i) => obliquePossibleMovment(i * change, curIndex, arrTd, color)
        // (i) => {
        //   return makeCountinueLoop(i * change, curIndex, arrTd, color);
        // }
      );
};

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
  // console.log(index);
  const Index = index * 1;
  // console.log(Index);
  // console.log(arrTd[Index]);
  // console.log(arrTd[Index].dataset?.indexPos);
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

export const checkPosibleMovement = (pawnType, arrMovement, arrTD) => {
  const [index, type, number, color, playerTurn] = pawnType.split("-");

  arrMovement.forEach((change) => {
    const Index = index * 1;
    const newPos = checkIligalePos(Index + change, arrTD);

    // arrTD[Index].firstElementChild?.addEventListener("mouseenter", (e) => {
    //   arrTD[newPos].classList.add("active");
    // });
    // arrTD[Index].firstElementChild?.addEventListener("mouseleave", (e) => {
    //   arrTD[newPos].classList.remove("active");
    // });
  });
};

export const handleClickPawn = (dataSetInfo, posibleMoves, arrTD) => {
  const [index, type, number, color, playerTurn] = dataSetInfo.split("-");
  const curIndex = index * 1;

  posibleMoves.forEach((el) => {
    const newIndex = checkIligalePos(curIndex + el, arrTD);
    arrTD[newIndex].addEventListener("click", (e) => {
      const indexPosTDClick = e.target.dataset?.indexPos;
      if (!indexPosTDClick) return;

      movePawnToOtherPile(curIndex, indexPosTDClick);
    });
  });
};