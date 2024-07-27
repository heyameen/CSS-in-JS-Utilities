# CSS-in-JS Utilities

A modern, comprehensive collection of helper functions and utilities for CSS-in-JS libraries. This package provides a set of TypeScript utilities to speed up common styling tasks and improve consistency in your React projects.

## Features

- Layout helpers (Flexbox and Grid)
- Responsive design utilities
- Typography helpers
- Effects (shadows and transitions)
- Color utilities
- Animation helpers
- Unit conversion functions

## Installation

Install the package using npm:

```bash
npm install css-in-js-utilities

or

yarn add css-in-js-utilities
```

## Usage
Import the utilities you need from the package:

## Flex Layout

```typescript
import { flexContainer } from 'css-in-js-utilities';

// Create a flex container with default values
const defaultContainer = flexContainer();
// Result:
// {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'flex-start',
//   alignItems: 'stretch'
// }

// Create a custom flex container
const customContainer = flexContainer('column', 'space-between', 'center');
// Result:
// {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// }
```

**Parameters**
1. `direction`: 'row' | 'column' (default: 'row')
2. `justify`: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' (default: 'flex-start')
3. `align`: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' (default: 'stretch')

```typescript
import { flexItem } from 'css-in-js-utilities';
// Create a flex item with default values
const defaultItem = flexItem();
// Result:
// {
//   flexGrow: 0,
//   flexShrink: 1,
//   flexBasis: 'auto'
// }

// Create a custom flex item
const customItem = flexItem(2, 1, '100px');
// Result:
// {
//   flexGrow: 2,
//   flexShrink: 1,
//   flexBasis: '100px'
// }
```
Parameters
1. `grow`: number (default: 0)
2. `shrink`: number (default: 1)
3. `basis`: string (default: 'auto')

## Grid Layout

Import the grid utilities from the package:

```typescript
import { gridContainer, gridItem } from 'css-in-js-utilities';

// Create a grid container with default values
const defaultGrid = gridContainer();
// Result:
// {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(1, 1fr)',
//   gridTemplateRows: 'auto',
//   gap: '1rem',
//   justifyItems: 'stretch',
//   alignItems: 'stretch',
//   justifyContent: 'start',
//   alignContent: 'start'
// }

// Create a custom grid container
const customGrid = gridContainer(3, 2, '20px', 'center', 'end', 'space-between', 'space-around');
// Result:
// {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(3, 1fr)',
//   gridTemplateRows: 'repeat(2, 1fr)',
//   gap: '20px',
//   justifyItems: 'center',
//   alignItems: 'end',
//   justifyContent: 'space-between',
//   alignContent: 'space-around'
// }

// Create a grid item with default values
const defaultItem = gridItem();
// Result:
// {
//   gridColumnStart: 'auto',
//   gridColumnEnd: 'auto',
//   gridRowStart: 'auto',
//   gridRowEnd: 'auto',
//   justifySelf: 'stretch',
//   alignSelf: 'stretch'
// }

// Create a custom grid item
const customItem = gridItem(1, 3, 2, 4, 'start', 'center');
// Result:
// {
//   gridColumnStart: 1,
//   gridColumnEnd: 3,
//   gridRowStart: 2,
//   gridRowEnd: 4,
//   justifySelf: 'start',
//   alignSelf: 'center'
// }
```
gridContainer Parameters
1. `columns`: number | string (default: 1)
2. `rows`: number | string (default: 'auto')
3. `gap`: string (default: '1rem')
4. `justifyItems`: 'start' | 'end' | 'center' | 'stretch' (default: 'stretch')
5. `alignItems`: 'start' | 'end' | 'center' | 'stretch' (default: 'stretch')
6. `justifyContent`: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' (default: 'start')
7. `alignContent`: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' (default: 'start')

gridItem Parameters
1. `colStart`: number | 'auto' (default: 'auto')
2. `colEnd`: number | 'auto' (default: 'auto')
3. `rowStart`: number | 'auto' (default: 'auto')
4. `rowEnd`: number | 'auto' (default: 'auto')
5. `justifySelf`: 'start' | 'end' | 'center' | 'stretch' (default: 'stretch')
6. `alignSelf`: 'start' | 'end' | 'center' | 'stretch' (default: 'stretch')

## Responsive Design

Import the responsive utility from the package:

```typescript
import { responsive } from 'css-in-js-utilities';

// Create responsive styles
const responsiveStyles = responsive({
  display: { base: 'block', md: 'flex' },
  flexDirection: { base: 'column', lg: 'row' },
  padding: { base: '1rem', lg: '2rem' },
  fontSize: { base: '14px', md: '16px', xl: '18px' },
});

// Result:
// {
//   display: 'block',
//   flexDirection: 'column',
//   padding: '1rem',
//   fontSize: '14px',
//   '@media (min-width: 768px)': {
//     display: 'flex',
//     fontSize: '16px'
//   },
//   '@media (min-width: 1024px)': {
//     flexDirection: 'row',
//     padding: '2rem'
//   },
//   '@media (min-width: 1280px)': {
//     fontSize: '18px'
//   }
// }
```
The responsive function allows you to define styles that change based on screen size. It uses the following breakpoints:
1. `sm`: 640px
2. `md`: 768px
3. `lg`: 1024px
4. `xl`: 1280px
5. `2xl`: 1536px

## Transitions

Import the transition utilities from the package:

