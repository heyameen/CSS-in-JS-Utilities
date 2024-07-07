# Modern CSS-in-JS Utils

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
npm install modern-css-in-js-utils 

or

yarn add modern-css-in-js-utils
```

## Usage
Import the utilities you need from the package:

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 [Ameen Alade](https://ameenalade.dev)