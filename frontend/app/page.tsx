import AudioForm from "@/components/audio/AudioForm";
import AudioList from "@/components/audio/AudioList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start gap-6">
        <AudioForm />
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 w-full">
          Last 30 Days Records
        </h2>
        <AudioList />
      </main>
    </div>
  );
}
