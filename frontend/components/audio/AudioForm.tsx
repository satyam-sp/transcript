"use client";

import { useAudioLoading } from "@/store/audio.store";
import AudioInput from "./AudioInput";
import { addAudio } from "@/store/audio.action";

export default function AudioForm() {
  const loading = useAudioLoading()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addAudio();
      }}
      className="space-y-4"
    >
      <AudioInput />

      <button
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded 
    ${loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-blue-700"
          }
  `}
      >
        {loading ? "Please wait.." : "Submit"}
      </button>

    </form>
  );
}
