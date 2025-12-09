import axiosInstance from "@/services/axiosInstance"; // ✅ your file
import { useAudioStore, AudioItem } from "./audio.store";

const { setState, getState } = useAudioStore;

/**
 * ✅ Set Audio URL
 */
export const setAudioUrl = (audioUrl: string): void => {
  setState({
    audioUrl,
    error: null,
  });
};

/**
 * ✅ GET Audio List
 */
export const getAudioList = async (): Promise<void> => {
  try {
    setState({ listLoading: true, listError: null });

    const { data } = await axiosInstance.get<{data: AudioItem[]}>("/api/transcription");
    setState({
      audioList: data.data,
      listLoading: false,
    });
  } catch (error: any) {
    setState({
      listLoading: false,
      listError: error?.response?.data?.message || "Failed to fetch audio list",
    });
  }
};

/**
 * ✅ POST Add Audio
 */
export const addAudio = async (): Promise<void> => {
  const { audioUrl } = getState();

  if (!audioUrl?.trim()) {
    return setState({ error: "Audio URL is required" });
  }

  const audioRegex = /(https?:\/\/.*\.(?:mp3|wav|ogg|m4a))/i;
  if (!audioRegex.test(audioUrl)) {
    return setState({
      error: "Only mp3, wav, ogg, m4a URLs allowed",
    });
  }

  try {
    setState({ loading: true, error: null });

    const { data: newItem } = await axiosInstance.post<{transcript: AudioItem}>(
      "/api/transcription",
      { audioUrl: audioUrl }
    );

    setState((state) => ({
      audioList: [newItem.transcript, ...state.audioList],
      audioUrl: "",
      loading: false,
    }));
  } catch (error: any) {
    setState({
      loading: false,
      error: error?.response?.data?.message || "Failed to add audio",
    });
  }
};

/**
 * ✅ Set Selected Audio
 */
export const setSelectedAudio = (selectedAudio: AudioItem): void => {
  setState({
    selectedAudio,
  });
};

/**
 * ✅ Reset Store
 */
export const resetAudioStore = (): void => {
  setState({
    audioList: [],
    audioUrl: "",
    loading: false,
    error: null,
    selectedAudio: null,
  });
};