```typescript
import { transition, multipleTransitions } from 'css-in-js-utilities';

// Create a single transition
const singleTransition = transition('opacity', 300, 'ease-in-out', 100);
// Result:
// {
//   transition: 'opacity 300ms ease-in-out 100ms'
// }

// Create multiple transitions
const multiTransition = multipleTransitions(
  transition('opacity', 300, 'ease-in-out'),
  transition('transform', 500, 'ease-out', 100)
);
// Result:
// {
//   transition: 'opacity 300ms ease-in-out 0ms, transform 500ms ease-out 100ms'
// }
```
Parameters for transition:

1. `property`: TransitionProperty (default: 'all')
2. `duration`: number (in milliseconds, default: 300)
3. `timing`: TransitionTiming (default: 'ease')
4. `delay`: number (in milliseconds, default: 0)

The multipleTransitions function accepts any number of transition objects created by the transition function.

## Shadows

Import the shadow utilities from the package:

```typescript
import { boxShadow, textShadow } from 'css-in-js-utilities';

// Create a box shadow
const defaultBoxShadow = boxShadow();
// Result:
// {
//   boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)'
// }

// Create a custom box shadow
const customBoxShadow = boxShadow('lg', 'rgba(0, 0, 255, 0.2)', true);
// Result:
// {
//   boxShadow: 'inset 0px 4px 8px 0px rgba(0, 0, 255, 0.2)'
// }

// Create a text shadow
const defaultTextShadow = textShadow();
// Result:
// {
//   textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
// }

// Create a custom text shadow
const customTextShadow = textShadow('xl', 'rgba(255, 0, 0, 0.3)');
// Result:
// {
//   textShadow: '0px 8px 16px rgba(255, 0, 0, 0.3)'
// }
```
Parameters for boxShadow:

1. `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
2. `color`: string (default: 'rgba(0, 0, 0, 0.1)')
3. `inset`: boolean (default: false)

Parameters for textShadow:

1. `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
2. `color`: string (default: 'rgba(0, 0, 0, 0.1)')

## Typography

Import the typography utilities from the package:

```typescript
import { fontSize, fontWeight, lineHeight, letterSpacing, textAlign, textTransform, fontFamily, textDecoration, fontStyle, createTypography } from 'css-in-js-utilities';

// Create font size styles
const responsiveFontSize = fontSize({ base: '16px', md: '18px', lg: '20px' });
// Result:
// {
//   fontSize: '16px',
//   '@media (min-width: 768px)': { fontSize: '18px' },
//   '@media (min-width: 1024px)': { fontSize: '20px' }
// }

// Create font weight styles
const boldWeight = fontWeight('bold');
// Result: { fontWeight: 'bold' }

// Create line height styles
const customLineHeight = lineHeight(1.5);
// Result: { lineHeight: 1.5 }

// Create letter spacing styles
const wideLetterSpacing = letterSpacing('0.05em');
// Result: { letterSpacing: '0.05em' }

// Create text align styles
const centerAlign = textAlign('center');
// Result: { textAlign: 'center' }

// Create text transform styles
const uppercase = textTransform('uppercase');
// Result: { textTransform: 'uppercase' }

// Create font family styles
const sansSerif = fontFamily('Arial, sans-serif');
// Result: { fontFamily: 'Arial, sans-serif' }

// Create text decoration styles
const underline = textDecoration('underline');
// Result: { textDecoration: 'underline' }

// Create font style styles
const italic = fontStyle('italic');
// Result: { fontStyle: 'italic' }

// Create a complete typography preset
const headingTypography = createTypography('heading', { base: '24px', md: '32px' }, 'bold', 'center');
// Result:
// {
//   fontSize: '24px',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   lineHeight: 1.2,
//   letterSpacing: '-0.02em',
//   '@media (min-width: 768px)': { fontSize: '32px' }
// }
```
Parameters for `fontSize`:
`size`: Font size value or responsive object

Parameters for `fontWeight`:
`weight`: Font weight value or responsive object
Values: 'normal', 'bold', 'lighter', 'bolder', 100-900

Parameters for `lineHeight`:
`height`: Line height value or responsive object

Parameters for `letterSpacing`:
`spacing`: Letter spacing value or responsive object

Parameters for `textAlign`:
`align`: Text alignment value or responsive object
Values: 'left', 'right', 'center', 'justify'

Parameters for `textTransform`:
`transform`: Text transform value or responsive object
Values: 'none', 'capitalize', 'uppercase', 'lowercase'

Parameters for `fontFamily`:
`family`: Font family value or responsive object

Parameters for `textDecoration`:
`decoration`: Text decoration value or responsive object
Values: 'none', 'underline', 'overline', 'line-through'

Parameters for `fontStyle`:
`style`: Font style value or responsive object
Values: 'normal', 'italic', 'oblique'

Parameters for `createTypography`:
1. `preset`: Typography preset ('heading', 'subheading', 'body', 'caption')
2. `size`: Font size value or responsive object
3. `weight`: Font weight value or responsive object (default: 'normal')
4. `align`: Text alignment value or responsive object (default: 'left')

All functions support responsive values using the Record type with Breakpoint keys.

## Contributing

We welcome contributions to CSS-in-JS Utilities! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/SpecificFeature`)
3. Commit your changes (`git commit -m 'Add some SpecificFeature'`)
4. Push to the branch (`git push origin feature/SpecificFeature`)
5. Open a Pull Request

For more detailed information on contributing, please see our [CONTRIBUTE.md](CONTRIBUTE.md) file.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 [Ameen Alade](https://ameenalade.dev)