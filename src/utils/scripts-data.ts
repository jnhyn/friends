import { EpisodeMeta, EpisodeScript } from "@/types/script";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function createPlaceholderEpisode(season: number, episode: number): EpisodeMeta {
  return {
    season,
    episode,
    slugSeason: `s${pad(season)}`,
    slugEpisode: `e${pad(episode)}`,
    title: `The Study Session ${pad(season)}-${pad(episode)}`,
  };
}

const curatedScripts: EpisodeScript[] = [
  {
    season: 1,
    episode: 1,
    slugSeason: "s01",
    slugEpisode: "e01",
    title: "The One Where Monica Gets a Roommate",
    summary: "첫 만남의 에너지와 일상 영어 표현이 많은 대표 에피소드.",
    lines: [
      { id: "l1", speaker: null, text: "Central Perk. The gang watches Monica wipe down the table with impossible focus." },
      { id: "l2", speaker: "Monica", text: "There is nothing to tell. He is just some guy I work with." },
      { id: "l3", speaker: "Joey", text: "Come on, you are going out with the guy. There is got to be something wrong with him." },
      { id: "l4", speaker: "Chandler", text: "All right Joey, be nice. So does he have a hump, or a hairpiece?" },
      { id: "l5", speaker: "Phoebe", text: "Wait, does he eat chalk?" },
      { id: "l6", speaker: null, text: "The front door bursts open and Rachel enters in a soaked wedding dress." },
      { id: "l7", speaker: "Rachel", text: "I just want a million dollars." },
      { id: "l8", speaker: "Monica", text: "Welcome to the real world. It sucks. You are gonna love it." },
      { id: "l9", speaker: "Ross", text: "I just want to be married again." },
      { id: "l10", speaker: "Chandler", text: "And I just want a million dollars." }
    ]
  },
  {
    season: 1,
    episode: 2,
    slugSeason: "s01",
    slugEpisode: "e02",
    title: "The One with the Sonogram at the End",
    summary: "감정 표현과 짧은 리액션 문장이 특히 좋은 회차.",
    lines: [
      { id: "l1", speaker: "Ross", text: "No, no, do not stop cleansing my aura." },
      { id: "l2", speaker: "Phoebe", text: "Just leave my aura alone, okay?" },
      { id: "l3", speaker: "Monica", text: "I cannot believe you did not tell us you were seeing someone." },
      { id: "l4", speaker: "Chandler", text: "Sometimes I wish I was a lesbian. Did I say that out loud?" },
      { id: "l5", speaker: "Rachel", text: "I am finally doing something for me." }
    ]
  },
  {
    season: 2,
    episode: 1,
    slugSeason: "s02",
    slugEpisode: "e01",
    title: "The One with Ross's New Girlfriend",
    summary: "질투, 관계, 일상 리듬이 잘 드러나는 학습용 회차.",
    lines: [
      { id: "l1", speaker: "Rachel", text: "Nobody said it was easy. They just said it was worth it." },
      { id: "l2", speaker: "Monica", text: "You can do hard things if you stop rehearsing disaster." },
      { id: "l3", speaker: "Joey", text: "I am telling you, confidence is ninety percent timing." },
      { id: "l4", speaker: null, text: "A long silence turns into laughter that fills the apartment." }
    ]
  }
];

const scriptMap = new Map(
  curatedScripts.map((script) => [`${script.slugSeason}/${script.slugEpisode}`, script]),
);

export function getEpisodeCatalog() {
  return Array.from({ length: 10 }, (_, seasonIndex) => {
    const season = seasonIndex + 1;

    return {
      season,
      slugSeason: `s${pad(season)}`,
      episodes: Array.from({ length: 20 }, (_, episodeIndex) =>
        createPlaceholderEpisode(season, episodeIndex + 1),
      ),
    };
  });
}

export function getScriptBySlug(slugSeason: string, slugEpisode: string) {
  const key = `${slugSeason}/${slugEpisode}`;
  const existing = scriptMap.get(key);

  if (existing) {
    return existing;
  }

  const season = Number(slugSeason.replace("s", ""));
  const episode = Number(slugEpisode.replace("e", ""));

  if (Number.isNaN(season) || Number.isNaN(episode) || season < 1 || season > 10 || episode < 1 || episode > 20) {
    return null;
  }

  return {
    season,
    episode,
    slugSeason,
    slugEpisode,
    title: `The Study Session ${pad(season)}-${pad(episode)}`,
    summary: "백엔드 연동 전까지 사용할 하드코딩 샘플 에피소드입니다.",
    lines: [
      {
        id: "l1",
        speaker: null,
        text: "This is a placeholder scene for script memorization and vocabulary saving.",
      },
      {
        id: "l2",
        speaker: "Monica",
        text: "Practice one line at a time, and the whole scene becomes easier to remember.",
      },
      {
        id: "l3",
        speaker: "Chandler",
        text: "Could this study app be any more focused on consistency?",
      },
      {
        id: "l4",
        speaker: "Rachel",
        text: "Save the words you miss, then come back and repeat them on the train.",
      },
    ],
  };
}

export function getEpisodeMeta(slugSeason: string, slugEpisode: string) {
  const script = getScriptBySlug(slugSeason, slugEpisode);

  if (!script) {
    return null;
  }

  return {
    season: script.season,
    episode: script.episode,
    slugSeason: script.slugSeason,
    slugEpisode: script.slugEpisode,
    title: script.title,
  } satisfies EpisodeMeta;
}
