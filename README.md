# Personal Portfolio Website

A minimalist, technically-inspired portfolio website built with Next.js, Tailwind CSS, and modern web technologies. The design emphasizes a backend developer's aesthetic while maintaining professional appeal and user engagement.

## Features

- 🌓 Dark/Light Mode Toggle
- 🎵 Background Music Player
  - YouTube playlist integration
  - Animated music bars indicator
  - Theme-aware styling
- 💭 Dynamic Quote System
  - Auto-rotating quotes
  - Manual refresh option
- 🎨 Minimalist Design
  - Clean, technical aesthetic
  - Responsive layout
  - Smooth animations
- 🔗 Social Integration
  - GitHub profile link
  - LinkedIn profile link
  - Email contact
- 📱 Fully Responsive
- ♿ Accessibility Features

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Fonts**: Space Grotesk/Inter
- **APIs**: YouTube IFrame API

## Getting Started

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_playlist_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/     # React components
├── data/          # Static data (quotes)
├── styles/        # Global styles
└── pages/         # Next.js pages
```

## Components

- **Header**: Theme toggle and navigation
- **Footer**: Quote system, music player, and tech stack diagram
- **Avatar**: Profile image with animated border
- **Navigation**: Internal page links
- **SocialIcons**: External profile links

## Customization

1. Update social links in `components/social-icons.tsx`
2. Modify quotes in `data/quotes.json`
3. Change theme colors in `tailwind.config.js`
4. Replace avatar image in `components/avatar.tsx`

## Development

- Follow TypeScript best practices
- Maintain component-based architecture
- Keep accessibility in mind
- Test across different devices and themes

## Author

Phuong Tan Thanh (& my friend Cursor IDE :>)
