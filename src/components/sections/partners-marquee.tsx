import Link from "next/link";
import { PartnerMark } from "@/components/common/partner-mark";
import { allPartners } from "@/content/partners";

/**
 * Partner marquee. Sits under the hero band, never inside it, and is the only marquee on
 * the page.
 *
 * Every partner runs, in the content file's order. There used to be a length filter here,
 * to keep a long organisation name from stretching one slot and breaking the loop's
 * rhythm; a mark occupies a fixed slot whatever the legal name runs to, so with no typeset
 * entries left the filter matched everything and came out.
 *
 * The strip is duplicated once and translated -50%, which gives a seamless loop. The
 * duplicate is aria-hidden so screen readers read each partner once, which also stops the
 * logo alt text from being announced twice.
 *
 * Marks run in full colour with no hover state, matching the /partners strip.
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
              {allPartners.map((partner) => (
                <li
                  key={partner.name}
                  /* Padding, not gap, because the two copies have to butt together
                     seamlessly at the seam: the last item's right padding and the first
                     item's left padding form one normal gap where the loop wraps. */
                  className="flex shrink-0 items-center px-5 sm:px-6"
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
