import { transition, multipleTransitions } from "../effects/transitions";

describe("Transition Utilities", () => {
  describe("transition function", () => {
    test("default parameters", () => {
      expect(transition()).toEqual({
        transition: "all 300ms ease 0ms",
      });
    });

    test("custom parameters", () => {
      expect(transition("opacity", 500, "ease-in", 100)).toEqual({
        transition: "opacity 500ms ease-in 100ms",
      });
    });

    test("custom transition property", () => {
      expect(transition("background-color")).toEqual({
        transition: "background-color 300ms ease 0ms",
      });
    });

    test("cubic-bezier timing function", () => {
      expect(
        transition("all", 300, "cubic-bezier(0.25, 0.1, 0.25, 1)"),
      ).toEqual({
        transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms",
      });
    });

    test("steps timing function", () => {
      expect(transition("all", 300, "steps(4, end)")).toEqual({
        transition: "all 300ms steps(4, end) 0ms",
      });
    });

    test("throws error for negative duration", () => {
      expect(() => transition("all", -100)).toThrow(
        "Duration must be a non-negative number",
      );
    });

    test("throws error for negative delay", () => {
      expect(() => transition("all", 300, "ease", -50)).toThrow(
        "Delay must be a non-negative number",
      );
    });

    test("throws error for invalid timing function", () => {
      expect(() => transition("all", 300, "invalid-timing" as any)).toThrow(
        "Invalid timing function",
      );
    });

    test("warns for very long duration", () => {
      console.warn = jest.fn();
      transition("all", 15000);
      expect(console.warn).toHaveBeenCalledWith(
        "Very long duration or delay detected. Ensure this is intentional.",
      );
    });

    test("warns for very long delay", () => {
      console.warn = jest.fn();
      transition("all", 300, "ease", 15000);
      expect(console.warn).toHaveBeenCalledWith(
        "Very long duration or delay detected. Ensure this is intentional.",
      );
    });
  });

  describe("multipleTransitions function", () => {
    test("combines multiple transitions", () => {
      const t1 = transition("opacity", 300);
      const t2 = transition("transform", 500, "ease-in");
      expect(multipleTransitions(t1, t2)).toEqual({
        transition: "opacity 300ms ease 0ms, transform 500ms ease-in 0ms",
      });
    });

    test("handles single transition", () => {
      const t = transition("width", 200, "linear");
      expect(multipleTransitions(t)).toEqual({
        transition: "width 200ms linear 0ms",
      });
    });

    test("throws error for invalid transition object", () => {
      expect(() => multipleTransitions({ invalid: "object" } as any)).toThrow(
        "Invalid transition object",
      );
    });

    test("handles empty input", () => {
      expect(multipleTransitions()).toEqual({
        transition: "",
      });
    });
  });
});
