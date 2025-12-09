import { AudioItemType } from "./types";

type Props = {
  item: AudioItemType;
};

const convertDate = (isoString: string) =>  {
  return new Date(isoString).toLocaleString("en-IN");
}

export default function AudioItem({ item }: Props) {
  return (
    <div className="border rounded-lg p-3 bg-gray-50">
      <p className="text-sm break-all">
        <span className="font-medium">URL:</span>{" "}
        <a
          href={item.audioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {item.audioUrl}
        </a>
      </p>

      <p className="text-sm mt-1">
        <span className="font-medium">Transcript Data:</span> {item.data}
      </p>

      <p className="text-sm">
        <span className="font-medium">Source:</span> {item.source}
      </p>
      <p className="text-sm mt-1">
        <span className="font-medium">Date:</span> {convertDate(item.createdAt)}
      </p>

      <audio controls src={item.audioUrl} className="w-full mt-2" />
    </div>
  );
}
