import {
  Breakpoint,
  ResponsiveValue,
  responsive,
} from "../responsive/breakpoints";

type GridValue = number | string;
type JustifyAlign = "start" | "end" | "center" | "stretch";
type JustifyContent =
  | JustifyAlign
  | "space-around"
  | "space-between"
  | "space-evenly";

export function gridContainer(
  columns: ResponsiveValue<GridValue> = 1,
  rows: ResponsiveValue<GridValue> = "auto",
  gap: ResponsiveValue<string> = "1rem",
  justifyItems: ResponsiveValue<JustifyAlign> = "stretch",
  alignItems: ResponsiveValue<JustifyAlign> = "stretch",
  justifyContent: ResponsiveValue<JustifyContent> = "start",
  alignContent: ResponsiveValue<JustifyContent> = "start",
) {
  return responsive({
    display: "grid",
    gridTemplateColumns: processGridValue(columns),
    gridTemplateRows: processGridValue(rows),
    gap,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
  });
}

export function gridItem(
  colStart: ResponsiveValue<GridValue> = "auto",
  colEnd: ResponsiveValue<GridValue> = "auto",
  rowStart: ResponsiveValue<GridValue> = "auto",
  rowEnd: ResponsiveValue<GridValue> = "auto",
  justifySelf: ResponsiveValue<JustifyAlign> = "stretch",
  alignSelf: ResponsiveValue<JustifyAlign> = "stretch",
) {
  return responsive({
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
    justifySelf,
    alignSelf,
  });
}

function processGridValue(
  value: ResponsiveValue<GridValue>,
): ResponsiveValue<string> {
  if (typeof value === "object" && value !== null) {
    const processed: Partial<Record<Breakpoint, string>> = {};
    for (const [breakpoint, val] of Object.entries(value)) {
      processed[breakpoint as Breakpoint] =
        typeof val === "number" ? `repeat(${val}, 1fr)` : val;
    }
    return processed;
  }
  return typeof value === "number" ? `repeat(${value}, 1fr)` : value;
}
