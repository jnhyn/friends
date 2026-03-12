import { MobileShell } from "@/components/common/mobile-shell";
import { EpisodeScript } from "@/types/script";
import { MemorySummary } from "@/components/common/script-memory-summary";
import { ScriptViewer } from "@/components/common/script-viewer";

export function ScriptDetailPage({
  script,
  mode,
}: {
  script: EpisodeScript;
  mode: "scripts" | "memory";
}) {
  const title = `${script.slugSeason.toUpperCase()} ${script.slugEpisode.toUpperCase()}`;

  return (
    <MobileShell title={title} eyebrow={script.title}>
      <section className="detail-hero">
        <p className="detail-kicker">{script.slugSeason.toUpperCase()} · {script.slugEpisode.toUpperCase()}</p>
        <h2 className="detail-title">{script.title}</h2>
        <p className="detail-summary">{script.summary}</p>
        <div className="detail-meta">
          <span>{mode === "scripts" ? "Script Study" : "Saved Memory"}</span>
        </div>
      </section>
      {mode === "memory" ? <MemorySummary script={script} /> : null}
      <ScriptViewer script={script} mode={mode} />
    </MobileShell>
  );
}
