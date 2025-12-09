import { transcribeAudio } from "../utils/transcript";
import { Request, Response } from "express";
import Transcript from "../models/Transcript";

export const createTranscript = async (req: Request, res: Response) => {
 try {
    const { audioUrl } = req.body;
    if (!audioUrl) return res.status(400).json({ error: "audioUrl required" });

    const text = await transcribeAudio(audioUrl);
    const doc = await Transcript.create({ audioUrl, data: text, source: "azure" });
    res.json({ doc });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Transcription failed" });
  }
}