"use client";

import { EpisodeListPage } from "@/components/common/episode-list-page";
import { useMemoryStore } from "@/features/memory/store/use-memory-store";
import { getEpisodeMeta } from "@/utils/scripts-data";

export function MemoryListPage() {
  const episodes = useMemoryStore((state) => state.episodes);

  const seasons = Object.entries(episodes).reduce<
    Array<{
      season: number;
      slugSeason: string;
      episodes: Array<{ episode: number; slugEpisode: string; title: string }>;
    }>
  >((accumulator, [key, value]) => {
    const [slugSeason, slugEpisode] = key.split("/");
    const meta = getEpisodeMeta(slugSeason, slugEpisode);

    if (!meta || (value.savedLines.length === 0 && value.savedWords.length === 0)) {
      return accumulator;
    }

    const existingSeason = accumulator.find((item) => item.slugSeason === slugSeason);

    if (existingSeason) {
      existingSeason.episodes.push({
        episode: meta.episode,
        slugEpisode,
        title: meta.title,
      });
      existingSeason.episodes.sort((a, b) => a.episode - b.episode);
      return accumulator;
    }

    accumulator.push({
      season: meta.season,
      slugSeason,
      episodes: [
        {
          episode: meta.episode,
          slugEpisode,
          title: meta.title,
        },
      ],
    });

    return accumulator.sort((a, b) => a.season - b.season);
  }, []);

  return (
    <EpisodeListPage
      title="Memory"
      eyebrow="Saved Expressions"
      description="저장한 시즌과 에피소드만 모아서 빠르게 복습하세요."
      seasons={seasons}
      basePath="/memory"
      variant="memory"
    />
  );
}
