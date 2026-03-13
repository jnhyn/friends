"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
			className="space-y-3"
		>
			{seasons.map((season) => (
				<AccordionItem
					key={season.slugSeason}
					value={season.slugSeason}
					className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white"
				>
					<div className="px-4">
						<AccordionTrigger className="py-5">
							<div className="flex items-center gap-4">
								<div className="flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-sm font-semibold text-zinc-700">
									S{String(season.season).padStart(2, "0")}
								</div>
								<div>
									<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
										Season
									</p>
									<h2 className="mt-1 text-lg font-semibold text-zinc-950">
										Season {season.season}
									</h2>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<div className="border-t border-zinc-200 pt-4">
								<div className="space-y-2 rounded-[20px] bg-zinc-50 p-3">
									{season.episodes.map((episode) => (
										<Link
											key={`${season.slugSeason}-${episode.slugEpisode}`}
											href={`${basePath}/${season.slugSeason}/${episode.slugEpisode}`}
											className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-colors hover:bg-zinc-50"
										>
											<div className="min-w-0">
												<p className="text-sm font-semibold text-zinc-950">
													Episode {String(episode.episode).padStart(2, "0")}
												</p>
												<p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
													{season.slugSeason.toUpperCase()} /{" "}
													{episode.slugEpisode.toUpperCase()}
												</p>
											</div>
											<span className="max-w-[55%] truncate text-right text-sm text-zinc-600">
												{episode.title}
											</span>
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
