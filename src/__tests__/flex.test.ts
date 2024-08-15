import { flexContainer, flexItem } from "../layout/flex";

describe("Flex Utilities", () => {
  describe("flexContainer", () => {
    test("creates correct styles with default values", () => {
      const result = flexContainer();
      expect(result).toEqual({
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
      });
    });

    test("creates correct styles with custom values", () => {
      const result = flexContainer("column", "space-around", "end");
      expect(result).toEqual({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "end",
      });
    });
  });

  describe("flexItem", () => {
    test("creates correct styles with default values", () => {
      const result = flexItem();
      expect(result).toEqual({
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 1,
      });
    });

    test("creates correct styles with custom grow", () => {
      const result = flexItem(2);
      expect(result).toEqual({
        flexBasis: "auto",
        flexGrow: 2,
        flexShrink: 1,
      });
    });

    test("creates correct styles with custom grow and basis", () => {
      const result = flexItem(2, "100px");
      expect(result).toEqual({
        flexBasis: "100px",
        flexGrow: 2,
        flexShrink: 1,
      });
    });

    test("creates correct styles with custom grow, shrink, and basis", () => {
      const result = flexItem(2, "100px", 0);
      expect(result).toEqual({
        flexBasis: "100px",
        flexGrow: 2,
        flexShrink: 0,
      });
    });
  });
});
