import { checkIligalePos, movePawnToOtherPile } from "./pawnMovementHelpers.js";

export const handlePosibleMovment = (
  pawnType,
  arrMovement,
  arrTD,
  addEvent = true
) => {
  const [index, type, number, color, boardDir] = pawnType.split("-");

  arrMovement.forEach((change) => {
    const Index = index * 1;
    const newPos = checkIligalePos(Index + change, Index, arrTD);
    addEvent
      ? arrTD[newPos].classList.add("active")
      : arrTD[newPos].classList.remove("active");
  });
};

export const handleClickPawn = (dataSetInfo, posibleMoves, arrTD) => {
  const [index, type, number, color, boardDir] = dataSetInfo.split("-");
  const curIndex = index * 1;
  posibleMoves.forEach((el) => {
    console.log(el);
    const newIndex = checkIligalePos(curIndex + el, curIndex, arrTD);
    arrTD[newIndex].addEventListener("click", (e) => {
      const indexPosTDClick = e.target.dataset?.indexPos;
      if (!indexPosTDClick) return;
      arrTD[newIndex].classList.add("active");
      movePawnToOtherPile(curIndex, indexPosTDClick);
    });
  });
};
