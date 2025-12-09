import { Request, Response } from "express";
import Transcript from "../models/Transcript";
import { downloadAudio, transcribeAudioDefault } from "../utils/transcript";



// POST /api/transcripts
export const createTranscript = async (req: Request, res: Response) => {
    try {
        const { audioUrl } = req.body;

        if (!audioUrl) return res.status(400).json({ error: "audioUrl is required" });
        const filePath = await downloadAudio(audioUrl);
        const transcription = await transcribeAudioDefault(filePath);
        const transcript = await Transcript.create({
            audioUrl,
            data: transcription,
            source: "mock"
        });
        res.status(201).json({ transcript });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getTranscripts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string);
        const limit = parseInt((req.query.limit || "50") as string);
        const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const filter = { createdAt: { $gte: last30Days } };

        if (!isNaN(page)) {
            const skip = (page - 1) * limit;
            const data = await Transcript.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
            const total = await Transcript.countDocuments(filter);
            return res.json({ page, limit, total, data });
        }

        const data = await Transcript.find(filter).sort({ createdAt: -1 });
        res.json({ total: data.length, data });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};
