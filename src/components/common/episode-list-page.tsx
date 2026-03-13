import { EpisodeAccordion } from "@/components/common/episode-accordion";
import { MobileShell } from "@/components/common/mobile-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
	const episodeCount = seasons.reduce(
		(total, season) => total + season.episodes.length,
		0,
	);

	return (
		<MobileShell title={title} eyebrow={eyebrow}>
			<Card className="mb-5 rounded-[28px] border-zinc-200/80">
				<CardContent className="space-y-4 p-5">
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
								{title}
							</p>
							<h2 className="mt-2 text-2xl font-semibold leading-tight text-zinc-950 text-balance">
								{description}
							</h2>
						</div>
						<div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-right">
							<p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
								Episodes
							</p>
							<p className="mt-1 text-lg font-semibold text-zinc-950">
								{episodeCount}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						<Badge variant="outline">
							{variant === "scripts"
								? "Tap speaker to save line"
								: "Filtered by saved memory"}
						</Badge>
						<Badge variant="secondary">
							{variant === "scripts"
								? "Tap word to underline + save"
								: `${seasons.length} seasons visible`}
						</Badge>
					</div>
				</CardContent>
			</Card>
			<p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
				{variant === "scripts" ? "Memorize with Rhythm" : "Saved for Review"}
			</p>
			{seasons.length > 0 ? (
				<EpisodeAccordion seasons={seasons} basePath={basePath} />
			) : (
				<Card className="rounded-[28px] border-dashed border-zinc-300">
					<CardContent className="p-6 text-center">
						<p className="text-base font-semibold text-zinc-950">
							아직 저장된 회차가 없습니다.
						</p>
						<p className="mt-2 text-sm leading-6 text-zinc-600">
							`Scripts`에서 대사나 단어를 저장하면 여기에 시즌과 에피소드가
							자동으로 나타납니다.
						</p>
					</CardContent>
				</Card>
			)}
		</MobileShell>
	);
}
