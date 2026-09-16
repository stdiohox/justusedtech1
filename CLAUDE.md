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
2. Client-supplied photographs of real people may be used against their own names. As of
   2026-09-15 that means the two board members only: Titobi Oreolorun
   (`public/titobi-services-sm.jpg`) and Christopher Wise (`public/team/christopher-wise.jpg`).
   Christopher's came off the old justusedtech.org about page as a cut-out on flat white
   (`wp-content/uploads/2024/04/2.png`), which read as a hole next to Titobi's studio shot. The
   committed file has a rebuilt backdrop under him: neutral studio grey, one light upper left
   falling to the lower right, matched to the tones sampled from Titobi's frame so the two read
   as one shoot. Re-key from the source URL, do not paint over the committed file. Everyone
   else on the roster still has no
   photograph and renders an initials avatar, and a group only switches to the portrait
   treatment once every member of it has one, so nobody is singled out. Programme and gallery
   surfaces without real photography keep the placeholder treatments (branded gradient
   blocks). Never use a stock photo of a real person implied to be JustUsedTech staff or a
   beneficiary.
3. Programs marked `[UPCOMING]` must be visually distinguished from `[ACTIVE]` everywhere.
4. Do not invent metrics for SkillSync Initiative or Circular Tech Bootcamp. Description only.
5. Use only the real University City, MO address. The old live site's London map and
   "457 Morningview Lane, NY" placeholder are wrong and must never reappear.

## Writing rules

- Zero em-dashes (`-` only). Applies to headlines, body, buttons, alt text, everything.
- Canonical copy lives in `src/content/`. Components read from there rather than inlining strings.
