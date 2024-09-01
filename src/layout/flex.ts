import { ResponsiveValue, responsive } from "../responsive/breakpoints";

type FlexDirection = "row" | "column";
type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around";
type AlignItems = "start" | "end" | "center" | "stretch" | "baseline";

export function flexContainer(
  direction: ResponsiveValue<FlexDirection> = "row",
  justify: ResponsiveValue<JustifyContent> = "start",
  align: ResponsiveValue<AlignItems> = "stretch",
) {
  return responsive({
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
  });
}

export function flexItem(
  grow: ResponsiveValue<number> = 0,
  basis: ResponsiveValue<string | number> = "auto",
  shrink: ResponsiveValue<number> = 1,
) {
  return responsive({
    flexGrow: grow,
    flexBasis: basis,
    flexShrink: shrink,
  });
}
