export const sliceArray = (
  arr: any[],
  startIndex: number,
  endIndex: number
) => {
  const length = arr.length;
  const isStartNegative = startIndex < 0;
  let result: any[] = [];
  let frontPiece: any[] = [];

  if (isStartNegative) {
    frontPiece.push(...arr.slice(startIndex));
  }

  for (let i = isStartNegative ? 0 : startIndex; i < endIndex; i++) {
    const index = i % length;
    result.push(arr[index]);
  }

  return frontPiece.concat(result);
};
