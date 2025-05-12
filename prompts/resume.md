Create a personal Resume page that matches the homepage's minimalist, blueprint-inspired design using Next.js + Tailwind CSS.

Data Structure:
Load content from `db/resume.json` with sections:
- Title (avatar, name, tagline, social links)
  - Include a prominent "Download CV" button with icon
  - Button should be visually distinct but harmonious with the design
  - PDF download functionality for the complete resume
- About (brief summary)
- Work Experience (position, company, time, description, responsibilities, skills)
- Education (school, major, time, skills)
- Projects (name, description, link, skills)
- Skills (grouped by category)
- Certifications (name, issuer, date)

Layout:
- Reuse header component with navigation and theme/music controls
- Main content flows vertically with consistent spacing
- Each section styled as a clean card with subtle borders
- Use same typography (Space Grotesk/Inter) and accent colors as homepage
- Skill tags use pill style with hover effects
- Maintain responsive design across screen sizes
- Download button positioned prominently near social links for easy access

Keep the technical, structured feel of the homepage while presenting resume content in a clear, scannable format. The CV download option should be immediately visible and accessible, using the primary/accent colors to draw attention while maintaining the overall aesthetic.