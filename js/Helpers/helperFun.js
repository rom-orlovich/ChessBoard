export const toLog = (vars) => {
  const key = Object.keys(vars);
  key.forEach((el) => {
    console.log(el, vars[el]);
  });
};
export const createEl = (str) => {
  const temp = document.createElement("template");
  temp.innerHTML = str.trim();
  return temp["content"].firstElementChild;
};

export const createImgHtml = (src, alt = "Image not found") => {
  return `<img src="${src}" alt="${alt}"/> `;
};
export const selectElement = (query, scope = document) => {
  return scope.querySelector(query);
};
export const selectAllElements = (query, scope = document) => {
  return scope.querySelectorAll(query);
};
export const addEventListenerByQuery = (nameEvent, handler, query) => {
  const element = selectElement(query);
  element.addEventListener(nameEvent, handler);
  return element;
};
export const removeEventListenerByQuery = (nameEvent, handler, query) => {
  const element = selectElement(query);
  element.removeEventListener(nameEvent, handler);
  return element;
};

export const addEventListenerByQueryAll = (nameEvent, handler, query) => {
  const elements = selectAllElements(query);
  elements.forEach((el) => el.addEventListener(nameEvent, handler));
  return elements;
};
// לכתוב פונקציית ברייקר
export const makeArrayToSet = (arr) => [...new Set(arr)];

export const makeArray = (
  num,
  handler = undefined,
  breakFun = (i) => false
) => {
  const arr = [];
  for (let i = 1; i < num; i++) {
    const breakRes = breakFun(i);
    handler ? arr.push(handler(i)) : arr.push(i);
    if (breakRes) break;
  }

  return makeArrayToSet(arr);
};

export const getObjKeyWithValue = (obj) => {
  let newObj = {};

  for (const key in obj) {
    if (obj[key])
      newObj = {
        ...newObj,
        [key]: obj[key],
      };
  }
  return newObj;
};

export const genrateObjKeyValueToArr = (obj) => {
  let arr = [];

  for (const key in obj) {
    if (obj[key] instanceof Array) arr = [...arr, ...obj[key]];
  }
  return makeArrayToSet(arr);
};

const editDataSet = (newStr, pos, querySplit, str) => {
  const arrStr = str.split(querySplit)?.slice();
  arrStr[pos] = newStr;
  return arrStr.join(querySplit);
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
