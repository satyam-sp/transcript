import express from "express";
import { createTranscript, getTranscripts } from "../controllers/transcript.controller";

const router = express.Router();

router.post("/", createTranscript);
router.get("/", getTranscripts);

export default router;
