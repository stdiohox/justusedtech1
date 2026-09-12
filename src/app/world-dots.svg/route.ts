import { DOT_FIELD } from "@/lib/corridor-map";

/**
 * The corridor map's dot field, served as a file.
 *
 * At the reference's grid height the field is 8,476 circles. Inlined into the page that
 * is 578KB of markup and 8,476 extra DOM nodes on the home route, for a backdrop that
 * never changes and is marked aria-hidden. As an image it is one node, cached on its own,
 * and the browser rasterises it once.
 *
 * force-static prerenders it at build time, so it costs a request to a static file rather
 * than a function invocation. The reference reaches the same place with a data URI, which
 * would put the same bytes back in the HTML.
 */

export const dynamic = "force-static";

export function GET() {
  return new Response(DOT_FIELD, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
