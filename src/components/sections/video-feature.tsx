import { VideoPlayer } from "@/components/ui/video-player";
import type { VideoClip } from "@/content/videos";
import { cn } from "@/lib/utils";

/**
 * One clip in the house frame: the player inside the bezel, the caption under it.
 *
 * The bezel is what every photograph and map on the site sits in, so a video gets it too
 * rather than a black rectangle of its own. The caption is the clip's `caption` from
 * content, never a line written at the call site, so what the site says about a clip is
 * said once.
 *
 * Portrait clips get a narrower cap than landscape ones. A 9:16 clip at the width of a
 * 16:9 one is taller than the viewport, and a talking head or a scene does not need it.
 */
export function VideoFeature({
  clip,
  className,
}: {
  clip: VideoClip;
  className?: string;
}) {
  const portrait = clip.height > clip.width;

  return (
    <figure
      className={cn(portrait ? "mx-auto max-w-[24rem]" : "w-full", className)}
    >
      <div className="bezel">
        <div className="bezel-core overflow-hidden bg-black">
          <VideoPlayer
            src={clip.src}
            poster={clip.poster}
            title={clip.title}
            width={clip.width}
            height={clip.height}
            size="full"
            className="rounded-none"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">
        {clip.caption}
      </figcaption>
    </figure>
  );
}
