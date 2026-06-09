export type TehilimChapter = {
  chapterNumber: number;
  title: string;
  verses: string[];
  verseCount: number;
};

export type FallenSoldier = {
  id: number;
  name: string;
  hebrewDeathDate: string;
};

export type TehilimStats = {
  totalChapters: number;
  readChaptersCount: number;
  inProgressChaptersCount: number;
  availableChaptersCount: number;
  remainingChaptersCount: number;
  completedChapterNumbers: number[];
  inProgressChapterNumbers: number[];
  completedBooksCount: number;
  isBookOneCompleted: boolean;
  pageVisitsCount: number;
};

export type TehilimReadResponse = {
  chapter: TehilimChapter | null;
  soldier: FallenSoldier | null;
  stats: TehilimStats;
  isFinished: boolean;
};

export type TehilimCompleteResponse = {
  stats: TehilimStats;
  completedChapterNumber: number;
  alreadyCompleted: boolean;
  isBookOneCompleted: boolean;
};
