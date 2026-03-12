"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedLine = {
  lineId: string;
  speaker: string | null;
  text: string;
};

type SavedWord = {
  lineId: string;
  value: string;
};

type EpisodeMemory = {
  title: string;
  savedLines: SavedLine[];
  savedWords: SavedWord[];
};

type MemoryState = {
  episodes: Record<string, EpisodeMemory>;
  toggleLine: (episodeKey: string, title: string, line: SavedLine) => void;
  toggleWord: (episodeKey: string, title: string, word: SavedWord) => void;
  resetEpisode: (episodeKey: string) => void;
  isLineSaved: (episodeKey: string, lineId: string) => boolean;
  isWordSaved: (episodeKey: string, lineId: string, value: string) => boolean;
};

function ensureEpisode(state: MemoryState["episodes"], episodeKey: string, title: string): EpisodeMemory {
  return state[episodeKey] ?? {
    title,
    savedLines: [],
    savedWords: [],
  };
}

export const useMemoryStore = create<MemoryState>()(
  persist(
    (set, get) => ({
      episodes: {},
      toggleLine: (episodeKey, title, line) =>
        set((state) => {
          const episode = ensureEpisode(state.episodes, episodeKey, title);
          const savedLines = episode.savedLines.some((item) => item.lineId === line.lineId)
            ? episode.savedLines.filter((item) => item.lineId !== line.lineId)
            : [...episode.savedLines, line];

          const nextEpisode = {
            ...episode,
            title,
            savedLines,
          };

          return {
            episodes: {
              ...state.episodes,
              [episodeKey]: nextEpisode,
            },
          };
        }),
      toggleWord: (episodeKey, title, word) =>
        set((state) => {
          const episode = ensureEpisode(state.episodes, episodeKey, title);
          const savedWords = episode.savedWords.some(
            (item) => item.lineId === word.lineId && item.value === word.value,
          )
            ? episode.savedWords.filter(
                (item) => !(item.lineId === word.lineId && item.value === word.value),
              )
            : [...episode.savedWords, word];

          return {
            episodes: {
              ...state.episodes,
              [episodeKey]: {
                ...episode,
                title,
                savedWords,
              },
            },
          };
        }),
      resetEpisode: (episodeKey) =>
        set((state) => {
          const nextEpisodes = { ...state.episodes };
          delete nextEpisodes[episodeKey];
          return { episodes: nextEpisodes };
        }),
      isLineSaved: (episodeKey, lineId) => {
        const episode = get().episodes[episodeKey];
        return episode?.savedLines.some((item) => item.lineId === lineId) ?? false;
      },
      isWordSaved: (episodeKey, lineId, value) => {
        const episode = get().episodes[episodeKey];
        return (
          episode?.savedWords.some((item) => item.lineId === lineId && item.value === value) ?? false
        );
      },
    }),
    {
      name: "friends-memory-store",
    },
  ),
);
