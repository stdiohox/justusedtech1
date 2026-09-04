import { PillLink } from "@/components/common/pill-button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60dvh] items-center py-24">
      <div className="shell">
        <p className="inline-flex rounded-full bg-mint px-4 py-1.5 text-[0.6875rem] font-extrabold tracking-[0.18em] text-brand-green-dark uppercase">
          Page not found
        </p>
        <h1 className="mt-6 max-w-[16ch] text-[2.25rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl">
          This one is not in the warehouse.
        </h1>
        <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          The page you were looking for has moved or never existed. The links below cover
          most of what people come here for.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <PillLink href="/">Back to home</PillLink>
          <PillLink href="/programs" variant="outline">
            See the programmes
          </PillLink>
        </div>
      </div>
    </section>
  );
}
