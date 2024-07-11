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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 [Ameen Alade](https://ameenalade.dev)