import { getAllKeyframes } from "../animation/animations";
import { getResponsiveStyles } from "../responsive/breakpoints";

let styleElement: HTMLStyleElement | null = null;
export let isServer = typeof window === "undefined";

function getOrCreateStyleElement() {
  if (!isServer && !styleElement) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }

  return styleElement;
}

export function appendToStyleElement(css: string): void {
  const element = getOrCreateStyleElement();
  if (element) {
    element.textContent += css;
  }
}

export const getAllStyles = (): string => {
  const keyframes = getAllKeyframes();
  const responsiveStyles = getResponsiveStyles();
  return `${keyframes}\n${responsiveStyles}`;
};
