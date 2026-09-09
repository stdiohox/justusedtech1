import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section, TagPill } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { posts } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Events, programme updates, and field reports from JustUsedTech.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="What has been happening."
        lede="Events, programme updates, and field reports. Posted as they happen."
      />

      <Section tone="white">
        <ul className="space-y-5">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.06}>
              <Link
                href={`/news/${post.slug}`}
                className="card group/post block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    {/* Dropped whole, not left blank, where a post has no confirmed date. */}
                    {post.date && (
                      <p className="text-[0.8125rem] font-bold text-ink-faint">
                        <time dateTime={post.iso}>{post.date}</time>
                      </p>
                    )}
                    <h2 className="mt-4 max-w-[24ch] text-2xl leading-tight font-extrabold tracking-[-0.03em] text-balance first:mt-0 sm:text-[2rem]">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-soft text-pretty">
                      {post.excerpt}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <TagPill>{tag}</TagPill>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    className="size-6 shrink-0 text-ink-faint transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
