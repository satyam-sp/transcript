// src/utils/transcribe.ts
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { tmpdir } from "os";
import OpenAI from "openai";

let SpeechSDK: any;
try {
    SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
} catch {
    console.warn("Azure Speech SDK not installed, using mock transcription.");
}

// Download audio to temp file
export async function downloadAudio(url: string): Promise<string> {
    console.log('Downloading file...')
    const filePath = path.join(tmpdir(), `audio-${Date.now()}.mp3`);
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log('Download file ')

    return filePath;
}

export async function transcribeAudioDefault(filePath: string) {
    try {
        if (!process.env.OPENAI_API_KEY) return 'Transcript Text'
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const fileStream = fs.createReadStream(filePath);
        const response = await openai.audio.transcriptions.create({
            file: fileStream,
            model: "whisper-1",
        });
        console.log(response)


        const text = response.text;
    } catch (e) {
        console.log(e)
        return 'Transcript Text'
    }
    finally {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);

    }

};

// Azure transcription if keys exist
async function azureTranscribe(filePath: string): Promise<string> {
    if (!SpeechSDK || !process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION)
        return "";
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        process.env.AZURE_SPEECH_KEY,
        process.env.AZURE_SPEECH_REGION
    );
    const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(fs.readFileSync(filePath));
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
        recognizer.recognizeOnceAsync(
            (result: any) => {
                if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) resolve(result.text);
                else reject(new Error("Azure recognition failed"));
            },
            (err: any) => reject(err)
        );
    });
}

// Main transcription utility
export async function transcribeAudio(audioUrl: string) {
    let filePath: string | undefined;
    try {
        filePath = await downloadAudio(audioUrl);
        const azureResult = await azureTranscribe(filePath);
        const text = azureResult || `Mock transcription for ${audioUrl}`;
        return text;
    } finally {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}
