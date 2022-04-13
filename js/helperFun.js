export const createEl = (str) => {
  const temp = document.createElement("template");
  temp.innerHTML = str.trim();
  return temp["content"].firstElementChild;
};
export const createImgHtml = (src, alt = "Image not found") => {
  return `<img src="${src}" alt="${alt}"/> `;
};

export const addEventListenerByQuery = (nameEvent, handler, query) => {
  const element = document.querySelector(query);
  element.addEventListener(nameEvent, handler);
};
