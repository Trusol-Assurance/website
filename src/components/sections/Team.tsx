"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { team, type TeamMember } from "@/data/team";
import { portraitBackground } from "@/lib/placeholders";
import { useTheme } from "@/lib/theme";

function Portrait({ member, id }: { member: TeamMember; id?: string }) {
  const { theme } = useTheme();
  const hasPhoto = Boolean(member.photo?.src);

  // Mirrors the original: only portraits *without* a photo get the generated
  // placeholder background painted on.
  const style = hasPhoto ? undefined : { background: portraitBackground(theme) };

  return (
    <div className="portrait reveal in" id={id} style={style}>
      {hasPhoto ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={member.photo.src}
          alt={member.photo.alt}
          width={640}
          height={800}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <span className="ring" />
      <span className="frame-tag">{member.frameTag}</span>
    </div>
  );
}

function Bio({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  /** null = not measured yet; true/false = the toggle is/isn't warranted. */
  const [needsToggle, setNeedsToggle] = useState<boolean | null>(null);

  const founderRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const moreId = `${member.id}-more`;
  const hasMore = Boolean(member.more?.length);

  /**
   * Port of the auto-hide rule from the original script: a bio short enough to
   * read in one go (≤2 paragraphs *and* ≤10 rendered lines) renders fully
   * expanded with no toggle at all. Measured in a layout effect so the button
   * never flashes before being removed.
   */
  useLayoutEffect(() => {
    if (!hasMore) return;
    const founder = founderRef.current;
    const inner = innerRef.current;
    if (!founder || !inner) return;

    const visibleParas = Array.from(founder.querySelectorAll<HTMLElement>(":scope > p"));
    const hiddenParas = inner.querySelectorAll("p").length;
    const totalParas = visibleParas.length + hiddenParas;

    const sampleP = founder.querySelector("p");
    const lineHeight = sampleP ? parseFloat(getComputedStyle(sampleP).lineHeight) || 24 : 24;
    const visibleH = visibleParas.reduce((sum, p) => sum + p.scrollHeight, 0);
    const totalLines = Math.round((visibleH + inner.scrollHeight) / lineHeight);

    setNeedsToggle(!(totalParas <= 2 && totalLines <= 10));
  }, [hasMore]);

  // Short bio → panel stays permanently open, exactly as the original did.
  const panelOpen = hasMore && (needsToggle === false || open);

  return (
    <div className="founder" ref={founderRef}>
      <span className="eyebrow reveal in">{member.eyebrow}</span>
      <h2 className="reveal in" data-d="1">
        {member.name}
      </h2>
      <div className="role reveal in" data-d="1">
        {member.role}
      </div>

      {member.bio.map((para, i) => (
        <p className="reveal in" data-d={para.d} key={i}>
          {para.text}
        </p>
      ))}

      {hasMore ? (
        <>
          <div
            className={panelOpen ? "bio-more open" : "bio-more"}
            id={moreId}
            ref={panelRef}
          >
            <div ref={innerRef}>
              {member.more!.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          {needsToggle !== false ? (
            <button
              className="bio-toggle reveal in"
              data-d="3"
              type="button"
              aria-expanded={open}
              aria-controls={moreId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Show less −" : "Show more +"}
            </button>
          ) : null}
        </>
      ) : null}

      <div className="creds reveal in" data-d="3">
        {member.creds.map((segments, i) => (
          <span className="cred" key={i}>
            {segments.map((seg, j) =>
              seg.b ? <b key={j}>{seg.t}</b> : <Fragment key={j}>{seg.t}</Fragment>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Team() {
  return (
    <section className="section" id="founder">
      <div className="wrap">
        {team.map((member, i) => (
          <div
            className={member.flip ? "founder-grid founder-grid--flip" : "founder-grid"}
            key={member.id}
          >
            {member.flip ? (
              <>
                <Bio member={member} />
                <Portrait member={member} />
              </>
            ) : (
              <>
                <Portrait member={member} id={i === 0 ? "portrait" : undefined} />
                <Bio member={member} />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}