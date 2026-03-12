"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SeasonGroup = {
  season: number;
  slugSeason: string;
  episodes: Array<{
    episode: number;
    slugEpisode: string;
    title: string;
  }>;
};

export function EpisodeAccordion({
  seasons,
  basePath,
}: {
  seasons: SeasonGroup[];
  basePath: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={seasons[0] ? seasons[0].slugSeason : undefined}
      className="accordion-root"
    >
      {seasons.map((season) => (
        <AccordionItem
          key={season.slugSeason}
          value={season.slugSeason}
          className="accordion-item-card"
        >
          <div className="px-5">
            <AccordionTrigger>
              <div className="accordion-item-row">
                <div className="accordion-badge">
                  S{String(season.season).padStart(2, "0")}
                </div>
                <div>
                  <p className="accordion-heading-kicker">Season</p>
                  <h2 className="accordion-heading-title">Season {season.season}</h2>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="accordion-panel">
                <div className="accordion-episode-list">
                  {season.episodes.map((episode) => (
                    <Link
                      key={`${season.slugSeason}-${episode.slugEpisode}`}
                      href={`${basePath}/${season.slugSeason}/${episode.slugEpisode}`}
                      className="accordion-episode-link"
                    >
                      <div>
                        <p className="accordion-episode-title">
                          Episode {String(episode.episode).padStart(2, "0")}
                        </p>
                        <p className="accordion-episode-meta">
                          {season.slugSeason.toUpperCase()} / {episode.slugEpisode.toUpperCase()}
                        </p>
                      </div>
                      <span className="accordion-episode-copy">{episode.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
