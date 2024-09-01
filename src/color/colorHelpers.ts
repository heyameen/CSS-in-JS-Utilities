import { colord, extend, type AnyColor } from "colord";
import namesPlugin from "colord/plugins/names";

extend([namesPlugin]);

export const isValidColor = (color: AnyColor): boolean => {
  return colord(color).isValid();
};
