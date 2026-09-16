"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Video player with its own controls, adapted from a registry template.
 *
 * Kept from the source: the layout (a centred play disc, a control bar that fades in from
 * the foot on pointer movement and hides again while playing), the seek and volume sliders,
 * skip by ten seconds, fullscreen, and the keyboard map (space or k to play, m to mute, f
 * for fullscreen, arrows to seek and to change volume).
 *
 * Changed, and why:
 *
 * The video sizes the box. The source stretched the element to fill a container and cropped
 * it with object-cover, which is fine for a landscape clip in a landscape frame and cuts the
 * head off a portrait one. Here the element is `h-auto`, so a 16:9 clip and a 9:16 clip each
 * get a frame of their own shape, and the caller decides how wide the box may be.
 *
 * Play state comes from the element, not from React. The source's handlers read `isPlaying`
 * from a closure and were rebound only when the time changed, so a second keypress while
 * paused could act on a stale value. `togglePlay` asks `video.paused` instead, which is
 * always right, and the state is kept only for what it draws.
 *
 * The volume keys change the volume. In the source the arrow keys updated React state and
 * never the element, so they moved the slider and did nothing to the sound.
 *
 * Nothing downloads until play. `preload="metadata"` fetches the header for the duration and
 * the poster carries the frame; a 30-second phone clip is tens of megabytes, and a page
 * should not pull that for a video the reader may not press.
 *
 * Every icon button has a name. The source's were unlabelled, which reads as "button" to a
 * screen reader six times over.
 *
 * The played portion of the seek bar is brand green rather than white, the one place the
 * brand gets into the chrome. The discs and bars stay white on black otherwise, because a
 * player's controls should sit over any footage without fighting it.
 */

