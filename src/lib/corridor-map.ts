import DottedMap from "dotted-map";
import { corridors } from "@/content/impact";

/**
 * The dot field and route geometry for the corridor map, shared by the component that
 * draws the overlay and the route that serves the field itself.
 *
 * Every number here is the reference component's, expressed as the fraction of the
 * viewBox it actually is rather than copied literally. The reference draws into a fixed
 * 800x400; dotted-map at grid height 100 is intrinsically 198x100, so a literal 1 or 2
 * would land four times too heavy. Ratios instead: the stroke is 1/800 of the width and
 * each marker is 2/800, which is the same weight the reference renders at.
 */

const map = new DottedMap({ height: 100, grid: "diagonal" });

export const { width: W, height: H } = map.image;

/**
 * The reference's weights are stated against the size it renders at, not just its
 * viewBox, and that distinction is the whole of the tuning here.
 *
 * It draws an 800-unit viewBox into a max-w-7xl block, so roughly 1280px wide: 1.6px per
 * unit. A 1-unit stroke is 1.6px on screen and a 2-unit marker is a 3.2px radius. This
 * map sits in one half of a two-column grid and measures 556px at a 1440px viewport,
 * over a 198-unit viewBox, so 2.81px per unit. Copying the ratios alone would put the
 * stroke at 0.99px and the markers at 1.98px, which is why both went hairline.
 *
 * So the units below are whatever produces the reference's own pixel weights at the size
 * this section actually renders. That is also why the previous 0.42 and 0.75 looked
 * roughly right: they were this correction, arrived at by eye.
 *
 * 556 is measured, not assumed, and it is tied to the even split CorridorSection runs. If
 * that split changes, re-measure the rendered width of the img and set it here, or the
 * strokes drift off the reference's weight again.
 */
const RENDERED_PX = 556;
const PX_PER_UNIT = RENDERED_PX / W;
const REF_PX_PER_UNIT = 1280 / 800;
const fromRef = (refUnits: number) => (refUnits * REF_PX_PER_UNIT) / PX_PER_UNIT;

/**
 * Grid height 100 is the reference's own, against 62 before. A third more rows is what
 * gives the continents an edge rather than a scatter, and at this display size it puts
 * the dot pitch at about 4px.
 *
 * Colour is the reference's 25% black. It was #c3d2ca, a green-tinted grey, which is what
 * turned the landmasses into a wash. Neutral grey is also what leaves the blue routes and
 * the green hub as the only colour on the visual.
 *
 * Radius is 0.3 rather than the reference's 0.22. Its dots carry 1.42px at its own size;
 * 0.22 here is 0.88px, which lands under a device pixel on a 1x screen and greys out.
 * 0.3 is 1.2px, and still half the 1-unit grid pitch, so the dots stay separated rather
 * than closing into a mesh.
 */
export const DOT_FIELD = map.getSVG({
  radius: 0.3,
  color: "#00000040",
  shape: "circle",
  backgroundColor: "transparent",
});

export const STROKE_WIDTH = fromRef(1);
export const MARKER_R = fromRef(2);

type Node = { label: string; x: number; y: number };

/**
 * getPin, not the reference's own projectPoint.
 *
 * The reference projects plain equirectangular into 800x400 and lays that over a
 * dotted-map image, which is not the projection dotted-map draws in. St. Louis lands at
 * x 49.4 by that formula and at x 46 by the map's own, so its markers sit a few degrees
 * off the landmass they name. Decorative there, wrong here: these are four real cities.
 */
function project(lat: number, lng: number, label: string): Node | null {
  const pin = map.getPin({ lat, lng });
  return pin ? { label, x: pin.x, y: pin.y } : null;
}

export const routes = corridors
  .map(({ from, to }) => {
    const a = project(from.lat, from.lng, from.label);
    const b = project(to.lat, to.lng, to.label);
    if (!a || !b) return null;
    /*
      The reference's control point: midpoint on x, and on y the higher of the two
      endpoints lifted by a fixed amount. Its 50 against a 400-tall viewBox is 12.5% of
      the height, which is 12.5 units here. Every arc out of St. Louis therefore peaks at
      one shared height rather than bowing in proportion to its own length, which is what
      makes the three read as a fan.
    */
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - H * 0.125;
    return { a, b, d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}` };
  })
  .filter((r): r is NonNullable<typeof r> => r !== null);

export const origin = routes[0]?.a;
export const destinations = routes.map((r) => r.b);

/**
 * The reference paints every endpoint one colour. This one splits them, because the
 * legend beside the map already splits them: green is where devices are collected, blue
 * is the three places they go.
 */
export const markers = [
  ...(origin
    ? [{ ...origin, fill: "var(--brand-green-dark)", ping: "var(--brand-green)" }]
    : []),
  ...destinations.map((d) => ({
    ...d,
    fill: "var(--brand-blue)",
    ping: "var(--brand-blue)",
  })),
];
