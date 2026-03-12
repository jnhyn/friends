import { notFound } from "next/navigation";
import { ScriptDetailPage } from "@/components/common/script-detail-page";
import { getScriptBySlug } from "@/utils/scripts-data";

export default async function ScriptEpisodePage({
  params,
}: {
  params: Promise<{ season: string; episode: string }>;
}) {
  const { season, episode } = await params;
  const script = getScriptBySlug(season, episode);

  if (!script) {
    notFound();
  }

  return <ScriptDetailPage script={script} mode="scripts" />;
}
