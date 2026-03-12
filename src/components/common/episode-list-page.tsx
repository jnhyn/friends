import { MobileShell } from "@/components/common/mobile-shell";
import { EpisodeAccordion } from "@/components/common/episode-accordion";

type SeasonGroup = {
  season: number;
  slugSeason: string;
  episodes: Array<{
    episode: number;
    slugEpisode: string;
    title: string;
  }>;
};

export function EpisodeListPage({
  title,
  eyebrow,
  description,
  seasons,
  basePath,
  variant,
}: {
  title: string;
  eyebrow: string;
  description: string;
  seasons: SeasonGroup[];
  basePath: string;
  variant: "scripts" | "memory";
}) {
  const episodeCount = seasons.reduce((total, season) => total + season.episodes.length, 0);

  return (
    <MobileShell title={title} eyebrow={eyebrow}>
      <section className="page-hero">
        <div className="page-hero-row">
          <div>
            <p className="page-hero-kicker">{title}</p>
            <h2 className="page-hero-title text-balance">{description}</h2>
          </div>
          <div className="page-hero-count">
            <p className="page-hero-count-label">Episodes</p>
            <p className="page-hero-count-value">{episodeCount}</p>
          </div>
        </div>
        <div className="page-hero-tags">
          <div className="page-hero-tag">
            {variant === "scripts" ? "Tap speaker to save line" : "Filtered by saved memory"}
          </div>
          <div className="page-hero-tag">
            {variant === "scripts" ? "Tap word to underline + save" : `${seasons.length} seasons visible`}
          </div>
        </div>
      </section>
      <p className="page-section-label">
        {variant === "scripts" ? "Memorize with Rhythm" : "Saved for Review"}
      </p>
      {seasons.length > 0 ? (
        <EpisodeAccordion seasons={seasons} basePath={basePath} />
      ) : (
        <section className="empty-state">
          <p className="empty-state-title">아직 저장된 회차가 없습니다.</p>
          <p className="empty-state-copy">
            `Scripts`에서 대사나 단어를 저장하면 여기에 시즌과 에피소드가 자동으로 나타납니다.
          </p>
        </section>
      )}
    </MobileShell>
  );
}
