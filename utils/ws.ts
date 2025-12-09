import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import Transcript from "../models/Transcript";

export function initWebSocket(server: any) {
  const wss = new WebSocketServer({
    server,
    path: "/ws/transcribe",
  });

  wss.on("connection", (ws: any) => {
    const sessionId = uuidv4();
    let audioUrl = "";
    const partials: string[] = [];

    ws.on("message", (msg: any) => {
      const data = JSON.parse(msg.toString());

      if (data.audioUrl) {
        audioUrl = data.audioUrl;

        // ✅ Mock live transcription stream
        let count = 1;
        const interval = setInterval(() => {
          const text = `Mock transcript ${count} for ${audioUrl}`;
          partials.push(text);

          ws.send(JSON.stringify({ partial: text }));

          count++;
          if (count > 5) clearInterval(interval);
        }, 800);
      }
    });

    ws.on("close", async () => {
      if (!audioUrl) return;

      await Transcript.create({
        audioUrl,
        data: partials.join(" "),
        source: "mock-realtime-url",
      });
    });
  });
}
