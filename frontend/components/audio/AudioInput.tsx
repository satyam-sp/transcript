"use client";

import { useAudioUrl, useAudioError } from "@/store/audio.store";
import { setAudioUrl } from "@/store/audio.action";

export default function AudioInput() {
  const audioUrl = useAudioUrl();
  const error = useAudioError();

  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Audio URL
      </label>

      <input
        type="url"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-blue-500 
          ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="https://example.com/audio.mp3"
      />

      {error && (
        <p className="text-red-600 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
