export type Narrator = {
  id: string;
  name: string;
  icon: string;
  featured?: boolean;
};

export type TTSPlayerBarProps = {
  selectedNarrator: string | null;
  isPlaying: boolean;
  currentTime: number;
  preloadedDuration: number;
  playbackRate: number;
  displayNarratorObj: Narrator | null;
  orderedNarrators: Narrator[];
  preferredNarrator: string | null;
  title: string;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onPlaybackRateChange: () => void;
  onNarratorClick: (e: React.MouseEvent) => void;
  onBarClick?: () => void;
};

export type TTSPlayerTitleProps = {
  title: string;
  displayNarratorObj: Narrator | null;
  isPlaying: boolean;
  currentTime: number;
  preloadedDuration: number;
};
