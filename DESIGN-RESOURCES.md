# Design resources

Five tools used to design Daftar. Reuse them on future projects.

| Resource | Link | What it is for | How to use it |
|---|---|---|---|
| **Taste Skill** | https://github.com/Leonxlnx/taste-skill | Anti-"AI-slop" frontend skill: one design system, hover/press motion layer, no violet, real content over filler. Best for marketing and company websites. | `npx skills add Leonxlnx/taste-skill` |
| **Web Interface Guidelines** (Vercel) | https://github.com/vercel-labs/web-interface-guidelines | Checklist for accessibility, focus states, forms, motion, typography, touch and i18n. Use it to review any UI. | Rules: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md · Skill: `npx skills add https://github.com/vercel/examples --skill web-design-guidelines` |
| **Awesome DESIGN.md** (VoltAgent) | https://github.com/VoltAgent/awesome-design-md | 70+ DESIGN.md files describing the design systems of real products (Wise, Revolut, Stripe, Linear, Apple…). Drop one in a project so the AI follows a consistent system. | Full files and previews: https://getdesign.md |
| **Image to Code** (Taste Skill family) | https://github.com/Leonxlnx/taste-skill (history: `skills/image-to-code-skill`) | Image-first workflow: design a picture of the screen first, then build code that matches it exactly. Also has strong anti-clutter and anti-nested-box rules. | `npx skills add Leonxlnx/taste-skill --skill image-to-code` (removed from the main branch in Oct 2026, so it may only exist in older versions) |
| **Playwright CLI** (Microsoft) | https://github.com/microsoft/playwright-cli | Lets an AI agent open the real app in a browser, click through it and take screenshots, cheaply. Use it to check every design change visually. | `npm install -g @playwright/cli@latest`, then `playwright-cli open <url>`, `snapshot`, `click`, `screenshot` |

## Daftar's design system ("Ledger paper")

- **Canvas** `#F4F2ED` (warm paper). **Surfaces** white. Cards stand out by contrast, with no drop shadows.
- **One accent:** ledger green `#164E3B` for primary buttons, the balance card, and the active tab. Cream `#F6F0DF` for text on green.
- **Money colours kept apart from the brand:** in `#13834A`, out `#C2412D`.
- **Ink** `#16140F`, **muted** `#6F6A5F`.
- **Radius:** 24 px cards, pill buttons. **Fonts:** Geist plus IBM Plex Sans Arabic, tabular numbers.
- **Motion:** buttons lift on hover and press in on click, linked cards lift 2 px, and everything rests under reduced motion.
