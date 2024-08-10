"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animations_1 = require("../animation/animations");
describe("Animation Utilities", () => {
    describe("keyframe", () => {
        it("creates correct keyframe string with single property", () => {
            const result = (0, animations_1.keyframe)("fadeIn", {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
            });
            expect(result).toBe("@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }");
        });
        it("handles multiple properties in keyframe", () => {
            const result = (0, animations_1.keyframe)("slideIn", {
                from: { opacity: 0, transform: "translateY(-20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
            });
            expect(result).toBe("@keyframes slideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }");
        });
    });
    describe("animation", () => {
        it("creates animation string with default values", () => {
            expect((0, animations_1.animation)("fadeIn")).toBe("fadeIn 1s ease 0s 1 normal none running");
        });
        it("creates animation string with custom values", () => {
            const result = (0, animations_1.animation)("slideIn", "0.5s", "ease-out", "0.2s", "infinite", "alternate", "forwards", "paused");
            expect(result).toBe("slideIn 0.5s ease-out 0.2s infinite alternate forwards paused");
        });
        it("handles numeric duration and delay", () => {
            expect((0, animations_1.animation)("fadeIn", 500, "linear", 200)).toBe("fadeIn 500ms linear 200ms 1 normal none running");
        });
        it("throws error for invalid duration", () => {
            expect(() => (0, animations_1.animation)("fadeIn", "invalid")).toThrow("Invalid duration or delay value");
        });
        it("throws error for invalid delay", () => {
            expect(() => (0, animations_1.animation)("fadeIn", "1s", "ease", "invalid")).toThrow("Invalid duration or delay value");
        });
        it("throws error for negative iteration count", () => {
            expect(() => (0, animations_1.animation)("fadeIn", "1s", "ease", "0s", -1)).toThrow('Iteration count must be a positive number or "infinite"');
        });
    });
    describe("multipleAnimations", () => {
        it("combines multiple animations correctly", () => {
            const result = (0, animations_1.multipleAnimations)((0, animations_1.animation)("fadeIn", "1s"), (0, animations_1.animation)("slideIn", "0.5s", "ease-out", "0.2s"));
            expect(result).toEqual({
                animation: "fadeIn 1s ease 0s 1 normal none running, slideIn 0.5s ease-out 0.2s 1 normal none running",
            });
        });
        it("handles single animation", () => {
            const result = (0, animations_1.multipleAnimations)((0, animations_1.animation)("rotate", "2s", "linear", "0s", "infinite"));
            expect(result).toEqual({
                animation: "rotate 2s linear 0s infinite normal none running",
            });
        });
        it("returns empty string for no animations", () => {
            expect((0, animations_1.multipleAnimations)()).toEqual({ animation: "" });
        });
    });
});
