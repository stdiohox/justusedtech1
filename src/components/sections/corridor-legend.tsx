import { MapPin } from "lucide-react";
import { corridorCities } from "@/content/impact";

/**
 * Key for the corridor globe: the four cities cobe cannot label, since it renders no text
 * on the sphere itself.
 *
 * Lives in the text column rather than under the globe, so it reads as one more labelled
 * pair alongside Operations base and Communities reached instead of as a caption hanging
 * off the visual. Type matches those values deliberately.
 *
 * A real list, not a row of spans. Generic spans sit flush against each other with no
 * whitespace between them, so assistive tech ran the entries together as one string
 * ("Collection hubLagos"). List items give each city its own node, and the trailing period
 * keeps the phrases apart even where the text gets flattened.
 */
export function CorridorLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {corridorCities.map((city) => (
        <li
          key={city.city}
          className="flex items-center gap-1 text-[1.0625rem] leading-snug font-bold text-ink"
        >
          <MapPin
            aria-hidden
            strokeWidth={2}
            className={
              city.hub
                ? "size-4 shrink-0 text-brand-green-dark"
                : "size-4 shrink-0 text-brand-green"
            }
          />
          {city.city}
          <span className="sr-only">, {city.role}. </span>
        </li>
      ))}
    </ul>
  );
}
