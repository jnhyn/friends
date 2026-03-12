"use client";

import { Button } from "@/components/ui/button";
import { useMemoryStore } from "@/features/memory/store/use-memory-store";
import { EpisodeScript } from "@/types/script";

function episodeKey(script: EpisodeScript) {
  return `${script.slugSeason}/${script.slugEpisode}`;
}

export function MemorySummary({ script }: { script: EpisodeScript }) {
  const key = episodeKey(script);
  const { episodes, resetEpisode } = useMemoryStore();
  const memory = episodes[key];

  return (
    <section className="mb-4 rounded-[28px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,247,211,0.75))] p-5 shadow-[0_16px_28px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Saved Memory</p>
          <h3 className="mt-1 text-lg font-semibold">저장한 단어와 대사</h3>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => resetEpisode(key)}
          disabled={!memory}
        >
          Reset
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[22px] border border-black/8 bg-white/85 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Words</p>
          <p className="mt-2 text-2xl font-semibold">{memory?.savedWords.length ?? 0}</p>
        </div>
        <div className="rounded-[22px] border border-black/8 bg-white/85 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Lines</p>
          <p className="mt-2 text-2xl font-semibold">{memory?.savedLines.length ?? 0}</p>
        </div>
      </div>
      {memory ? (
        <div className="mt-5 grid gap-4">
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-4">
            <p className="text-sm font-semibold">Words</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
              {memory.savedWords.length > 0 ? (
                memory.savedWords.map((word) => <li key={`${word.lineId}-${word.value}`}>{word.value}</li>)
              ) : (
                <li className="text-[color:var(--muted)]">저장된 단어가 없습니다.</li>
              )}
            </ul>
          </div>
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-4">
            <p className="text-sm font-semibold">Lines</p>
            <ul className="mt-3 space-y-3 text-sm leading-6">
              {memory.savedLines.length > 0 ? (
                memory.savedLines.map((line) => (
                  <li key={line.lineId}>
                    {line.speaker ? `${line.speaker}: ${line.text}` : line.text}
                  </li>
                ))
              ) : (
                <li className="text-[color:var(--muted)]">저장된 대사가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
