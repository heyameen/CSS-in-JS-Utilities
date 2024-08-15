import { gridContainer, gridItem } from "../layout/grid";

describe("Grid Utilities", () => {
  describe("gridContainer", () => {
    test("creates correct styles with default values", () => {
      const result = gridContainer();
      expect(result).toEqual({
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "auto",
        gap: "1rem",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
      });
    });

    test("creates correct styles with custom values", () => {
      const result = gridContainer(
        3,
        2,
        "20px",
        "center",
        "end",
        "space-between",
        "space-around",
      );
      expect(result).toEqual({
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "20px",
        justifyItems: "center",
        alignItems: "end",
        justifyContent: "space-between",
        alignContent: "space-around",
      });
    });

    test("handles string values for columns and rows", () => {
      const result = gridContainer("1fr 2fr", "auto 1fr");
      expect(result).toEqual({
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "auto 1fr",
        gap: "1rem",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
      });
    });

    test("creates correct styles with responsive values", () => {
      const result = gridContainer(
        { base: 1, md: 2, lg: 3 },
        { base: "auto", lg: "1fr 2fr" },
        { base: "1rem", md: "20px" },
      );
      expect(result).toEqual({
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "auto",
        gap: "1rem",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
        "@media (min-width: 768px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        },
        "@media (min-width: 1024px)": {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "1fr 2fr",
        },
      });
    });
  });

  describe("gridItem", () => {
    test("creates correct styles with default values", () => {
      const result = gridItem();
      expect(result).toEqual({
        gridColumnStart: "auto",
        gridColumnEnd: "auto",
        gridRowStart: "auto",
        gridRowEnd: "auto",
        justifySelf: "stretch",
        alignSelf: "stretch",
      });
    });

    test("creates correct styles with custom values", () => {
      const result = gridItem(2, 4, 1, 3, "start", "end");
      expect(result).toEqual({
        gridColumnStart: 2,
        gridColumnEnd: 4,
        gridRowStart: 1,
        gridRowEnd: 3,
        justifySelf: "start",
        alignSelf: "end",
      });
    });

    test('handles "auto" values', () => {
      const result = gridItem(
        "auto",
        "auto",
        "auto",
        "auto",
        "center",
        "center",
      );
      expect(result).toEqual({
        gridColumnStart: "auto",
        gridColumnEnd: "auto",
        gridRowStart: "auto",
        gridRowEnd: "auto",
        justifySelf: "center",
        alignSelf: "center",
      });
    });

    test("creates correct styles with responsive values", () => {
      const result = gridItem(
        { base: 1, md: 2 },
        { base: 2, lg: 4 },
        { base: "auto", md: 1 },
        { base: "auto", lg: 3 },
        { base: "start", md: "center" },
        { base: "stretch", lg: "end" },
      );
      expect(result).toEqual({
        gridColumnStart: 1,
        gridColumnEnd: 2,
        gridRowStart: "auto",
        gridRowEnd: "auto",
        justifySelf: "start",
        alignSelf: "stretch",
        "@media (min-width: 768px)": {
          gridColumnStart: 2,
          gridRowStart: 1,
          justifySelf: "center",
        },
        "@media (min-width: 1024px)": {
          gridColumnEnd: 4,
          gridRowEnd: 3,
          alignSelf: "end",
        },
      });
    });
  });
});
