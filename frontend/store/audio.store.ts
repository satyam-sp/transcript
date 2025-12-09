import {create} from "zustand";

// ✅ Audio Item Type
export type AudioItem = {
  audioUrl: string;
  data: string;
  source: string;
  createdAt: string;
  _id: string;
};

// ✅ Store State Type
export type AudioState = {
  audioList: AudioItem[];
  audioUrl: string;
  loading: boolean;
  error: string | null;
  listError: string | null;
  listLoading: boolean;
  selectedAudio: AudioItem | null;
};

// ✅ Initial State
export const INITIAL_STATE: AudioState = {
  audioList: [],
  audioUrl: "",
  loading: false,
  listLoading: false,
  error: null,
  listError: null,
  selectedAudio: null,
};

// ✅ Zustand Store
export const useAudioStore = create<AudioState>(() => ({
  ...INITIAL_STATE,
}));

// ✅ Selectors (Typed, like your Cafe selectors)
export const useAudioList = (): AudioItem[] =>
  useAudioStore((s: AudioState) => s.audioList);

export const useAudioLoading = (): boolean =>
  useAudioStore((s: AudioState) => s.loading);

export const useAudioListLoading = (): boolean =>
  useAudioStore((s: AudioState) => s.listLoading);


export const useAudioError = (): string | null =>
  useAudioStore((s: AudioState) => s.error);


export const useAudioListError = (): string | null =>
  useAudioStore((s: AudioState) => s.listError);

export const useSelectedAudio = (): AudioItem | null =>
  useAudioStore((s: AudioState) => s.selectedAudio);

export const useAudioUrl = (): string =>
  useAudioStore((s: AudioState) => s.audioUrl);
