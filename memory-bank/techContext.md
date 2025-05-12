# Technical Context

## Development Environment
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- lucide-react for icons
- next-themes for theme management
- YouTube IFrame API for background music

## Key Dependencies
```json
{
  "dependencies": {
    "@tailwindcss/typography": "^0.5.10",
    "framer-motion": "^11.0.8",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "next-themes": "^0.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^8.32.0",
    "@typescript-eslint/parser": "^8.32.0",
    "autoprefixer": "^10.4.18",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.1.0",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.4.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "postcss": "^8.4.35",
    "prettier": "^3.5.3",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

## Project Structure
```
app/
├── components/
│   ├── Header.tsx
│   ├── Avatar.tsx
│   ├── SocialIcons.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
├── data/
│   └── quotes.json
├── types/
│   └── youtube.d.ts
├── layout.tsx
├── page.tsx
└── globals.css
```

## Environment Variables
```env
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_playlist_id
```

## Code Quality Tools
### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Prettier Configuration
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Design System
- Font: Space Grotesk/Inter
- Colors:
  - Primary: Theme-based
  - Secondary: Theme-based
  - Dark mode text: #F7FAFC
  - Light mode text: #1A202C
- Animations:
  - Transitions: 300ms ease-in-out
  - Hover effects: scale(1.05)
  - Music bars: Custom keyframes

## Development Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  }
}
```

## Technical Constraints
- SEO optimization requirements
- Mobile-first responsive design
- Accessibility standards (WCAG 2.1)
- Performance optimization
- Cross-browser compatibility
- Type safety requirements

## Development Guidelines
1. Use TypeScript for type safety
2. Follow Next.js 14 best practices
3. Implement responsive design patterns
4. Maintain consistent code style
5. Write clean, documented code
6. Regular testing across devices
7. Follow ESLint and Prettier rules

## Environment Requirements
- Node.js 18.17 or later
- npm 9.0.0 or later
- Git for version control
- VS Code/Cursor IDE recommended 