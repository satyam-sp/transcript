"use client";

import { getAudioList } from "@/store/audio.action";
import {
  useAudioList,
  useAudioListError,
  useAudioListLoading,
} from "@/store/audio.store";
import { useEffect } from "react";
import AudioItem from "./AudioItem";
import AudioListSkeleton from "./AudioListSkeleton";

export default function AudioList() {
  const list = useAudioList();
  const error = useAudioListError();
  const loading = useAudioListLoading();

  useEffect(() => {
    getAudioList();
  }, []);

  return (
    <div className="mt-4 w-full">
      {/* ✅ Top Status Area */}
      <div className="mb-3">
        {loading && <AudioListSkeleton />}

        {!loading && error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      {/* ✅ List */}
      {!loading && !error && list.length > 0 && (
        <div className="space-y-3">
          {list.map((item) => (
            <AudioItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
