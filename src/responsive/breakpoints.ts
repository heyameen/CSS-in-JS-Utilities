import { appendToStyleElement } from "../helper/createStyle";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

let responsiveProps: Map<string, ResponsiveValue<string>> = new Map();
let propIndex = 0;
let isServer = typeof window === "undefined";

const getResizeListener = (() => {
  let listenerAdded = false;
  return () => {
    if (!listenerAdded && !isServer) {
      window.addEventListener("resize", updateStyles, { passive: true });
      listenerAdded = true;
    }
  };
})();

function responsive<T extends Record<string, ResponsiveValue<any>>>(
  styles: T,
): T {
  const result: any = {};

  for (const [key, value] of Object.entries(styles)) {
    const propName = `--css-in-js-utils-${propIndex++}`;
    if (typeof value === "object" && value !== null) {
      responsiveProps.set(propName, stringifyValue(value));
    } else {
      responsiveProps.set(propName, stringifyValue({ base: value }));
    }
    result[key] = `var(${propName})`;
  }

  if (!isServer) {
    updateStyles();
    getResizeListener();
  }
  return result as T;
}

function stringifyValue(value: ResponsiveValue<any>): ResponsiveValue<string> {
  if (typeof value === "object" && value !== null) {
    if (
      "base" in value ||
      "sm" in value ||
      "md" in value ||
      "lg" in value ||
      "xl" in value ||
      "2xl" in value
    ) {
      const result: Partial<Record<Breakpoint, string>> = {};
      for (const [breakpoint, val] of Object.entries(value)) {
        result[breakpoint as Breakpoint] = stringifySingleValue(val);
      }
      return result;
    } else {
      return JSON.stringify(value);
    }
  }
  return stringifySingleValue(value);
}

function stringifySingleValue(value: any): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

function updateStyles() {
  if (isServer) return;

  let css = "";
  responsiveProps.forEach((value, prop) => {
    if (typeof value === "object" && value !== null) {
      const breakpointEntries = Object.entries(value) as [Breakpoint, string][];
      breakpointEntries.sort((a, b) => breakpoints[a[0]] - breakpoints[b[0]]);

      breakpointEntries.forEach(([breakpoint, breakpointValue]) => {
        if (prop.includes("grid-template-columns")) {
          breakpointValue = breakpointValue.match(/^\d+$/)
            ? `repeat(${breakpointValue}, 1fr)`
            : breakpointValue;
        }
        if (breakpoint === "base") {
          css += `${prop}: ${breakpointValue};`;
        } else {
          const minWidth = breakpoints[breakpoint];
          css += `@media (min-width: ${minWidth}px) { ${prop}: ${breakpointValue}; }`;
        }
      });
    } else {
      css += `${prop}: ${value};`;
    }
  });

  appendToStyleElement(`:root { ${css} }`);
}

function getServerStyles(): string {
  let css = "";
  responsiveProps.forEach((value, prop) => {
    if (typeof value === "object" && value !== null) {
      const breakpointEntries = Object.entries(value) as [Breakpoint, string][];
      breakpointEntries.sort((a, b) => breakpoints[a[0]] - breakpoints[b[0]]);

      breakpointEntries.forEach(([breakpoint, breakpointValue]) => {
        if (prop.includes("grid-template-columns")) {
          breakpointValue = breakpointValue.match(/^\d+$/)
            ? `repeat(${breakpointValue}, 1fr)`
            : breakpointValue;
        }
        if (breakpoint === "base") {
          css += `${prop}: ${breakpointValue};`;
        } else {
          const minWidth = breakpoints[breakpoint];
          css += `@media (min-width: ${minWidth}px) { ${prop}: ${breakpointValue}; }`;
        }
      });
    } else {
      css += `${prop}: ${value};`;
    }
  });

  return `:root { ${css} }`;
}

export { responsive, getServerStyles, type ResponsiveValue, type Breakpoint };
