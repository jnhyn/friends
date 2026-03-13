"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMemoryStore } from "@/features/memory/store/use-memory-store";
import { EpisodeScript } from "@/types/script";
import { cn } from "@/utils/cn";
import { Fragment } from "react";

const tokenPattern = /[A-Za-z']+|[^A-Za-z'\s]+|\s+/g;

function tokenize(text: string) {
	return text.match(tokenPattern) ?? [text];
}

function episodeKey(script: EpisodeScript) {
	return `${script.slugSeason}/${script.slugEpisode}`;
}

export function ScriptViewer({
	script,
	mode,
}: {
	script: EpisodeScript;
	mode: "scripts" | "memory";
}) {
	const store = useMemoryStore();
	const key = episodeKey(script);
	const memory = store.episodes[key];

	const visibleLines =
		mode === "memory"
			? script.lines.filter(
					(line) =>
						memory?.savedLines.some((saved) => saved.lineId === line.id) ||
						memory?.savedWords.some((saved) => saved.lineId === line.id),
				)
			: script.lines;

	if (mode === "memory" && visibleLines.length === 0) {
		return (
			<Card className="rounded-[28px] border-dashed border-zinc-300">
				<CardContent className="p-6 text-center">
					<p className="text-sm leading-6 text-zinc-600">
						아직 저장된 대사나 단어가 없습니다. `Scripts`에서 먼저 저장하세요.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<section className="space-y-4">
			{visibleLines.map((line, index) => {
				const lineSaved = store.isLineSaved(key, line.id);

				return (
					<div
						key={line.id}
						className={cn(
							" px-3 last:border-b-0",
							lineSaved && "bg-zinc-100 rounded-xl",
						)}
						style={{ animationDelay: `${index * 40}ms` }}
					>
						{line.speaker ? (
							<p className="text-[19px] leading-9 text-zinc-900">
								<span
									role="button"
									tabIndex={0}
									onClick={() =>
										store.toggleLine(key, script.title, {
											lineId: line.id,
											speaker: line.speaker,
											text: line.text,
										})
									}
									onKeyDown={(event) => {
										if (event.key === "Enter" || event.key === " ") {
											event.preventDefault();
											store.toggleLine(key, script.title, {
												lineId: line.id,
												speaker: line.speaker,
												text: line.text,
											});
										}
									}}
									className={cn(
										"cursor-pointer font-semibold text-zinc-950 transition-colors outline-none",
										lineSaved && "text-zinc-500",
									)}
								>
									{line.speaker}:
								</span>{" "}
								{tokenize(line.text).map((token, tokenIndex) => {
									const isWord = /[A-Za-z']+/.test(token);
									const wordSaved = isWord
										? store.isWordSaved(key, line.id, token)
										: false;

									if (!isWord) {
										return (
											<Fragment key={`${line.id}-${tokenIndex}`}>
												{token}
											</Fragment>
										);
									}

									return (
										<button
											key={`${line.id}-${tokenIndex}`}
											type="button"
											onClick={() =>
												store.toggleWord(key, script.title, {
													lineId: line.id,
													value: token,
												})
											}
											className={cn(
												"rounded-sm bg-transparent p-0 text-inherit",
												wordSaved &&
													"text-blue-600 underline decoration-blue-600",
											)}
										>
											{token}
										</button>
									);
								})}
							</p>
						) : (
							<p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
								Scene Note
							</p>
						)}
						{!line.speaker ? (
							<p className="text-[19px] leading-9 text-zinc-900">
								{tokenize(line.text).map((token, tokenIndex) => {
									const isWord = /[A-Za-z']+/.test(token);
									const wordSaved = isWord
										? store.isWordSaved(key, line.id, token)
										: false;

									if (!isWord) {
										return (
											<Fragment key={`${line.id}-${tokenIndex}`}>
												{token}
											</Fragment>
										);
									}

									return (
										<button
											key={`${line.id}-${tokenIndex}`}
											type="button"
											onClick={() =>
												store.toggleWord(key, script.title, {
													lineId: line.id,
													value: token,
												})
											}
											className={cn(
												"rounded-sm bg-transparent p-0 text-inherit",
												wordSaved &&
													"text-blue-600 underline decoration-blue-600",
											)}
										>
											{token}
										</button>
									);
								})}
							</p>
						) : null}
					</div>
				);
			})}
		</section>
	);
}
