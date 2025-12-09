import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import transcriptsRouter from "./routes/transcripts";
import azureTranscriptsRouter from "./routes/azure-transcripts";
import cors from 'cors';


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // ✅ Allow all origins

app.use("/api/transcription", transcriptsRouter);
app.use("/api/azure-transcription", azureTranscriptsRouter);

export default app;
