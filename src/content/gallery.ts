import { programDetails } from "@/content/program-details";
import { programs } from "@/content/programs";
import { posts } from "@/content/news";
import { whoWeAreFrames } from "@/content/who-we-are";

/**
 * Photo collections for the gallery on the news page.
 *
 * Nothing here is a new set of files. Every collection is assembled from photography the
 * site already holds and captions: the programme galleries in program-details.ts, the
 * galleries on individual news posts, and the who-we-are frames from the about page. That
 * keeps one caption per photograph, written once, and means the gallery cannot show a frame
 * the rest of the site does not also stand behind.
 *
 * Order: programmes in their site order, then posts with photographs, then the team frames.
 * A programme or post without photographs simply produces no collection, which is the same
 * rule the programme pages follow: no photography, no gallery, no placeholder pretending.
 */
export type Collection = {
  id: string;
  title: string;
  /** One line under the title. The programme's own galleryLede where it has one. */
  lede?: string;
  /** Where the collection came from, for the "See the programme" link. */
  href: string;
  hrefLabel: string;
  photos: { src: string; alt: string; width?: number; height?: number }[];
};

const fromPrograms: Collection[] = programs.flatMap((program) => {
  const detail = programDetails[program.slug];
  if (!detail?.gallery?.length) return [];
  return [
    {
      id: program.slug,
      title: program.name,
      lede: detail.galleryLede,
      href: `/programs/${program.slug}`,
      hrefLabel: "See the programme",
      photos: detail.gallery,
    },
  ];
});

/*
  A post's photographs often are a programme's photographs: the Thomas Dunn post reuses six
  frames from the Circular Tech Bootcamp set. Those are already on the page under the
  programme, so a post collection keeps only the frames no programme collection shows, and
  a post left with none produces no collection at all.
*/
const shownByPrograms = new Set(
  fromPrograms.flatMap((c) => c.photos.map((p) => p.src)),
);

const fromPosts: Collection[] = posts.flatMap((post) => {
  const photos =
    post.gallery?.filter((photo) => !shownByPrograms.has(photo.src)) ?? [];
  if (photos.length === 0) return [];
  return [
    {
      id: `post-${post.slug}`,
      title: post.title,
      lede: post.location,
      href: `/news/${post.slug}`,
      hrefLabel: "Read the post",
      photos,
    },
  ];
});

const fromTeam: Collection = {
  id: "who-we-are",
  title: "The team at work",
  lede: "Operations in University City and field work in Lagos.",
  href: "/about",
  hrefLabel: "About JustUsedTech",
  /*
    The who-we-are frames carry no pixel dimensions, so the mosaic lays them out at the
    aspect the browser reads from the file instead. Their kicker is folded into the alt
    text here because the gallery has nowhere else to put a place name.
  */
  photos: whoWeAreFrames.map((frame) => ({
    src: frame.src,
    alt: `${frame.alt} (${frame.kicker})`,
  })),
};

export const collections: Collection[] = [
  ...fromPrograms,
  ...fromPosts,
  fromTeam,
];
