import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PhotoPlaceholder } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { posts } from "@/content/news";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="pt-14 pb-24 md:pt-20">
      <div className="shell max-w-[46rem]">
        <Reveal>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-ink-soft transition-colors duration-300 hover:text-brand-green-dark"
          >
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            All news
          </Link>

          <p className="mt-10 text-[0.875rem] font-bold text-ink-faint">
            <time dateTime={post.iso}>{post.date}</time>
            <span className="mx-2 text-ink-faint/50">/</span>
            {post.location}
          </p>

          <h1 className="mt-5 text-[2.25rem] leading-[1.06] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        {/* Sentinel for the Quick Actions dock: it rises once the masthead is scrolled past. */}
        <div id="dock-sentinel" aria-hidden className="h-px w-full" />

        <Reveal delay={0.08}>
          <PhotoPlaceholder
            tone={1}
            caption={`${post.title}, ${post.location}`}
            className="mt-10 aspect-[16/9]"
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10">
            {post.body.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-soft text-pretty first:mt-0 sm:text-lg"
              >
                {para}
              </p>
            ))}
          </div>

          <ul className="mt-12 flex flex-wrap gap-2 border-t border-[color:var(--hairline)] pt-8">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-mint px-3.5 py-1.5 text-[0.75rem] font-extrabold text-brand-green-dark"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
