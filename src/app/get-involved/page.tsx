import type { Metadata } from "next";
import Image from "next/image";
import { HandHeart, Handshake, Laptop, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { PillAnchor, PillLink } from "@/components/common/pill-button";
import { Section, SectionHead } from "@/components/common/primitives";
import { Reveal } from "@/components/common/reveal";
import { contact } from "@/content/site";
import { volunteerAreas } from "@/content/team";
import { galleryFrame } from "@/content/program-details";
import { ClipMosaic } from "@/components/ui/clip-mosaic";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Donate a device, fund a programme, partner with us, or volunteer. Four ways to support JustUsedTech.",
};

/*
  Two donation routes are kept deliberately separate and never merged into one button:
  giving money funds programme delivery, giving a device feeds the refurbishment pipeline.
  Collapsing them would lose the distinction that matters most to donors.
*/

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Four ways in."
        /*
          The display scale, which exists for this masthead. Three words at the size every
          other page uses read as a caption beside the mosaic rather than as a headline.
        */
        size="display"
        lede="Hardware, funding, partnership, or time. Each one moves a different part of the same pipeline: devices come in, they are repaired, and they go back out to people who need them. Pick the one that matches what you have to give."
        /*
          The four ways, as links into the four sections below. The headline counts them and
          then the reader had to go and find them, which on a phone is four screens of
          scrolling before the page says what any of them are.

          They repeat the section headings word for word rather than paraphrasing, so a
          reader who follows one lands on the heading they just read.
        */
        actions={
          <ul className="flex flex-wrap gap-2.5">
            {[
              ["Donate a device", "#donate-devices"],
              ["Fund a programme", "#fund"],
              ["Partner with us", "#partner"],
              ["Volunteer", "#volunteer"],
            ].map(([label, href]) => (
              <li key={href}>
                <PillLink href={href} variant="outline" bare className="text-[0.9375rem]">
                  {label}
                </PillLink>
              </li>
            ))}
          </ul>
        }
        /*
          The masthead on this page ran to a four-word headline and one line of lede, which
          left the right half of the shell emptier here than anywhere else on the site. About
          fills the same column with its photo mosaic; this fills it with the pipeline the
          lede describes, in three frames.

          The three are the pipeline in order: hardware collected, hardware in a student's
          hands, a session in a Lagos classroom. None of them is one of the three photographs
          in the cards below, so scrolling the page does not meet the same picture twice, and
          each carries the alt text already written for it in its own programme gallery.
        */
        media={
          <ClipMosaic
            className="mx-auto w-full max-w-[26rem] lg:w-[24rem] xl:w-[26rem]"
            /*
              All three are landscape frames in a square box, so cover crops each one on the
              vertical axis and each needs a value. Centred, the van frame gave the top two
              tiles a square of bare sky and the laptop frame a square of ceiling: both have
              their subject low, and the classroom has its faces high.
            */
            frames={[
              { ...galleryFrame("/programs/greenbin-360/02.jpg"), position: "object-[center_72%]" },
              {
                ...galleryFrame("/programs/breakthrough-series/02.jpg"),
                position: "object-[center_66%]",
              },
              {
                ...galleryFrame("/programs/school-tour-initiative/04.jpg"),
                position: "object-[center_42%]",
              },
            ]}
          />
        }
      />

      {/* Donate a device */}
      <Section id="donate-devices" tone="white" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-mint text-brand-green-dark">
              <Laptop className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              className="mt-6"
              title="Donate a device"
              lede="Laptops, desktops, tablets, phones, and peripherals. Working or not, we assess everything that comes in. Corporate and institutional lots are collected through GreenBin 360."
            />
            <ul className="mt-8 space-y-3.5">
              {[
                "Individuals can arrange a drop-off at our University City warehouse.",
                "Organisations retiring hardware in bulk get a scheduled collection.",
                "Devices beyond repair are routed to responsible recycling, not landfill.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-green"
                  />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <PillAnchor href={`mailto:${contact.emails[0].address}?subject=Device donation`}>
                Donate a device
              </PillAnchor>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/*
              The photograph is the card, and the address rides on a pane of the site's glass
              material over it. The blur is real rather than painted on: backdrop-filter
              blurs the picture only where the pane covers it, so the frame stays sharp above
              the text and dissolves beneath it. Blurring the whole photograph would have cost
              the one thing it is here to do, which is show a reader what turning up looks
              like.

              .glass-card is the house material, already carrying its own contrast rationale
              and an opaque fallback for browsers without backdrop-filter. Nothing new is
              invented here.

              The pane sits at the foot rather than centred: it leaves the subject of the
              frame in clear air, and it puts the address at the edge the eye leaves the card
              from.

              Alt text is the line already written for this frame on the GreenBin gallery.
              It describes what is in the picture and stops there, so nothing here claims the
              collection day pictured happened at the address printed over it.
            */}
            {/*
              The floor is taller below lg than at it. On a wide screen the card stretches to
              the column beside it and that column sets the height; stacked, there is nothing
              to stretch to, and at the 26rem that suits the desktop row the pane took all but
              142px of the frame and cut the pair off at the chest. 32rem leaves the handoff
              clear. The lg floor is only a backstop for the day the copy beside it gets
              shorter.
            */}
            <aside className="relative flex h-full min-h-[32rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-mint p-4 lg:min-h-[26rem]">
              {/* The mint fill above is a load state only, covered when the photo paints. */}
              <div className="absolute inset-0">
                {/*
                  This frame rather than one of the collection-day landscapes, because the
                  treatment wants a composition with its subject high and its foot empty. The
                  two figures and the box sit between 27% and 63% of the file's height and
                  the bottom third is bare pavement, so the pane lands on pavement and the
                  people stay in clear air above it. A landscape frame put the subject exactly
                  where the pane goes.

                  Cover scales this portrait to the card's width, so the whole crop happens on
                  the vertical axis and the aim of the position is the same at every size:
                  open the window just above the nearer figure's head, which puts the pair and
                  the box in the clear band and leaves their feet to go behind the pane. Their
                  span is wider than the clear band at any size, so something goes behind it
                  either way, and feet are the right thing to lose.

                  Two values because the window's shape changes at lg, not for its own sake.
                  In the column it is 439px of a 681px frame and 70% opens at 25% of the
                  picture. Stacked it is much wider, 512px of a 1008px frame, and the same 70%
                  opens at 34% and takes both heads off; 50% opens at 25% again. Below sm the
                  card is nearly the frame's own shape, there is almost nothing to place, and
                  the value stops mattering.
                */}
                <Image
                  src="/programs/greenbin-360/01.jpg"
                  alt="A person carrying a cardboard box across a plaza, met by a team member in a JustUsedTech shirt."
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  quality={90}
                  className="object-cover object-[center_50%] lg:object-[center_70%]"
                />
                {/*
                  A short wash up from the foot. The glass is white at 75%, and over the
                  bright concrete in the lower third of this frame the pane and the photograph
                  were within a few percent of each other in luminance, which left the pane
                  with no edge. The wash gives it something to sit against without darkening
                  the part of the picture anyone is looking at.
                */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(10,31,20,0.45)] via-[rgba(10,31,20,0.14)] to-transparent"
                />
              </div>

              {/*
                Concentric with the card: 36px outer radius less the 16px inset leaves 20px,
                so the pane's corners run parallel to the card's rather than near them.
              */}
              {/*
                Same sheer fill as the funding pane, so the two panes on this page are one
                material rather than two. Everything it implies applies here too: every line
                is --ink, and the three levels are carried by weight and size.

                The phone number is the exception and it is why this pane was measured rather
                than assumed. Green does not survive this fill: the sampled --brand-green-dark
                measures 4.1:1 over the pane and --green-surface, the same green one step
                down, 3.9:1, both under the 4.5 that 17px bold text needs. It cleared the bar
                on the opaque fill this card carried before the photograph went in.

                So the link goes to --ink at 8:1 and takes a standing underline instead of a
                hover one, the underline being the affordance the colour was carrying. Green
                is not lost from the section: it is on the button next to this card, which is
                the thing the section actually wants pressed.
              */}
              <div className="relative rounded-[calc(var(--radius-card)-1rem)] glass-card glass-sheer p-6 sm:p-7">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink uppercase">
                  Drop-off address
                </h3>
                <address className="mt-3 text-[1.0625rem] leading-relaxed font-bold text-ink not-italic">
                  {contact.hqAddress}
                  <br />
                  {contact.hqCity}
                </address>
                <a
                  href={contact.phoneHref}
                  className="mt-3 inline-block font-bold text-ink underline decoration-ink/35 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {contact.phone}
                </a>
                <p className="mt-5 text-[0.875rem] leading-relaxed font-normal text-ink">
                  Please email ahead so we can log the donation and give you a collection
                  window.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Fund a programme */}
      <Section id="fund" tone="green" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-green-dark">
              <HandHeart className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              onGreen
              className="mt-6"
              title="Fund a programme"
              lede="A financial gift covers what donated hardware cannot: replacement parts, shipping to Lagos, session materials, and the staff time that gets a device into a student's hands."
            />
            <div className="mt-9">
              <PillAnchor
                href={`mailto:${contact.emails[0].address}?subject=Funding a programme`}
                variant="gold"
              >
                Fund a programme
              </PillAnchor>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/*
              The pair to the drop-off card above: photograph for the card, the site's glass
              material for the text, the pane at the foot. Two sections running the same
              treatment is the point, and what keeps them from reading as a repeat is that
              each one carries its own section's ground and its own half of the story, the
              hardware arriving and the hardware reaching someone.

              The pane stays light on the green. That is the hero's pairing, where the same
              glass floats over a dark green gradient, and the 75% fill in the material's own
              notes was set against exactly that backdrop. A dark pane was the obvious first
              thought and does not survive the arithmetic: white body text over a dark
              translucent fill needs about 88% opacity to hold AA where the photograph behind
              it is bright, by which point it is a painted panel rather than glass.
            */}
            {/*
              Both floors are taller than the drop-off card's, and the card sets its own height
              at every width rather than dropping the floor at lg the way that one does. The
              column beside this one is short, so nothing else is going to size the card, and
              the floor is what leaves the pane a band worth looking at: at lg, 34rem puts the
              open machine and the hand above the pane where 30rem cropped the band down to
              bare desk.

              Stacked it takes 38rem, not because the card is wider but because the pane is
              taller there: the three details wrap onto second lines and the pane grows to
              377px, which at 34rem put the work below the fold of the band again.
            */}
            <aside className="relative flex h-full min-h-[38rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-brand-green-dark p-4 lg:min-h-[34rem]">
              {/* The green fill above is a load state only, covered when the photo paints. */}
              <div className="absolute inset-0">
                {/*
                  A detail rather than a scene, and that is the whole reason this frame is
                  here. This pane carries four blocks of copy against the drop-off card's
                  three lines, so it is half the card, and the clear band above it is shallow.
                  A scene does not survive that: the handover frame, which was the first
                  choice and is the better picture, put two faces across the band and the pane
                  cut both at the jaw. A close-up has nothing that breaks when the band is
                  short, and it answers the first line of the list directly, which is parts
                  and technician time.

                  It also keeps the two cards on this page from being the same picture twice:
                  a wide outdoor scene above, a close detail here.

                  This frame is wider than the card at every size, so the crop runs on the
                  horizontal axis and the position is an x value. 65% rather than centre: the
                  left third of the picture is empty desk, and centred it was most of what the
                  band had to show, worst of all stacked, where the card is narrow enough to
                  see about 38% of the frame's width at once.
                */}
                <Image
                  src="/programs/circular-tech-bootcamp/11.jpg"
                  alt="Close-up of an opened laptop with its back panel removed, a hand working on the internals."
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  quality={90}
                  className="object-cover object-[65%_50%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(10,31,20,0.45)] via-[rgba(10,31,20,0.14)] to-transparent"
                />
              </div>

              {/*
                The sheer fill, because this pane is half the card and at 75% it read as a
                white box laid on the photograph rather than a pane you look through.

                Everything in it is --ink, which is the condition of that fill rather than a
                style choice: the muted grey falls to 2.8:1 where the picture behind the pane
                is dark. The three levels are still there, carried by weight and size, which
                is how type on a translucent surface should be separated in any case. The
                legal line keeps its smaller size and takes the lighter weight, so it still
                reads as the quietest thing here without being the palest.
              */}
              <div className="relative rounded-[calc(var(--radius-card)-1rem)] glass-card glass-sheer p-6 sm:p-7">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink uppercase">
                  Where funding goes
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {[
                    ["Refurbishment", "Parts, tooling, and technician time."],
                    ["Delivery", "Shipping and logistics into Nigeria, Ghana, and Kenya."],
                    ["Programmes", "School sessions, mentorship, and training materials."],
                  ].map(([label, detail]) => (
                    <li key={label}>
                      <p className="font-extrabold text-ink">{label}</p>
                      <p className="mt-0.5 text-[0.9375rem] leading-relaxed font-medium text-ink">
                        {detail}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.8125rem] leading-relaxed font-normal text-ink">
                  JustUsedTech is a registered 501(c)(3) nonprofit organisation.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Partner with us */}
      <Section id="partner" tone="paper" className="scroll-mt-24">
        <Reveal>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-[color:rgba(0,173,239,0.14)] text-[color:#0673a0]">
            <Handshake className="size-6" strokeWidth={1.75} aria-hidden />
          </span>
          <SectionHead
            className="mt-6"
            title="Partner with us"
            lede="We work with companies retiring hardware, schools hosting sessions, government bodies, and community organisations running delivery on the ground."
          />
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {[
            [
              "Corporate",
              "Scheduled e-waste collection through GreenBin 360, with reporting on weight diverted and devices redistributed.",
            ],
            [
              "Education",
              "Host a School Tour session, or receive refurbished devices for students.",
            ],
            [
              "Community",
              "Co-deliver programmes with us in St. Louis, in Lagos State, and across our partner network.",
            ],
          ].map(([title, detail], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <article className="card h-full">
                <h3 className="text-xl font-extrabold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-9">
          <PillAnchor href={`mailto:${contact.emails[1].address}?subject=Partnership enquiry`}>
            Partner with us
          </PillAnchor>
        </Reveal>
      </Section>

      {/* Volunteer */}
      <Section id="volunteer" tone="white" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[color:rgba(255,217,102,0.35)] text-ink">
              <Users className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
            <SectionHead
              className="mt-6"
              title="Volunteer"
              lede="More than 20 volunteers already support content, training, outreach, and operations. If you have hardware repair skills, teaching experience, or time for outreach, there is work for you."
            />
            <div className="mt-9">
              <PillAnchor href={`mailto:${contact.emails[0].address}?subject=Volunteering`}>
                Volunteer with us
              </PillAnchor>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/*
              The third card on the page to run the treatment the drop-off and funding cards
              run: photograph for the card, the site's glass material for the text, the pane
              at the foot. It used to be a mint panel with a list on it, which left the one
              section here that is about people with nothing to look at.

              What keeps three of them from reading as one device repeated is what each frame
              is of. The drop-off card is a wide outdoor scene, the funding card a close
              detail of a machine open on a bench, and this one is a session in a room.
              Hardware arriving, hardware being worked on, and someone handing it over.
            */}
            {/*
              The funding card's floors, and for the same reason: the column beside this one
              is short, so nothing else sizes the card and the floor is what leaves the pane a
              band worth looking at. The pane here is shorter than either of the other two, a
              heading and four one-word lines, so the band is deeper at the same height.
            */}
            <aside className="relative flex h-full min-h-[38rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-mint p-4 lg:min-h-[34rem]">
              {/* The mint fill above is a load state only, covered when the photo paints. */}
              <div className="absolute inset-0">
                {/*
                  A portrait frame, which is what this card needs and is why the volunteers
                  photograph from the About masthead is not here. That one is a wide group
                  shot: in a card this shape the window is 62% of its width, which cuts two of
                  the four people out at the left edge and leaves the rest pressed against the
                  top of the pane. A treatment that crops to a tall card wants a tall picture,
                  the same way the drop-off card does.

                  This one also answers the list beside it. The four areas are content,
                  training, outreach, and operations, and the frame is the training one: a
                  team member handing a laptop across the table to a participant, in the shirt
                  and beside the poster, which is the JustUsedTech room rather than a generic
                  classroom.

                  Alt text is the line already written for this frame in the Circular Tech
                  gallery. It says team member, not volunteer: the picture cannot tell you
                  which, and the card must not claim it.

                  Cover crops on the vertical axis at lg, where the card is a little wider
                  than the file, and on the horizontal below it. Centre holds in both. The
                  standing figure's head sits at 24% of the frame and the seated participant's
                  face at 38% to 48%, both well above the band the pane covers, and what goes
                  behind the glass is the foreground table and the laptop open on it.
                */}
                <Image
                  src="/programs/circular-tech-bootcamp/09.jpg"
                  alt="A team member leaning across a table to show a laptop to a young participant, beside a JustUsedTech poster."
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  quality={90}
                  className="object-cover object-[center_50%]"
                />
                {/*
                  The same wash up from the foot as the two cards above. The foreground table
                  in this frame is a pale laminate running the full width of the bottom edge,
                  which is the brightest thing in the picture and the closest in luminance to
                  the pane.
                */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(10,31,20,0.45)] via-[rgba(10,31,20,0.14)] to-transparent"
                />
              </div>

              {/*
                Same sheer fill, same inset, same concentric radius as the other two panes, so
                the three read as one material. The rule that fill carries comes with it: no
                green on this surface, where --brand-green-dark falls to 1.8:1 over a dark
                backdrop, so the four areas go to --ink and stay separated from the heading by
                weight and size. Green is on the button beside the card, which is the thing
                this section wants pressed.
              */}
              <div className="relative rounded-[calc(var(--radius-card)-1rem)] glass-card glass-sheer p-6 sm:p-7">
                <h3 className="text-[0.6875rem] font-extrabold tracking-[0.16em] text-ink uppercase">
                  Where volunteers work
                </h3>
                {/*
                  Two columns, and each area says what the work is.

                  As four bare words in one column this was the weakest block on the page: a
                  narrow stack down the left of a pane twice its width, with nothing to read
                  and half the glass empty. The funding pane next to it had already solved
                  that with label and detail pairs, so this takes the same pairs and lays them
                  in a 2x2 instead of a run of four, which is what keeps the pane the same
                  height it was. Four stacked pairs would have made it 340px, and the pane
                  would have climbed into the participant's face in the photograph behind it.

                  Two columns at every width, phone included. The detail lines are three and
                  four words, so a 158px column wraps them to three lines at worst, which is
                  still shorter than four pairs run down a single column.
                */}
                <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                  {volunteerAreas.map(({ area, detail }) => (
                    <div key={area}>
                      <dt className="text-[1.0625rem] font-extrabold text-ink">{area}</dt>
                      <dd className="mt-0.5 text-[0.8125rem] leading-snug font-medium text-ink">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

    </>
  );
}
