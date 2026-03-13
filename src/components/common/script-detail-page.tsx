import { MobileShell } from "@/components/common/mobile-shell";
import { EpisodeScript } from "@/types/script";
import { MemorySummary } from "@/components/common/script-memory-summary";
import { ScriptViewer } from "@/components/common/script-viewer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
      <Card className="mb-4 rounded-[28px] border-zinc-200/80">
        <CardContent className="space-y-4 p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              {script.slugSeason.toUpperCase()} · {script.slugEpisode.toUpperCase()}
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-zinc-950">
              {script.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{script.summary}</p>
          </div>
          <Badge>{mode === "scripts" ? "Script Study" : "Saved Memory"}</Badge>
        </CardContent>
      </Card>
      {mode === "memory" ? <MemorySummary script={script} /> : null}
      <ScriptViewer script={script} mode={mode} />
    </MobileShell>
  );
}
