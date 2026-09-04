# JUSTUSED - Project Standing Rules

## Design consultation rule (applies to EVERY prompt in this project, not just the first)

Before implementing any design, layout, animation, or styling decision in this project,
consult the relevant skill(s) in `~/.claude/skills` (apple-design, high-end-visual-design,
design-taste-frontend, minimalist-ui, brandkit, redesign-existing-projects, image-to-code,
animation cluster, obsidian/ponytail/trigger sets) plus the built-in apex-web,
apex-web-aesthetic, and frontend-design skills. This applies to every future prompt in this
project, not just the first one.

For palette/type/UX decisions also query UI UX Pro Max:

```
python3 ~/.claude/skills/user/ui-ux-pro-max/search.py "<query>" --design-system -p "JustUsed"
```

> Note: `~/.claude/skills/user/ui-ux-pro-max` is not present in the current clone of
> https://github.com/stdiohox/claude-skills. Install it there before relying on that query.

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- shadcn/ui in `src/components/ui`
- Package manager: **bun**
- Deps: `motion`, `lucide-react`, `dotted-map`, `react-icons`
- Font: **Nunito** via `next/font/google` (400/500/600/700/800/900). Never hand-embed raw TTFs.

## Brand tokens (sampled from real brand assets - exact, do not adjust)

| Token | Hex | Use |
| --- | --- | --- |
| `--brand-green` | `#00A652` | Primary: logo, buttons, bright backgrounds |
| `--brand-green-dark` | `#007A37` | Card fills, deep accents |
| `--brand-blue` | `#00ADEF` | Icon accent, the "J" swoosh |
| `--brand-gold` | `#FFD966` | Secondary accent, values cards |

- Wordmark / nav / hero: **JUSTUSED**
- Full legal name (footer, contact, legal copy): **JustUsedTech**
- Shape language: rounded and friendly. Generous corner radii, pill buttons, soft shadows,
  no sharp corners anywhere.
- Logo files live in `public/brand/`. Both are cropped PNG placeholders. Every usage must carry
  `{/* TODO: swap for final vector/SVG logo when client delivers it */}`.

## Content integrity rules (non-negotiable)

1. Never fabricate a quote attributed to a named real person beyond what the brief supplies.
2. No real program/team/gallery photos exist yet. Use clearly-placeholder treatments
   (branded gradient blocks, initials avatars). Never use stock photos of real people implied
   to be JustUsedTech staff or beneficiaries.
3. Programs marked `[UPCOMING]` must be visually distinguished from `[ACTIVE]` everywhere.
4. Do not invent metrics for SkillSync Initiative or Circular Tech Bootcamp. Description only.
5. Use only the real University City, MO address. The old live site's London map and
   "457 Morningview Lane, NY" placeholder are wrong and must never reappear.

## Writing rules

- Zero em-dashes (`-` only). Applies to headlines, body, buttons, alt text, everything.
- Canonical copy lives in `src/content/`. Components read from there rather than inlining strings.
