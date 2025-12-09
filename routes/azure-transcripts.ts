import express from "express";
import { createTranscript } from "../controllers/azure-transcripts.controller";

const router = express.Router();

router.post("/", createTranscript);

export default router;