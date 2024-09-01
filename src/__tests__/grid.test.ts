import { gridContainer, gridItem } from "../layout/grid";
import { responsive } from "../responsive/breakpoints";

jest.mock("../responsive/breakpoints", () => ({
  responsive: jest.fn((styles) => styles),
}));

describe("Grid Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("gridContainer function", () => {
    test("default parameters", () => {
      const result = gridContainer();
      expect(responsive).toHaveBeenCalledWith({
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "auto",
        gap: "1rem",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
      });
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

    test("custom parameters", () => {
      const result = gridContainer(
        3,
        "100px",
        "20px",
        "center",
        "end",
        "space-between",
        "space-around",
      );
      expect(responsive).toHaveBeenCalledWith({
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "100px",
        gap: "20px",
        justifyItems: "center",
        alignItems: "end",
        justifyContent: "space-between",
        alignContent: "space-around",
      });
    });

    test("responsive values", () => {
      const result = gridContainer(
        { base: 1, md: 2, lg: 3 },
        { sm: "100px", xl: "200px" },
        { base: "10px", lg: "20px" },
        { base: "start", md: "center" },
        { base: "stretch", lg: "end" },
        { base: "start", xl: "space-between" },
        { md: "space-around", lg: "space-evenly" },
      );
      expect(responsive).toHaveBeenCalledWith({
        display: "grid",
        gridTemplateColumns: {
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gridTemplateRows: { sm: "100px", xl: "200px" },
        gap: { base: "10px", lg: "20px" },
        justifyItems: { base: "start", md: "center" },
        alignItems: { base: "stretch", lg: "end" },
        justifyContent: { base: "start", xl: "space-between" },
        alignContent: { md: "space-around", lg: "space-evenly" },
      });
    });
  });

  describe("gridItem function", () => {
    test("default parameters", () => {
      const result = gridItem();
      expect(responsive).toHaveBeenCalledWith({
        gridColumnStart: "auto",
        gridColumnEnd: "auto",
        gridRowStart: "auto",
        gridRowEnd: "auto",
        justifySelf: "stretch",
        alignSelf: "stretch",
      });
    });

    test("custom parameters", () => {
      const result = gridItem(1, 3, 2, 4, "center", "end");
      expect(responsive).toHaveBeenCalledWith({
        gridColumnStart: 1,
        gridColumnEnd: 3,
        gridRowStart: 2,
        gridRowEnd: 4,
        justifySelf: "center",
        alignSelf: "end",
      });
    });

    test("responsive values", () => {
      const result = gridItem(
        { base: 1, md: 2 },
        { sm: 3, lg: 4 },
        { base: "auto", xl: 2 },
        { md: 3, lg: "span 2" },
        { base: "start", lg: "center" },
        { sm: "stretch", xl: "end" },
      );
      expect(responsive).toHaveBeenCalledWith({
        gridColumnStart: { base: 1, md: 2 },
        gridColumnEnd: { sm: 3, lg: 4 },
        gridRowStart: { base: "auto", xl: 2 },
        gridRowEnd: { md: 3, lg: "span 2" },
        justifySelf: { base: "start", lg: "center" },
        alignSelf: { sm: "stretch", xl: "end" },
      });
    });
  });

  describe("processGridValue function", () => {
    test("numeric value", () => {
      const result = gridContainer(3);
      expect(result.gridTemplateColumns).toBe("repeat(3, 1fr)");
    });

    test("string value", () => {
      const result = gridContainer("1fr 2fr 1fr");
      expect(result.gridTemplateColumns).toBe("1fr 2fr 1fr");
    });

    test("responsive object with numeric and string values", () => {
      const result = gridContainer({ base: 1, sm: 2, md: "1fr 2fr", lg: 4 });
      expect(result.gridTemplateColumns).toEqual({
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "1fr 2fr",
        lg: "repeat(4, 1fr)",
      });
    });
  });
});
