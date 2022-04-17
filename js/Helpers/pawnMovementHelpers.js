import { selectElement, editDataSet } from "./utilitesFun.js";

export const checkDir = (boardDir, color, number) =>
  (boardDir === "1" && color === "white") ||
  (boardDir === "2" && color === "black")
    ? number * -1
    : number;

export const checkIligalePos = (index, arr) => {
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

export const checkTheBoarderOfPile = (index, change, color, arr) => {
  const nextPile = getNextPileChild(index - 7, arr);
  return nextPile && getDataFromDataSet(nextPile, 3) !== color;
};

export const movePawnToOtherPile = (queryPos, newPos) => {
  const choosenImg = selectElement(`img[data-type-pawn*="${queryPos}"]`);
  const choosenTD = selectElement(`td[data-index-pos*="${newPos}"]`);
  if (!(choosenImg && choosenTD)) return;
  const dataSetImg = choosenImg?.dataset?.typePawn;
  const indexPile = choosenTD?.dataset.indexPile;
  choosenImg.dataset.typePawn = editDataSet(indexPile, 0, "-", dataSetImg);
  choosenImg?.parentNode?.removeChild(choosenImg);
  return (
    !choosenTD?.firstElementChild &&
    choosenTD.appendChild(choosenImg) &&
    choosenTD.classList.remove("active")
  );
};
