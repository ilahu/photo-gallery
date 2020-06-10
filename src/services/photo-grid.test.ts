import { getPhotoIndex, getPhotoRows } from "./photo-grid";

describe("photo-grid", () => {
  describe("getPhotoIndex", () => {
    it("returns the correct index", () => {
      expect(getPhotoIndex(0, 0)).toBe(0);
      expect(getPhotoIndex(0, 1)).toBe(1);
      expect(getPhotoIndex(0, 2)).toBe(2);

      expect(getPhotoIndex(1, 0)).toBe(3);
      expect(getPhotoIndex(1, 1)).toBe(4);
      expect(getPhotoIndex(1, 2)).toBe(5);

      expect(getPhotoIndex(23, 1)).toBe(70);
      expect(getPhotoIndex(41, 12)).toBe(135);
    });
  });

  describe("getPhotoRows", () => {
    const photos = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
      caption: `Caption text ${num}`,
      source: {
        regular: `example/photo${num}.jpg`,
        thumbnail: `example/photo${num}_thumb.jpg`,
      },
    }));

    it("returns a new array that contains correct rows and columns", () => {
      const photoRows = getPhotoRows(photos);

      expect(photoRows[0][0]).toEqual(photos[0]);
      expect(photoRows[0][1]).toEqual(photos[1]);
      expect(photoRows[0][2]).toEqual(photos[2]);

      expect(photoRows[1][0]).toEqual(photos[3]);
      expect(photoRows[1][1]).toEqual(photos[4]);
      expect(photoRows[1][2]).toEqual(photos[5]);

      expect(photoRows[2][0]).toEqual(photos[6]);
    });
  });
});
