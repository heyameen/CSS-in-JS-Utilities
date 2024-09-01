import { boxShadow, textShadow } from "../effects/shadows";

describe("Shadow Utilities", () => {
  describe("boxShadow", () => {
    test("generates default box shadow", () => {
      expect(boxShadow()).toEqual({
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
      });
    });

    test("generates box shadow with custom size", () => {
      expect(boxShadow("lg")).toEqual({
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
      });
    });

    test("generates box shadow with custom color", () => {
      expect(boxShadow("md", "rgba(255, 0, 0, 0.5)")).toEqual({
        boxShadow: "0px 2px 4px 0px rgba(255, 0, 0, 0.5)",
      });
    });

    test("generates inset box shadow", () => {
      expect(boxShadow("sm", "black", true)).toEqual({
        boxShadow: "inset 0px 1px 2px 0px black",
      });
    });

    test("generates box shadow with custom values", () => {
      expect(boxShadow({ x: 1, y: 2, blur: 3, spread: 4 }, "blue")).toEqual({
        boxShadow: "1px 2px 3px 4px blue",
      });
    });

    test("throws error for invalid size", () => {
      expect(() => boxShadow("invalid" as any)).toThrow("Invalid shadow size");
    });

    test("throws error for invalid color", () => {
      expect(() => boxShadow("md", "invalid-color")).toThrow(
        "Invalid color value",
      );
    });
  });

  describe("textShadow", () => {
    test("generates default text shadow", () => {
      expect(textShadow()).toEqual({
        textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      });
    });

    test("generates text shadow with custom size", () => {
      expect(textShadow("xl")).toEqual({
        textShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      });
    });

    test("generates text shadow with custom color", () => {
      expect(textShadow("md", "#FF0000")).toEqual({
        textShadow: "0px 2px 4px #FF0000",
      });
    });

    test("generates text shadow with custom values", () => {
      expect(
        textShadow({ x: 1, y: 2, blur: 3 }, "rgba(0, 255, 0, 0.5)"),
      ).toEqual({
        textShadow: "1px 2px 3px rgba(0, 255, 0, 0.5)",
      });
    });

    test("throws error for invalid size", () => {
      expect(() => textShadow("invalid" as any)).toThrow("Invalid shadow size");
    });

    test("throws error for invalid color", () => {
      expect(() => textShadow("md", "not-a-color")).toThrow(
        "Invalid color value",
      );
    });
  });
});
