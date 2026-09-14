/**
 * The two national flags the organisation actually operates under, drawn to spec.
 *
 * Not emoji. The regional indicator pairs render as flags on Apple and Android and as the
 * bare letters "US" and "NG" on Windows, which is a meaningful share of the traffic to a
 * US nonprofit's site, and there is no way to style around it.
 *
 * Not an icon package either. Two flags do not justify a dependency, and the flag sets that
 * exist ship a sprite sheet or a font for all 250 of them.
 *
 * Geometry is the published construction in both cases, so these hold up at any size rather
 * than only at the 40px the About page asks for:
 *
 *   United States, per Executive Order 10834. 10:19. Thirteen stripes, red first and last.
 *   The union is 7 stripes tall and 0.76 of the flag's height wide. Star centres sit on a
 *   grid of 11 columns by 9 rows, filled where column + row is even, which is what produces
 *   the 6/5 alternation and exactly 50 stars.
 *
 *   Nigeria, per the 1960 specification. 1:2. Three equal vertical bands.
 *
 * Colours are the official ones and are not brand tokens. Do not pull them towards
 * --brand-green: a national flag is not ours to restyle.
 */

const US_RED = "#B22234";
const US_BLUE = "#3C3B6E";
const NG_GREEN = "#008751";

/*
  One five-pointed star, circumscribed radius 20, centred on the origin and point up, which
  is what lets each of the 50 be placed with a translate and nothing else.

  Emitted 50 times rather than referenced through <defs> and <use>. A <use> needs an id, an
  id has to be unique in the document, and the only way to guarantee that is useId, which
  would make this a client component for the sake of one path. Fifty copies of one short
  string compress to almost nothing.
*/
const STAR =
  "M0,-20 4.49,-6.18 19.02,-6.18 7.27,2.36 11.76,16.18 0,7.64 -11.76,16.18 -7.27,2.36 -19.02,-6.18 -4.49,-6.18Z";

/* Flag is 1235 x 650, so a stripe is 50 and the union is 494 x 350. */
const STRIPE = 50;
const UNION_W = 494;
const UNION_H = 350;
const COL = UNION_W / 12;
const ROW = UNION_H / 10;

const STAR_POSITIONS = Array.from({ length: 9 }, (_, rowIndex) => rowIndex + 1).flatMap(
  (row) =>
    Array.from({ length: 11 }, (_, colIndex) => colIndex + 1)
      .filter((col) => (col + row) % 2 === 0)
      .map((col) => ({ key: `${col}-${row}`, x: col * COL, y: row * ROW })),
);

export type FlagCountry = "US" | "NG";

/**
 * Rendered as a rounded chip rather than dropped into one of the site's tinted icon tiles.
 *
 * A flag is a picture, not a glyph, and it brings its own palette: inside a mint square it
 * fights the tile instead of reading as a flag. The chip is the same rounded language at
 * the flag's own proportions, which is why the two come out at slightly different widths.
 *
 * The hairline is not decoration. Both of these flags carry white to the edge, and without
 * it they bleed into the white card and lose their shape. It is a ring rather than a border
 * so it sits over the artwork instead of insetting it.
 */
export function Flag({
  country,
  className,
}: {
  country: FlagCountry;
  className?: string;
}) {
  return (
    <span
      /*
        aria-hidden throughout: the country is named in the heading directly under every
        one of these, so announcing it again from the artwork is noise.
      */
      aria-hidden
      className={`inline-flex h-10 overflow-hidden rounded-[0.5rem] ring-1 ring-ink/10 ${className ?? ""}`}
    >
      {country === "US" ? <UnitedStates /> : <Nigeria />}
    </span>
  );
}

function UnitedStates() {
  return (
    <svg viewBox="0 0 1235 650" className="h-full w-auto" focusable="false">
      <rect width="1235" height="650" fill="#FFFFFF" />
      {/* Seven red stripes at the even indices, which puts red at the top and the bottom. */}
      {Array.from({ length: 7 }, (_, index) => (
        <rect
          key={index}
          y={index * 2 * STRIPE}
          width="1235"
          height={STRIPE}
          fill={US_RED}
        />
      ))}
      <rect width={UNION_W} height={UNION_H} fill={US_BLUE} />
      <g fill="#FFFFFF">
        {STAR_POSITIONS.map((star) => (
          <path key={star.key} d={STAR} transform={`translate(${star.x} ${star.y})`} />
        ))}
      </g>
    </svg>
  );
}

function Nigeria() {
  return (
    <svg viewBox="0 0 1200 600" className="h-full w-auto" focusable="false">
      <rect width="1200" height="600" fill="#FFFFFF" />
      <rect width="400" height="600" fill={NG_GREEN} />
      <rect x="800" width="400" height="600" fill={NG_GREEN} />
    </svg>
  );
}
