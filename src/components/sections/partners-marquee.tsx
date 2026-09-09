import Link from "next/link";
import { PartnerMark } from "@/components/common/partner-mark";
import { marqueePartners } from "@/content/partners";

/**
 * Partner marquee. Sits under the hero band, never inside it, and is the only marquee on
 * the page.
 *
 * Seven partners have supplied a mark and render as logos; the rest are typeset wordmarks,
 * mixed into the same run rather than grouped. PartnerMark decides per partner, so this
 * component does not know or care which is which.
 *
 * The strip is duplicated once and translated -50%, which gives a seamless loop. The
 * duplicate is aria-hidden so screen readers read each partner once, which also stops the
 * logo alt text from being announced twice.
 *
 * Everything rests muted and resolves on hover, matching the /partners strip. See that file
 * for why the text opacity comes off --ink and not --ink-faint.
 */
export function PartnersMarquee() {
  return (
    <section className="border-y border-edge bg-white py-14">
      <div className="shell">
        <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-ink-faint uppercase">
          Working with
        </h2>
      </div>

      <div className="marquee-fade mt-8 overflow-hidden">
        <div
          className="animate-marquee flex w-max"
          style={{ ["--marquee-duration" as string]: "52s" }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {marqueePartners.map((partner) => (
                <li
                  key={partner.name}
                  className="group/partner flex shrink-0 items-center px-7 whitespace-nowrap sm:px-9"
                >
                  <PartnerMark partner={partner} size="sm" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="shell mt-8">
        <Link
          href="/partners"
          className="text-[0.875rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
        >
          See all partners
        </Link>
      </div>
    </section>
  );
}
