# 🎨 CSS-in-JS Utilities: : Your Styling Superpower!

A modern, comprehensive collection of helper functions and utilities for CSS-in-JS libraries. This package provides a set of TypeScript utilities to speed up common styling tasks and improve consistency in your projects. Say goodbye to repetitive styling tasks and hello to consistent, efficient, and downright-friendly
styling!

## ✨ Features

- Responsive design utilities
- Layout helpers (Flexbox and Grid)
- Typography helpers
- Color utilities
- Effects (shadows and transitions)
- Animation utilities

## 🚀 Getting Started

Install the package using npm:

```bash
npm install css-in-js-utilities

or

yarn add css-in-js-utilities
```

## Usage Guide
CSS-in-JS Utilities offers a wide range of powerful functions to enhance your styling workflow. Let's explore each category with practical examples:

### Responsive design utilities
Create adaptive layouts with ease:
```typescript
import { responsive } from 'css-in-js-utilities';

const responsiveStyles = responsive({
    display: { base: 'block', md: 'flex' },
    fontSize: { base: '14px', md: '16px', xl: '18px' },
});
// Result:
// {
//   display: 'block',
//   fontSize: '14px',
//   '@media (min-width: 768px)': {
//     display: 'flex',
//     fontSize: '16px'
//   },
//   '@media (min-width: 1280px)': {
//     fontSize: '18px'
//   }
// }
```

### Flex Layout
Create flexible layouts with intuitive controls:
```typescript
import { flexContainer, flexItem } from 'css-in-js-utilities';

const container = flexContainer('column', 'space-between', 'center');
// Result:
// {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// }

const item = flexItem(2, 1, '100px');
// Result:
// {
//   flexGrow: 2,
//   flexShrink: 1,
//   flexBasis: '100px'
// }
```

### Grid Layout

Build complex grid systems effortlessly:

```typescript
import { gridContainer, gridItem } from 'css-in-js-utilities';

const container = gridContainer(3, 2, '20px', 'center', 'end', 'space-between', 'space-around');
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

const item = gridItem(1, 3, 2, 4, 'start', 'center');
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

### Typography

Fine-tune your text styles:
```typescript
import { fontSize, fontWeight, lineHeight, letterSpacing, textAlign, createTypography } from 'css-in-js-utilities';

const responsiveFontSize = fontSize({ base: '16px', md: '18px', lg: '20px' });
// Result: { fontSize: { base: '16px', md: '18px', lg: '20px' } }

const boldWeight = fontWeight('bold');
// Result: { fontWeight: 'bold' }

const customLineHeight = lineHeight(1.5);
// Result: { lineHeight: 1.5 }

const wideLetterSpacing = letterSpacing('0.05em');
// Result: { letterSpacing: '0.05em' }

const centerAlign = textAlign('center');
// Result: { textAlign: 'center' }

const headingTypography = createTypography('heading', '24px', 'bold', 'center');
// Result:
// {
//   fontSize: '24px',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   lineHeight: 1.2,
//   letterSpacing: '-0.02em'
// }

// Using createTypography with breakpoints
const responsiveHeadingTypography = createTypography('heading', { base: '24px', md: '32px' }, 'bold', 'center');
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

### Color Utilities

Effortlessly manage and manipulate colors:

```typescript
import { toRgba, lighten, darken, complementary, analogous } from 'css-in-js-utilities';

const rgbaColor = toRgba('#FF5733', 0.8);
// Result: 'rgba(255, 87, 51, 0.8)'

const lightenedColor = lighten('#3366CC', 20);
// Result: '#6699FF'

const darkenedColor = darken('#3366CC', 20);
// Result: '#003399'

const complementaryColor = complementary('#3366CC');
// Result: '#CC9933'

const analogousColor = analogous('#3366CC', 30);
// Result: '#3333CC'
```

### Shadow Effects
Add depth to your elements:
```typescript
import { boxShadow, textShadow } from 'css-in-js-utilities';

const boxShadowStyle = boxShadow('lg', 'rgba(0, 0, 255, 0.2)', true);
// Result: { boxShadow: 'inset 0px 4px 8px 0px rgba(0, 0, 255, 0.2)' }

const textShadowStyle = textShadow('xl', 'rgba(255, 0, 0, 0.3)');
// Result: { textShadow: '0px 8px 16px rgba(255, 0, 0, 0.3)' }
```

### Transition Utilities
Create smooth state changes:

```typescript
import { transition, multipleTransitions } from 'css-in-js-utilities';

const singleTransition = transition('opacity', 300, 'ease-in-out', 100);
// Result: { transition: 'opacity 300ms ease-in-out 100ms' }

const multiTransition = multipleTransitions(
    transition('opacity', 300),
    transition('transform', 500, 'ease-out', 100)
);
// Result: { transition: 'opacity 300ms ease 0ms, transform 500ms ease-out 100ms' }
```

### Animation Utilities
Bring your UI to life with our animation helpers:

```typescript
import { keyframe, animation, multipleAnimations } from 'css-in-js-utilities';

// Define keyframes
const fadeIn = keyframe('fadeIn', {
  from: { opacity: 0 },
  to: { opacity: 1 }
});
// Result: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }'

// Create a single animation
const fadeInAnimation = animation('fadeIn', '1s', 'ease-in-out');
// Result: 'fadeIn 1s ease-in-out 0s 1 normal none running'

// Combine multiple animations
const complexAnimation = multipleAnimations(
  animation('fadeIn', '1s'),
  animation('slideIn', '0.5s', 'ease-out', '0.2s')
);
// Result: { animation: 'fadeIn 1s ease 0s 1 normal none running, slideIn 0.5s ease-out 0.2s 1 normal none running' }
```


## 🤝 Contributing

We're always looking for fellow style enthusiasts to join our ranks! Whether you're reporting bugs, suggesting features, or contributing code, your ideas can help shape the future of the package. If you'd like to contribute, please follow these contribution
guidelines:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/SpecificFeature`)
3. Commit your changes (`git commit -m 'Add some SpecificFeature'`)
4. Push to the branch (`git push origin feature/SpecificFeature`)
5. Open a Pull Request

For more detailed information on contributing, please see our [CONTRIBUTE.md](CONTRIBUTE.md) file.


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 [Ameen Alade](https://ameenalade.dev)
