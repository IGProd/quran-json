# Illustration prompts (text-free)

All in-app illustrations are rendered as **vector SVG in code** (`src/components/Illustration.tsx`)
so the app stays offline-first and **contains no text inside any image**. If these are ever
replaced by generated raster art, use the prompts below — and keep the hard rules.

## Hard rules for every asset
- **No text** of any kind inside the image (no Arabic, no Latin, no numbers).
- Calm, respectful, non-frightening. **Never** show corpses, blood, accidents, or graphic content.
- Soft, warm palette: warm off-white `#F6F1E7`, sandstone `#EFE7D6`, muted olive `#7C7A4E`,
  cedar green `#2F4A3C`, slate `#27313A`, sparing brass `#A9853F`.
- Flat / lightly textured, minimal line art. A subtle hint of Moroccan architecture
  (arches, riad courtyard, zellige geometry) — modern and premium, never touristy or ornate.

## Per-scene prompts
- **home** — A simple house silhouette with a calm doorway; soft daylight. Reassuring, domestic.
- **hospital** — A clean, modern care building with a discreet medical cross; calm, orderly.
- **judicial** — A balanced set of scales, centred and steady; dignified, neutral.
- **sameCity** — A single location marker resting inside a soft rounded pin; grounded, local.
- **transfer** — A gentle road curving between two location markers with a small covered vehicle.
- **arrival** — An aircraft descending softly toward a calm ground line; a path leading onward.
- **departure** — An aircraft rising gently from a calm ground line; a soft trailing path.
- **consulate** — A civic building with columns and a bare flagpole (no flag/text); a small globe motif.
- **documents** — A neat stack of folded papers with a soft round seal/stamp; orderly, organised.
- **courtyard** — A riad courtyard arch over a still water basin; serene, sheltering.
- **path** — A quiet path with two cypress trees leading toward a calm point; contemplative.
- **map** — A folded map with two soft location markers connected by a faint route.
