/**
 * Video clips, client-supplied. Two so far, both phone footage re-encoded to 720p H.264
 * MP4 in public/video, with a poster frame pulled from each file so nothing downloads until
 * the reader presses play.
 *
 * Neither clip came with a transcript, a name, or a date, so nothing here says what is
 * said in them. `title` is what assistive tech reads in place of the picture; `caption` is
 * the line under the player. Both describe what is on screen and stop there, the same rule
 * the photograph alt text follows. If the people in them are named later, or a transcript
 * arrives, that goes here and the surfaces update.
 *
 * `width` and `height` are the encoded pixel dimensions, so a surface can reserve the box
 * before the poster paints.
 */
export type VideoClip = {
  id: string;
  src: string;
  poster: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  /** Seconds, for the "0:31" beside the heading. */
  duration: number;
};

export const videos = {
  breakthroughBeneficiary: {
    id: "breakthrough-beneficiary",
    src: "/video/breakthrough-series-beneficiary.mp4",
    poster: "/video/breakthrough-series-beneficiary.jpg",
    title:
      "A Breakthrough Series beneficiary speaking to camera while holding a laptop, in a training room in front of the JustUsedTech banner.",
    caption:
      "A Breakthrough Series beneficiary, with a laptop, in the training room.",
    width: 1280,
    height: 720,
    duration: 31,
  },
  volunteer: {
    id: "volunteer",
    src: "/video/volunteer.mp4",
    poster: "/video/volunteer.jpg",
    title:
      "Volunteers sorting donated equipment into green collection bins in a car park on a collection day in Missouri.",
    caption: "Volunteers on a collection day in Missouri.",
    width: 720,
    height: 1280,
    duration: 11,
  },
} satisfies Record<string, VideoClip>;
