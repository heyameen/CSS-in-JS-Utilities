import {
  keyframe,
  animation,
  multipleAnimations,
  getAllKeyframes,
  clearKeyframes,
} from "../animation/animations";
import * as helper from "../helper/createStyle";
import { isServer } from "../helper/createStyle";

// Mock the appendToStyleElement function
jest.mock("../helper/createStyle", () => ({
  appendToStyleElement: jest.fn(),
}));

describe("Animation Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearKeyframes();
    (isServer as any) = false;
  });

  describe("keyframe", () => {
    it("should generate a keyframe string", () => {
      const result = keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(result).toBe(
        "@keyframes testAnimation { 0% { opacity: 0; } 100% { opacity: 1; } }",
      );
    });

    it("should add keyframe to store", () => {
      keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(getAllKeyframes()).toContain("@keyframes testAnimation");
    });

    it("should call appendToStyleElement when not on server", () => {
      (global as any).isServer = false;
      keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(helper.appendToStyleElement).toHaveBeenCalled();
    });

    it("should not call appendToStyleElement when on server", () => {
      (isServer as any) = true;
      keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(helper.appendToStyleElement).not.toHaveBeenCalled();
    });

    it("should handle multiple properties in a keyframe", () => {
      const result = keyframe("complexAnimation", {
        "0%": { opacity: "0", transform: "scale(0.5)" },
        "50%": { opacity: "0.5", transform: "scale(0.75)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      });
      expect(result).toBe(
        "@keyframes complexAnimation { 0% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.5; transform: scale(0.75); } 100% { opacity: 1; transform: scale(1); } }",
      );
    });

    it("should call appendToStyleElement when not on server", () => {
      (isServer as any) = false;
      keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(helper.appendToStyleElement).toHaveBeenCalled();
    });

    it("should not call appendToStyleElement when on server", () => {
      (isServer as any) = true;
      keyframe("testAnimation", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(helper.appendToStyleElement).not.toHaveBeenCalled();
    });
  });

  describe("animation", () => {
    it("should generate an animation string with default values", () => {
      const result = animation("testAnimation");
      expect(result).toEqual({
        animation: "testAnimation 1s ease 0s 1 normal none running",
      });
    });

    it("should accept custom values", () => {
      const result = animation(
        "testAnimation",
        "2s",
        "linear",
        "0.5s",
        "infinite",
        "reverse",
        "forwards",
        "paused",
      );
      expect(result).toEqual({
        animation:
          "testAnimation 2s linear 0.5s infinite reverse forwards paused",
      });
    });

    it("should convert number values to milliseconds", () => {
      const result = animation("testAnimation", 2000, "ease", 500);
      expect(result).toEqual({
        animation: "testAnimation 2000ms ease 500ms 1 normal none running",
      });
    });

    it("should throw an error for invalid duration or delay", () => {
      expect(() => animation("testAnimation", "invalid")).toThrow(
        "Invalid duration or delay value",
      );
      expect(() => animation("testAnimation", "1s", "ease", "invalid")).toThrow(
        "Invalid duration or delay value",
      );
    });

    it("should throw an error for negative iteration count", () => {
      expect(() => animation("testAnimation", "1s", "ease", "0s", -1)).toThrow(
        'Iteration count must be a positive number or "infinite".',
      );
    });

    it("should handle 'infinite' as iteration count", () => {
      const result = animation("testAnimation", "1s", "ease", "0s", "infinite");
      expect(result).toEqual({
        animation: "testAnimation 1s ease 0s infinite normal none running",
      });
    });
  });

  describe("multipleAnimations", () => {
    it("should combine multiple animations", () => {
      const anim1 = animation("testAnimation1", "1s");
      const anim2 = animation("testAnimation2", "2s", "linear");
      const result = multipleAnimations(anim1, anim2);
      expect(result).toEqual({
        animation:
          "testAnimation1 1s ease 0s 1 normal none running, testAnimation2 2s linear 0s 1 normal none running",
      });
    });

    it("should accept string animations", () => {
      const result = multipleAnimations("anim1 1s", "anim2 2s");
      expect(result).toEqual({ animation: "anim1 1s, anim2 2s" });
    });

    it("should handle mixed string and object animations", () => {
      const anim = animation("testAnimation", "1s");
      const result = multipleAnimations(anim, "customAnim 2s");
      expect(result).toEqual({
        animation:
          "testAnimation 1s ease 0s 1 normal none running, customAnim 2s",
      });
    });

    it("should handle an empty input", () => {
      const result = multipleAnimations();
      expect(result).toEqual({ animation: "" });
    });
  });

  describe("getAllKeyframes", () => {
    it("should return all stored keyframes", () => {
      keyframe("anim1", { "0%": { opacity: "0" }, "100%": { opacity: "1" } });
      keyframe("anim2", { "0%": { scale: "1" }, "100%": { scale: "2" } });
      const result = getAllKeyframes();
      expect(result).toContain("@keyframes anim1");
      expect(result).toContain("@keyframes anim2");
    });

    it("should return an empty string when no keyframes are stored", () => {
      const result = getAllKeyframes();
      expect(result).toBe("");
    });

    it("should return keyframes in the order they were added", () => {
      keyframe("first", { "0%": { opacity: "0" }, "100%": { opacity: "1" } });
      keyframe("second", { "0%": { scale: "1" }, "100%": { scale: "2" } });
      const result = getAllKeyframes();
      expect(result).toBe(
        "@keyframes first { 0% { opacity: 0; } 100% { opacity: 1; } }\n" +
          "@keyframes second { 0% { scale: 1; } 100% { scale: 2; } }",
      );
    });
  });

  describe("clearKeyframes", () => {
    it("should clear all stored keyframes", () => {
      keyframe("testAnim", {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      });
      expect(getAllKeyframes()).not.toBe("");
      clearKeyframes();
      expect(getAllKeyframes()).toBe("");
    });
  });
});