const videoPlayerVariants = cva(
  "group relative w-full overflow-hidden rounded-[var(--radius-card)] bg-black",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface VideoPlayerProps
  extends
    Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "controls">,
    VariantProps<typeof videoPlayerVariants> {
  src: string;
  poster?: string;
  /** Spoken description of the clip, read by assistive tech in place of a transcript. */
  title: string;
  showControls?: boolean;
  autoHide?: boolean;
  className?: string;
}

const HIDE_AFTER_MS = 3000;

function formatTime(time: number) {
  if (!Number.isFinite(time)) return "0:00";
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

const iconButton =
  "rounded-[var(--radius-badge)] p-2 text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80";

const slider =
  "h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 " +
  "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm " +
  "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white";

/* The filled part of a range, drawn as the track's own background so it needs no extra node. */
function fill(fraction: number, color: string) {
  const pct = `${Math.max(0, Math.min(1, fraction)) * 100}%`;
  return {
    background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}, rgba(255,255,255,0.3) ${pct}, rgba(255,255,255,0.3) 100%)`,
  };
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  function VideoPlayer(
    {
      className,
      size,
      src,
      poster,
      title,
      showControls = true,
      autoHide = true,
      ...props
    },
    ref,
  ) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [controlsVisible, setControlsVisible] = React.useState(true);

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useImperativeHandle(ref, () => videoRef.current!, []);

    const clearHideTimer = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = null;
    };

    const scheduleHide = React.useCallback(() => {
      clearHideTimer();
      if (autoHide && videoRef.current && !videoRef.current.paused) {
        hideTimer.current = setTimeout(
          () => setControlsVisible(false),
          HIDE_AFTER_MS,
        );
      }
    }, [autoHide]);

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) void video.play();
      else video.pause();
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
    };

    const changeVolume = (next: number) => {
      const video = videoRef.current;
      if (!video) return;
      const clamped = Math.max(0, Math.min(1, next));
      video.volume = clamped;
      video.muted = clamped === 0;
    };

    const seek = (time: number) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(video.duration || 0, time));
    };

    const skip = (seconds: number) => {
      const video = videoRef.current;
      if (video) seek(video.currentTime + seconds);
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        void containerRef.current?.requestFullscreen?.();
      } else {
        void document.exitFullscreen();
      }
    };

    const wake = () => {
      setControlsVisible(true);
      scheduleHide();
    };

    /* Element events are the source of truth; React state only mirrors them for drawing. */
    React.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onLoadedMetadata = () => setDuration(video.duration);
      const onTimeUpdate = () => setCurrentTime(video.currentTime);
      const onPlay = () => {
        setIsPlaying(true);
        scheduleHide();
      };
      const onPause = () => {
        setIsPlaying(false);
        setControlsVisible(true);
        clearHideTimer();
      };
      const onVolumeChange = () => {
        setVolume(video.volume);
        setIsMuted(video.muted);
      };

      /*
        The element is in the server HTML and starts fetching metadata before React
        hydrates, so on a fast connection `loadedmetadata` can fire before this listener
        exists. readyState 1 or higher means it already has, and the duration is readable.
      */
      if (video.readyState >= 1) onLoadedMetadata();
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("durationchange", onLoadedMetadata);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("ended", onPause);
      video.addEventListener("volumechange", onVolumeChange);
      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("durationchange", onLoadedMetadata);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("ended", onPause);
        video.removeEventListener("volumechange", onVolumeChange);
        clearHideTimer();
      };
    }, [scheduleHide]);

    React.useEffect(() => {
      const onFullscreenChange = () =>
        setIsFullscreen(Boolean(document.fullscreenElement));
      document.addEventListener("fullscreenchange", onFullscreenChange);
      return () =>
        document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    /*
      Keys act only while focus is inside the player, so a reader tabbing through the page
      does not have the space bar hijacked by a video they scrolled past.
    */
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video) return;
      /* Let the sliders keep their own arrow-key behaviour. */
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          changeVolume(video.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          changeVolume(video.volume - 0.1);
          break;
      }
      wake();
    };

    const shownVolume = isMuted ? 0 : volume;
    const progress = duration > 0 ? currentTime / duration : 0;

    return (
      <div
        ref={containerRef}
        className={cn(
          videoPlayerVariants({ size }),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
          className,
        )}
        onMouseMove={wake}
        onMouseLeave={() => {
          if (autoHide && isPlaying) setControlsVisible(false);
        }}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label={title}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={title}
          preload="metadata"
          playsInline
          className="block h-auto w-full"
          onClick={togglePlay}
          {...props}
        />

        {showControls && (
          <>
            {/* The centre disc: always up while paused, and with the bar while playing. */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center",
                "transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                !isPlaying || controlsVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={cn(
                  "pointer-events-auto flex size-16 items-center justify-center rounded-full",
                  "border border-white/30 bg-white/20 text-white backdrop-blur-sm",
                  "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/30 active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 motion-reduce:transition-none",
                )}
              >
                {isPlaying ? (
                  <Pause className="size-6" aria-hidden />
                ) : (
                  <Play className="ml-1 size-6" aria-hidden />
                )}
              </button>
            </div>

            {/* The bar. */}
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
                "transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                controlsVisible ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="pointer-events-auto space-y-3 p-4">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-[0.75rem] font-bold tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    aria-label="Seek"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => seek(parseFloat(e.target.value))}
                    className={cn(slider, "flex-1")}
                    style={fill(progress, "#00A652")}
                  />
                  <span className="text-[0.75rem] font-bold tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Back ten seconds"
                      onClick={(e) => {
                        e.stopPropagation();
                        skip(-10);
                      }}
                      className={iconButton}
                    >
                      <SkipBack className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      aria-label={isPlaying ? "Pause" : "Play"}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className={iconButton}
                    >
                      {isPlaying ? (
                        <Pause className="size-4" aria-hidden />
                      ) : (
                        <Play className="ml-0.5 size-4" aria-hidden />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="Forward ten seconds"
                      onClick={(e) => {
                        e.stopPropagation();
                        skip(10);
                      }}
                      className={iconButton}
                    >
                      <SkipForward className="size-4" aria-hidden />
                    </button>

                    <div className="group/volume flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className={iconButton}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="size-4" aria-hidden />
                        ) : (
                          <Volume2 className="size-4" aria-hidden />
                        )}
                      </button>
                      {/*
                        The volume slider unfolds on hover of the mute button. Touch has no
                        hover and gets the mute button alone, which is what a phone's own
                        buttons are for.
                      */}
                      <div className="w-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/volume:w-20 group-focus-within/volume:w-20 motion-reduce:transition-none">
                        <input
                          type="range"
                          aria-label="Volume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={shownVolume}
                          onChange={(e) =>
                            changeVolume(parseFloat(e.target.value))
                          }
                          className={cn(
                            slider,
                            "[&::-webkit-slider-thumb]:size-2 [&::-moz-range-thumb]:size-2",
                          )}
                          style={fill(shownVolume, "#ffffff")}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={
                      isFullscreen ? "Exit full screen" : "Full screen"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className={iconButton}
                  >
                    {isFullscreen ? (
                      <Minimize className="size-4" aria-hidden />
                    ) : (
                      <Maximize className="size-4" aria-hidden />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

export { VideoPlayer, videoPlayerVariants };
