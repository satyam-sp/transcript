"use client";
import { useEffect, useState } from "react";

export default function WSPage() {
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000/ws/transcribe");

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data.partial]);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  const sendUrl = () => {
    ws?.send(JSON.stringify({ audioUrl: url }));
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Live Mock Transcription via Audio URL</h2>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter audio URL"
        style={{ width: 400, padding: 8 }}
      />

      <br /><br />

      <button onClick={sendUrl}>Start Transcription</button>

      <div style={{ marginTop: 20 }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
