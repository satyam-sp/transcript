// src/models/Transcript.ts
import { Schema, model, Document } from "mongoose";

export interface ITranscript extends Document {
  audioUrl: string;
  data: string;
  source: string;
  createdAt: Date;
}

const TranscriptSchema = new Schema<ITranscript>(
  {
    audioUrl: { type: String, required: true },
    data: { type: String, required: true },
    source: { type: String, required: true }
  },
  { timestamps: true } // creates createdAt & updatedAt
);
TranscriptSchema.index({ createdAt: -1 }, { background: true });
export default model<ITranscript>("Transcript", TranscriptSchema);
