"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A YouTube embed that is a picture until it is pressed.
 *
 * A plain YouTube iframe pulls the player, its scripts, and its cookies into the page for
 * every reader, whether they play the video or not. This renders the video's own thumbnail
 * with a play disc, and swaps in the iframe on the first press, with autoplay so that one
 * press is all it takes. The iframe comes from youtube-nocookie.com, which sets nothing
 * until playback starts.
 *
 * The disc is the same one the site's own video player draws, so a YouTube film and a
 * hosted clip read as the same kind of thing.
 *
 * YouTube's thumbnails come as 4:3 with black bands above and below a 16:9 film. The box
 * is 16:9 and the picture covers it, which crops the bands off.
 */
export function YouTubeEmbed({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-black",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group/yt absolute inset-0 block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/yt:scale-[1.03] motion-reduce:transition-none"
          />
          <span
            aria-hidden
            className={cn(
              "absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/30 bg-white/20 text-white backdrop-blur-sm",
              "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/yt:bg-white/30 group-active/yt:scale-[0.96] motion-reduce:transition-none",
            )}
          >
            <Play className="ml-1 size-6" />
          </span>
        </button>
      )}
    </div>
  );
}
