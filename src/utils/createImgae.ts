export const createImage = (size: string, path: string) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/img/emptyImage.png";
};
