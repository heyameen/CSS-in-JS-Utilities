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


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 [Ameen Alade](https://ameenalade.dev)