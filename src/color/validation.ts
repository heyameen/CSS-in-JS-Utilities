export const isValidColor = (color: string): boolean => {
    // Regular expressions for different color formats
    const hexRegex = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    const rgbRegex = /^rgb\(\s*(\d{1,3}|[0-9]+%)\s*,\s*(\d{1,3}|[0-9]+%)\s*,\s*(\d{1,3}|[0-9]+%)\s*\)$/;
    const rgbaRegex = /^rgba\(\s*(\d{1,3}|[0-9]+%)\s*,\s*(\d{1,3}|[0-9]+%)\s*,\s*(\d{1,3}|[0-9]+%)\s*,\s*([01]?\.?\d*)\s*\)$/;
    const hslRegex = /^hsl\(\s*(\d{1,3}|[0-9]+%)\s*,\s*([0-9]+%)\s*,\s*([0-9]+%)\s*\)$/;
    const hslaRegex = /^hsla\(\s*(\d{1,3}|[0-9]+%)\s*,\s*([0-9]+%)\s*,\s*([0-9]+%)\s*,\s*([01]?\.?\d*)\s*\)$/;

    // CSS4 color function
    const colorFunctionRegex = /^(rgb|hsl|hwb|lab|lch|oklab|oklch)\(.+\)$/;

    // Complete list of CSS color keywords
    const colorKeywords = new Set([
        'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
        'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
        'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
        'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
        'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray',
        'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
        'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
        'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred',
        'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue',
        'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
        'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue',
        'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
        'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
        'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
        'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
        'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff',
        'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
        'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
        'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal',
        'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
        // CSS Level 4 color keywords
        'transparent', 'currentcolor'
    ]);

    const lowerColor = color.toLowerCase();

    return (
        hexRegex.test(lowerColor) ||
        rgbRegex.test(lowerColor) ||
        rgbaRegex.test(lowerColor) ||
        hslRegex.test(lowerColor) ||
        hslaRegex.test(lowerColor) ||
        colorFunctionRegex.test(lowerColor) ||
        colorKeywords.has(lowerColor)
    );
};
