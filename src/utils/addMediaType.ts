import { IItemListResults, TMediaType } from "../type";

export const addMediatype = (
  data: IItemListResults,
  mediaType: TMediaType | undefined
): IItemListResults => {
  const addMediaTypeResults = data.results.map((result) => ({
    ...result,
    media_type: result.media_type ?? mediaType,
  }));

  const allowedMediaType: TMediaType[] = ["tv", "movie"];
  const filterdMediaTypeResults = addMediaTypeResults.filter((result) =>
    allowedMediaType.includes(result.media_type)
  );

  return { ...data, results: filterdMediaTypeResults };
};
