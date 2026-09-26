# Manash Protim Deori — Digital Headquarters & Portfolio

> Personal brand, portfolio, product showcase, and digital headquarters for **Manash Protim Deori**.
> Operating at the intersection of **Marketing × Strategy × Analytics × AI × Technology**.

---

## 1. Core Architecture & Philosophy

This platform is architected not merely as a static résumé, but as an extensible, living digital headquarters:
- **Proof Over Claims**: Every strategic claim is backed by working software, case studies, or published research.
- **Production-Grade Interactive Tools**: Includes live, client-side financial and strategic tools (Campaign ROI & CAC Payback Engine, UTM Taxonomy Architect, Strategic Positioning Matrix, Brief Generator).
- **Anti-AI Slop & Zero-Pill Discipline**: High-craft editorial typography (Newsreader + Plus Jakarta Sans + JetBrains Mono), clean unboxed metadata with subtle typographic separators (`·`), and domain-native design restraint.
- **Power-User Navigation**: Global Command Palette (`⌘K` or `Ctrl+K`), quick route jumps, theme toggling, and instant email copy.
- **60-Second Executive Summary (`/quick-profile`)**: Tailored specifically for recruiters, hiring managers, and founders with clean print optimization.

---

## 2. Directory Structure

```
├── public/
│   ├── about.json          # Machine-readable profile for AI agents & crawlers
│   ├── llms.txt            # Site summary for LLM discoverability
│   ├── robots.txt          # Search engine crawler instructions
│   └── sitemap.xml         # XML Sitemap
├── src/
│   ├── components/
│   │   ├── common/         # Monogram, CommandPalette, Toast, etc.
│   │   ├── home/           # Hero, CurrentSignal, CorePhilosophy, FeaturedWork, etc.
│   │   ├── layout/         # Header (3-zone contract), Footer
│   │   ├── tools/          # RoiCalculator, UtmBuilder, PositioningMatrix, BriefGenerator
│   │   └── visualizations/ # ConstellationCanvas, AgentWorkflowDiagram
│   ├── config/
│   │   └── site.config.ts  # Central branding, social links, navigation
│   ├── context/
│   │   └── ThemeContext.tsx# Dark/Light mode provider with localStorage persistence
│   ├── data/
│   │   ├── projects.ts     # Strategic case studies and system architectures
│   │   ├── tools.ts        # Mini-products and calculator configurations
│   │   ├── articles.ts     # Long-form editorial essays and publications
│   │   ├── research.ts     # Methodological whitepapers and empirical studies
│   │   ├── experiments.ts  # Lab experiments and prototypes
│   │   ├── experience.ts   # Career history, IIM Shillong MBA & B.Tech Chem Eng
│   │   └── uses.ts         # Hardware, AI models, and software stack
│   ├── pages/              # Primary route views
│   ├── types/              # Strongly typed TypeScript interfaces
│   ├── App.tsx             # Central route orchestration & command palette
│   ├── index.css           # Tailwind CSS v4 base, fonts, and print stylesheets
│   └── main.tsx            # Entry point
```

---

## 3. How to Extend Content

### Adding a New Project
Open `src/data/projects.ts` and add an object adhering to the `Project` interface:
```typescript
{
  id: 'project-new',
  slug: 'new-project-slug',
  title: 'Project Title',
  subtitle: 'One-line strategic impact statement',
  excerpt: 'Concise summary for cards',
  status: 'Live', // Concept | Research | Prototype | Building | Live | Completed
  year: '2026',
  categories: ['AI', 'Marketing'],
  tags: ['Tag 1', 'Tag 2'],
  skills: ['Skill 1', 'Skill 2'],
  technologies: ['TypeScript', 'Tailwind CSS'],
  role: 'Lead Architect',
  problem: 'What was broken?',
  context: 'Why was this initiative needed?',
  insight: 'What non-obvious truth did analysis reveal?',
  strategy: 'Strategic approach taken',
  solution: 'What was built',
  process: 'How it was executed',
  lessons: ['Lesson 1', 'Lesson 2'],
  featured: true
}
```

### Adding a New Publication / Essay
Open `src/data/articles.ts` and append your article:
```typescript
{
  id: 'art-new',
  slug: 'essay-slug',
  title: 'The Future of Attribution',
  subtitle: 'Why last-click metrics misinform executive decisions.',
  excerpt: 'Brief teaser paragraph...',
  publishedAt: '2026-04-01',
  readTime: '6 min read',
  categories: ['Marketing', 'Analytics'],
  tags: ['Attribution', 'Economics'],
  featured: true,
  content: {
    lead: 'Opening lead paragraph in serif...',
    sections: [
      {
        heading: 'Section 1',
        body: ['Paragraph text...']
      }
    ]
  }
}
```

### Adding a New Interactive Tool
1. Create your component in `src/components/tools/NewTool.tsx`.
2. Register the metadata in `src/data/tools.ts`.
3. Wire the renderer in `src/pages/ToolsPage.tsx` and `src/pages/ToolDetailPage.tsx`.

---

## 4. Environment Variables (`.env.example`)

```bash
VITE_SITE_URL=https://manashprotim.com
VITE_EMAIL=manashdeori09@gmail.com
VITE_GITHUB_URL=https://github.com
VITE_LINKEDIN_URL=https://linkedin.com
```

---

## 5. Development & Build

```bash
# Install dependencies
npm install

# Run dev server on port 3000
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build
```
