/**
 * Represents common CSS properties that can be transitioned.
 */
type CommonTransitionProperty =
  | "all"
  | "none"
  | "opacity"
  | "transform"
  | "background-color"
  | "color"
  | "width"
  | "height";

type TransitionProperty = CommonTransitionProperty | string;
type TransitionTiming =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`
  | `steps(${number}, ${"start" | "end"})`;

const validTimingFunctions = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
];

/**
 * Creates a CSS transition.
 * @param property - The CSS property to transition.
 * @param duration - The duration of the transition in milliseconds.
 * @param timing - The timing function for the transition.
 * @param delay - The delay before the transition starts in milliseconds.
 * @returns An object with the transition CSS property.
 */
export function transition(
  property: TransitionProperty = "all",
  duration: number = 300,
  timing: TransitionTiming = "ease",
  delay: number = 0,
) {
  if (duration < 0) {
    throw new Error("Duration must be a non-negative number");
  }
  if (delay < 0) {
    throw new Error("Delay must be a non-negative number");
  }
  if (
    !validTimingFunctions.includes(timing) &&
    !timing.startsWith("cubic-bezier") &&
    !timing.startsWith("steps")
  ) {
    throw new Error("Invalid timing function");
  }
  if (duration > 10000 || delay > 10000) {
    console.warn(
      "Very long duration or delay detected. Ensure this is intentional.",
    );
  }

  return {
    transition: `${property} ${duration}ms ${timing} ${delay}ms`,
  };
}

/**
 * Combines multiple transitions into a single CSS transition string.
 * @param transitions - An array of transition objects.
 * @returns An object with the combined transition CSS property.
 */
export function multipleTransitions(
  ...transitions: ReturnType<typeof transition>[]
) {
  transitions.forEach((t) => {
    if (typeof t !== "object" || !("transition" in t)) {
      throw new Error("Invalid transition object");
    }
  });

  const transitionString = transitions.map((t) => t.transition).join(", ");

  return {
    transition: transitionString,
  };
}
