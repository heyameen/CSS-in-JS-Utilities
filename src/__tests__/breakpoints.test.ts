import { responsive, type ResponsiveValue } from "../responsive/breakpoints"; // Adjust the import path

const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("responsive", () => {
  beforeEach(() => {
    // Clear any previous mock
    jest.clearAllMocks();
  });

  it("should return base value when window width is less than smallest breakpoint", () => {
    mockWindowWidth(500);
    const value: ResponsiveValue<string> = { base: "100%", md: "250px" };
    const resolved = responsive({ width: value });

    expect(resolved.width).toBe("100%");
  });

  it("should return md value when window width matches md breakpoint", () => {
    mockWindowWidth(800);
    const value: ResponsiveValue<string> = { base: "100%", md: "250px" };
    const resolved = responsive({ width: value });

    expect(resolved.width).toBe("250px");
  });

  it("should return the highest matching breakpoint value", () => {
    mockWindowWidth(1300);
    const value: ResponsiveValue<string> = {
      base: "100%",
      lg: "300px",
      xl: "400px",
    };
    const resolved = responsive({ width: value });

    expect(resolved.width).toBe("400px");
  });

  it("should use base value if no breakpoints match", () => {
    mockWindowWidth(600);
    const value: ResponsiveValue<string> = { base: "100%" };
    const resolved = responsive({ width: value });

    expect(resolved.width).toBe("100%");
  });

  it("should handle non-responsive styles", () => {
    const styles = { color: "red" };
    const resolved = responsive(styles);

    expect(resolved.color).toBe("red");
  });
});
