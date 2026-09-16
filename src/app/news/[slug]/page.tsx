import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhotoPlaceholder, TagPill } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { MosaicGallery } from "@/components/ui/mosaic-gallery";
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

  /*
    The cover leads the article where the post has one. Otherwise the first gallery frame
    does, and the rest go in the gallery under the body; with a cover, every gallery frame
    is "the rest", since none of them has been used up above.
  */
  const lead = post.cover ?? post.gallery?.[0];
  const rest = post.cover
    ? (post.gallery ?? [])
    : (post.gallery ?? []).slice(1);

  return (
    <article className="pt-14 pb-24 md:pt-20">
      <div className="shell max-w-[46rem]">
        <Reveal>
          <div className="text-flow">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-ink-soft transition-colors duration-300 hover:text-brand-green-dark"
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
              All news
            </Link>

            {/*
            The separator belongs to the date, not to the line, so a post with no confirmed
            date shows its location alone rather than a stray leading slash.
          */}
            <p className="mt-10 text-[0.875rem] font-bold text-ink-faint">
              {post.date && (
                <>
                  <time dateTime={post.iso}>{post.date}</time>
                  <span className="mx-2 text-ink-faint/50">/</span>
                </>
              )}
              {post.location}
            </p>

            <h1 className="mt-5 text-[2.25rem] leading-[1.06] font-extrabold tracking-[-0.035em] text-balance sm:text-5xl">
              {post.title}
            </h1>
          </div>
        </Reveal>

        {/* Sentinel for the Quick Actions dock: it rises once the masthead is scrolled past. */}
        <div id="dock-sentinel" aria-hidden className="h-px w-full" />

        {/*
          The lead frame. A post with photographs leads on the first of them; one without
          keeps the branded placeholder block, which is what every post had while no event
          photography existed. The placeholder is not dead code: only one of the two posts
          has pictures.
        */}
        <Reveal delay={0.08}>
          {lead ? (
            <div className="mt-10 overflow-hidden rounded-card border border-edge">
              <Image
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                quality={90}
                sizes="(min-width: 768px) 736px, 100vw"
                priority
                className="h-auto w-full"
              />
            </div>
          ) : (
            <PhotoPlaceholder
              tone={1}
              caption={`${post.title}, ${post.location}`}
              className="mt-10 aspect-[16/9]"
            />
          )}
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

          {post.related && (
            <p className="mt-8">
              <Link
                href={post.related.href}
                className="inline-flex items-center gap-1.5 text-[1rem] font-bold text-brand-green-dark underline-offset-4 hover:underline"
              >
                {post.related.label}
                <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
              </Link>
            </p>
          )}

          {/*
            The rest of the frames, uncropped. Two columns rather than the mosaic's usual
            three: this article column is 736px, and three tracks inside it would set each
            photograph at about 230px.
          */}
          {rest.length > 0 && (
            <div className="mt-12">
              <p className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink-faint uppercase">
                From the session
              </p>
              <MosaicGallery
                photos={rest}
                className="mt-5 lg:[&>div]:columns-2"
              />
            </div>
          )}

          <ul className="mt-12 flex flex-wrap gap-2 border-t border-edge pt-8">
            {post.tags.map((tag) => (
              <li key={tag}>
                <TagPill>{tag}</TagPill>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
