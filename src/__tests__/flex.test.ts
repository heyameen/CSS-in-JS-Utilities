import { flexContainer, flexItem } from "../layout/flex";
import { responsive } from "../responsive/breakpoints";

jest.mock("../responsive/breakpoints", () => ({
  responsive: jest.fn((styles) => styles),
}));

describe("Flex Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("flexContainer function", () => {
    test("default parameters", () => {
      const result = flexContainer();
      expect(responsive).toHaveBeenCalledWith({
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
      });
      expect(result).toEqual({
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "stretch",
      });
    });

    test("custom parameters", () => {
      const result = flexContainer("column", "center", "baseline");
      expect(responsive).toHaveBeenCalledWith({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
      });
      expect(result).toEqual({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
      });
    });

    test("responsive values", () => {
      const result = flexContainer(
        { base: "row", md: "column" },
        { base: "start", lg: "space-between" },
        { sm: "center", xl: "stretch" },
      );
      expect(responsive).toHaveBeenCalledWith({
        display: "flex",
        flexDirection: { base: "row", md: "column" },
        justifyContent: { base: "start", lg: "space-between" },
        alignItems: { sm: "center", xl: "stretch" },
      });
      expect(result).toEqual({
        display: "flex",
        flexDirection: { base: "row", md: "column" },
        justifyContent: { base: "start", lg: "space-between" },
        alignItems: { sm: "center", xl: "stretch" },
      });
    });
  });

  describe("flexItem function", () => {
    test("default parameters", () => {
      const result = flexItem();
      expect(responsive).toHaveBeenCalledWith({
        flexGrow: 0,
        flexBasis: "auto",
        flexShrink: 1,
      });
      expect(result).toEqual({
        flexGrow: 0,
        flexBasis: "auto",
        flexShrink: 1,
      });
    });

    test("custom parameters", () => {
      const result = flexItem(1, "50%", 0);
      expect(responsive).toHaveBeenCalledWith({
        flexGrow: 1,
        flexBasis: "50%",
        flexShrink: 0,
      });
      expect(result).toEqual({
        flexGrow: 1,
        flexBasis: "50%",
        flexShrink: 0,
      });
    });

    test("responsive values", () => {
      const result = flexItem(
        { base: 0, md: 1 },
        { sm: "100px", lg: "200px" },
        { base: 1, xl: 0 },
      );
      expect(responsive).toHaveBeenCalledWith({
        flexGrow: { base: 0, md: 1 },
        flexBasis: { sm: "100px", lg: "200px" },
        flexShrink: { base: 1, xl: 0 },
      });
      expect(result).toEqual({
        flexGrow: { base: 0, md: 1 },
        flexBasis: { sm: "100px", lg: "200px" },
        flexShrink: { base: 1, xl: 0 },
      });
    });

    test("numeric flex-basis", () => {
      const result = flexItem(1, 100, 1);
      expect(responsive).toHaveBeenCalledWith({
        flexGrow: 1,
        flexBasis: 100,
        flexShrink: 1,
      });
      expect(result).toEqual({
        flexGrow: 1,
        flexBasis: 100,
        flexShrink: 1,
      });
    });
  });
});
