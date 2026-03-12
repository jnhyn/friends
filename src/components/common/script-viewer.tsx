"use client";

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
			<section className="empty-state">
				<p className="empty-state-copy">
					아직 저장된 대사나 단어가 없습니다. `Scripts`에서 먼저 저장하세요.
				</p>
			</section>
		);
	}

	return (
		<section className="script-list">
			{visibleLines.map((line, index) => {
				const lineSaved = store.isLineSaved(key, line.id);

				return (
					<article
						key={line.id}
						className={cn("script-line", lineSaved && "script-line-saved")}
						style={{ animationDelay: `${index * 40}ms` }}
					>
						{line.speaker ? (
							<p className="script-line-text">
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
									className={cn("script-speaker", lineSaved && "script-speaker-saved")}
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
											className={cn("script-word", wordSaved && "script-word-saved")}
										>
											{token}
										</button>
									);
								})}
							</p>
						) : (
							<p className="script-line-label">Scene Note</p>
						)}
						{!line.speaker ? (
							<p className="script-line-text">
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
											className={cn("script-word", wordSaved && "script-word-saved")}
										>
											{token}
										</button>
									);
								})}
							</p>
						) : null}
					</article>
				);
			})}
		</section>
	);
}
