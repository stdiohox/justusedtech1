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
      "A JustUsedTech volunteer in a JUSTUSED shirt speaking to camera, seated in a training room in front of the JustUsedTech banner.",
    caption: "A JustUsedTech volunteer, on camera in the training room.",
    width: 720,
    height: 1280,
    duration: 74,
  },
} satisfies Record<string, VideoClip>;

/**
 * The one video the previous site carried, on the old About page: a film from
 * JustUsedTech's own YouTube channel. It stays on YouTube rather than being pulled down as
 * a file, because the file was never supplied; the embed loads nothing from YouTube until
 * the reader presses play. If the original arrives it can join the clips above and play in
 * the site's own player.
 *
 * The channel's title is in capitals. It is set here in sentence case, which is how every
 * other heading on the site is written.
 */
export const missionFilm = {
  youtubeId: "q91A8GUkWhg",
  title: "Our mission across Africa and America",
  caption: "From JustUsedTech's YouTube channel.",
  channelUrl: "https://www.youtube.com/@JustusedTech",
} as const;
