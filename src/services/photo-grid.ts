import { chunk } from "lodash";

export interface Photo {
  caption: string;
  source: {
    regular: string;
    thumbnail: string;
  };
}

const ROW_COL_COUNT = 3;

/**
 * Returns the index of a photo within the one-dimensional array.
 */
export const getPhotoIndex = (rowIndex: number, colIndex: number) =>
  colIndex + rowIndex * ROW_COL_COUNT;

/**
 * Split photos into rows and columns. Returns a two-dimensional array.
 */
export const getPhotoRows = (photos: Photo[]) => chunk(photos, ROW_COL_COUNT);
