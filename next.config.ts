import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Allowed `quality` values. The hero photograph asks for 90: the supplied file is
      1340px wide against a slot that renders around 708 CSS px, so a 2x display is already
      short of pixels and the default 75 adds visible mush on top of that. 75 stays listed
      because every other image on the site takes the default.

      Declaring this is not optional for long. Next 16 rejects any quality not in this list,
      and 15.5 already warns on one, which is what surfaced this.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
