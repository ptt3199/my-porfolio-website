Overview:
Create a minimalistic but distinctive homepage with a "Blueprint Dev" aesthetic — inspired by architectural diagrams and backend system structure. The goal is to reflect the personality of a thoughtful backend developer: precise, calm, and technically solid. Use clean typography, structured layout, and a soft accent color to give the page depth and character.

Tech Stack: Next.js + Tailwind CSS + lucide-react icons

Layout:

1. Centered layout with vertical flow:
- Avatar at top, followed by name, title, social links, then navigation links.
- Proper vertical spacing with `space-y-*` and margins.
- Responsive: Stacks nicely on mobile.

2. Avatar:
- Circular image with a soft drop shadow.
- Optional: Surround with a dotted or dashed circle (like a node in a diagram).
- Subtle hover effect or animation on load (e.g., fade or grow).

3. Name:
- Use a modern font with structure. Suggested: `IBM Plex Sans` or `Space Grotesk`.
- Centered, bold, black in light mode and white in dark mode.
- Slight letter spacing for a blueprint feeling.

4. Title / Tagline:
- Below the name. Example: `Backend Developer · FastAPI · PostgreSQL · DevOps`.
- Use muted gray or soft blue/green for accent.
- Optional: slightly smaller than the name with `tracking-wider`.

5. Social Icons:
- Horizontal row, evenly spaced, icons from `lucide-react`.
- Icons: GitHub, LinkedIn, Mail.
- Color: dark gray in light mode, light gray in dark mode; accent color on hover.
- Optional hover: pulse, scale-up, or color transition.

6. Navigation Links:
- Simple horizontal nav bar under icons.
- Suggested link names:
  - `CV` → `Resume`
  - `Blog` → `Notes`
  - `Contact` → `Ping Me`
- Hover underline or color shift with smooth transitions.

7. Dark Mode:
- Include a dark/light toggle at the top right.
- Use `Moon` and `Sun` icons from `lucide-react`.
- Smooth transition between themes.
- Tailwind’s `class` strategy for theme switching.

8. Blueprint Touches:
- Use `border-dashed` or `border-dotted` accents sparingly (e.g., around avatar or between sections).
- Optional: Add a mini visual diagram at the bottom showing system components: `FastAPI → Celery → Redis → PostgreSQL`.
- Color palette: white/black/gray base with one accent (suggested: `#4A90E2` or `#48BB78`).
- Animations should be subtle and utility-like, not flashy.

Typography:
- Font: `IBM Plex Sans`, `Space Grotesk`, or similar.
- Use `font-light` to `font-medium` for text, and `font-bold` for name/title.
- Good line height and spacing for readability.

Summary:
A structured, quiet, and confident homepage that feels like a technical blueprint. Minimal but expressive. Designed to show backend professionalism through layout and subtle interactions — no gimmicks.
