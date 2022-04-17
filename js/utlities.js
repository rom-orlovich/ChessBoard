export const createImg = (src, alt = "image not found") => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
};
