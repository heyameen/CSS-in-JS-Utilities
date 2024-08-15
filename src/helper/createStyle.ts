let styleElement: HTMLStyleElement | null = null;
let isServer = typeof window === "undefined";

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

export const insertKeyframe = (frames: string): void => {
  appendToStyleElement(frames);
};
