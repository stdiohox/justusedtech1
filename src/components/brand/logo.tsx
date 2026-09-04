import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
  TODO: swap for final vector/SVG logo when client delivers it.
  Both files in /public/brand are placeholder PNGs cropped from the brand deck.
  They are green and blue on transparent, so they cannot sit on the dark green surfaces.
  Until a reversed/white lockup arrives, `onDark` renders the icon mark inside a white
  chip beside a typeset wordmark.
*/

export function LogoLockup({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    /* TODO: swap for final vector/SVG logo when client delivers it */
    <Image
      src="/brand/jut-logo-lockup.png"
      alt="JUSTUSED"
      width={1248}
      height={272}
      priority={priority}
      className={cn("h-8 w-auto", className)}
    />
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    /* TODO: swap for final vector/SVG logo when client delivers it */
    <Image
      src="/brand/jut-icon-mark.png"
      alt=""
      aria-hidden
      width={209}
      height={274}
      className={cn("h-7 w-auto", className)}
    />
  );
}

/** Reversed lockup for green surfaces, built from the mark plus typeset wordmark. */
export function LogoOnDark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex size-11 items-center justify-center rounded-2xl bg-white">
        <LogoMark className="h-6" />
      </span>
      <span className="text-[1.375rem] leading-none font-extrabold tracking-[-0.02em] text-white">
        JUSTUSED
      </span>
    </span>
  );
}

export function LogoLink({
  onDark = false,
  className,
  priority = false,
}: {
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="JUSTUSED, home"
      className={cn("inline-flex items-center", className)}
    >
      {onDark ? <LogoOnDark /> : <LogoLockup priority={priority} />}
    </Link>
  );
}
