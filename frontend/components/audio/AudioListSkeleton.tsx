export default function AudioListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 border rounded-md animate-pulse"
        >
          {/* Thumbnail */}
          <div className="w-12 h-12 bg-gray-200 rounded-md" />

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
