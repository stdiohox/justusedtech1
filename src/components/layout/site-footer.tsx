import Link from "next/link";
import { LogoLink } from "@/components/brand/logo";
import { ArrowUpRight } from "lucide-react";
import { contact, footerNav, newsletter, site, socials } from "@/content/site";

const involvement = [
  { label: "Donate a device", href: "/get-involved#donate-devices" },
  { label: "Fund a programme", href: "/get-involved#fund" },
  { label: "Partner with us", href: "/get-involved#partner" },
  { label: "Volunteer", href: "/get-involved#volunteer" },
];

export function SiteFooter() {
  return (
    <footer className="bg-green-surface text-white">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <LogoLink onDark />
            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/75">
              {site.legalName} is a 501(c)(3) nonprofit reducing e-waste and
              putting refurbished devices into the hands of students and young
              creatives.
            </p>
            <p className="mt-5 text-[0.8125rem] text-white/70">
              Founded {site.founded}. Incorporated {site.incorporated}.
            </p>
            {/*
              The newsletter gets the brand column rather than a slot in the platform row at
              the foot. That row is seven names at 13px and nothing in it stands out from
              anything else, which is right for a list of places we post and wrong for the one
              thing here a reader can subscribe to.
            */}
            <a
              href={newsletter.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group/news mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 py-2 pr-4 pl-4 text-[0.875rem] font-bold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/10"
            >
              Read the newsletter
              <span className="text-white/60 transition-colors duration-300 group-hover/news:text-white">
                on {newsletter.platform}
              </span>
              <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-white/70 uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] font-semibold text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Get involved">
            <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-white/70 uppercase">
              Get involved
            </h2>
            <ul className="mt-5 space-y-2.5">
              {involvement.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] font-semibold text-white/80 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.6875rem] font-extrabold tracking-[0.18em] text-white/70 uppercase">
              {contact.hqLabel}
            </h2>
            <address className="mt-5 space-y-1 text-[0.9375rem] leading-relaxed text-white/80 not-italic">
              <span className="block">{contact.hqAddress}</span>
              <span className="block">{contact.hqCity}</span>
              <a
                href={contact.phoneHref}
                className="mt-2 block font-semibold transition-colors duration-300 hover:text-white"
              >
                {contact.phone}
              </a>
              {contact.emails.map((e) => (
                <a
                  key={e.address}
                  href={`mailto:${e.address}`}
                  className="block font-semibold transition-colors duration-300 hover:text-white"
                >
                  {e.address}
                </a>
              ))}
            </address>
            <p className="mt-5 text-[0.8125rem] text-white/70">
              {contact.fieldLabel}: {contact.fieldAddress}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-white/70">
            © {new Date().getFullYear()} {site.legalName}. A registered
            501(c)(3) nonprofit organisation.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.8125rem] font-bold text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
