function isValidRGBValue(value: string): boolean {
  value = value.trim();
  if (value.endsWith("%")) {
    const percent = parseInt(value, 10);
    return percent >= 0 && percent <= 100;
  }
  const num = parseInt(value, 10);
  return num >= 0 && num <= 255;
}

function isValidHue(value: string): boolean {
  const num = parseInt(value, 10);
  return num >= 0 && num < 360;
}

function isValidPercentage(value: string): boolean {
  if (!value.endsWith("%")) return false;
  const percent = parseInt(value, 10);
  return percent >= 0 && percent <= 100;
}

function isValidAlpha(value: string): boolean {
  const num = parseFloat(value);
  return num >= 0 && num <= 1;
}

export const isValidColor = (color: string): boolean => {
  // Regular expressions for different color formats
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  const rgbRegex =
    /^rgb\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(\d{1,3}%?)\s*,\s*(0?\.?\d+|1(\.0)?)\s*\)$/;
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*\)$/;
  const hslaRegex =
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*(0?\.?\d+|1(\.0)?)\s*\)$/;

  // Complete list of CSS color keywords
  const colorKeywords = new Set([
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
    // CSS Level 4 color keywords
    "transparent",
    "currentcolor",
  ]);

  const lowerColor = color.toLowerCase();

  if (hexRegex.test(lowerColor) || colorKeywords.has(lowerColor)) {
    return true;
  }

  if (rgbRegex.test(lowerColor) || rgbaRegex.test(lowerColor)) {
    const matches = lowerColor.match(rgbRegex) || lowerColor.match(rgbaRegex);
    if (matches) {
      const [, r, g, b, a] = matches;
      return (
        isValidRGBValue(r) &&
        isValidRGBValue(g) &&
        isValidRGBValue(b) &&
        (a === undefined || isValidAlpha(a))
      );
    }
  }

  if (hslRegex.test(lowerColor) || hslaRegex.test(lowerColor)) {
    const matches = lowerColor.match(hslRegex) || lowerColor.match(hslaRegex);
    if (matches) {
      const [, h, s, l, a] = matches;
      return (
        isValidHue(h) &&
        isValidPercentage(s) &&
        isValidPercentage(l) &&
        (a === undefined || isValidAlpha(a))
      );
    }
  }

  return false;
};
