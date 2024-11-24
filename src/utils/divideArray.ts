export const divideArray = (
  arrLength: number,
  offset: number,
  index: number
) => {
  const remainSize = arrLength - offset * index;
  return [
    remainSize > offset ? offset * index : offset * (index - 1) + remainSize,
    remainSize,
  ];
};
