import { LogoSphere, type SphereLogo } from "@/components/ui/logo-sphere";
import { allPartners } from "@/content/partners";

/**
 * The partner marks, as the masthead's media block.
 *
 * A thin adapter and nothing else: it exists so the sphere itself stays a generic list of
 * images and the /partners page stays a page. Resolving the marks from `allPartners` rather
 * than a hand-picked subset is the same invariant the hero trust row keeps, so the sphere
 * cannot silently drift out of step with the two lists printed below it, and the headline's
 * count stays true to what the reader is looking at.
 *
 * Nothing is cropped or greyscaled, so every organisation appears in its own colour, at its
 * own ratio. See LogoSphere for why the strip's `scale` multipliers are damped here.
 */
const items: SphereLogo[] = allPartners.map((partner) => ({
  id: partner.name,
  label: partner.name,
  src: partner.logo.src,
  width: partner.logo.width,
  height: partner.logo.height,
  scale: partner.logo.scale,
}));

export function PartnerSphere() {
  return <LogoSphere items={items} />;
}
