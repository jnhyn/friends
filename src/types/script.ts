export type ScriptLine = {
  id: string;
  speaker: string | null;
  text: string;
};

export type EpisodeScript = {
  season: number;
  episode: number;
  slugSeason: string;
  slugEpisode: string;
  title: string;
  summary: string;
  lines: ScriptLine[];
};

export type EpisodeMeta = {
  season: number;
  episode: number;
  slugSeason: string;
  slugEpisode: string;
  title: string;
};
