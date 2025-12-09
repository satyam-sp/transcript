Transcript Service
A simple Express + MongoDB service to store and fetch audio transcription (dummy data).

1. Setup Instructions


Clone the repository


git clone <your-repo-url>
cd backend-transcript



Install dependencies


npm install



Configure environment variables


Create a .env file:
PORT=3000
MONGO_URI=mongodb://localhost:27017/transcripts
DB_POOL_SIZE=10



Run the server


npm run dev   # if using ts-node
# or
npm start     # compiled JS


2. Database
MongoDB collection: transcripts
Mongoose model: Transcript

const TranscriptSchema = new Schema<ITranscript>(
  {
    audioUrl: { type: String, required: true },
    data: { type: String, required: true },
    source: { type: String, required: true }
  },
  { timestamps: true }
);

// Index to optimize queries by createdAt
TranscriptSchema.index({ createdAt: -1 });

export default model<ITranscript>("Transcript", TranscriptSchema);


3. Endpoints
3.1 POST /api/transcripts
Description: Create a new transcript (dummy transcription).
Request:
POST /api/transcripts
Content-Type: application/json

{
  "audioUrl": "https://example.com/sample.mp3"
}

Response:
{
    transcript: {
  "_id": "64ab12345f6789abcdef0123",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    createdAt: "2025-12-09T18:30:23.418Z"
    data: "Transcript Text"
    source: "mock"
    updatedAt: "2025-12-09T18:30:23.418Z"
    }
}



3.2 POST /api/transcripts
Description: Create a new transcript (dummy transcription).
Request:
POST /api/transcripts
Content-Type: application/json

{
  "audioUrl": "https://example.com/sample.mp3"
}


Response:
{
    transcript: {
  "_id": "64ab12345f6789abcdef0123",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    createdAt: "2025-12-09T18:30:23.418Z"
    data: "Transcript Text"
    source: "mock"
    updatedAt: "2025-12-09T18:30:23.418Z"
    }
}


3.3 GET /api/transcripts
Description: Fetch transcripts from last 30 days. Optional pagination via page and limit.
Request examples:


Last 30 days, no pagination:


GET /api/transcripts



Last 30 days, page 2, 50 per page:


GET /api/transcripts?page=2&limit=50
Response: {
    total: 20,
    data: [{

  "_id": "64ab12345f6789abcdef0123",
    audioUrl: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    createdAt: "2025-12-09T18:30:23.418Z"
    data: "Transcript Text"
    source: "mock"
    updatedAt: "2025-12-09T18:30:23.418Z"

    }]
}



1. Dummy Transcription


For every POST request, the server returns a dummy transcription:


"This is a dummy transcription for audio: <audioUrl>"



No real audio processing is required. Fully free and fast.



5. Database Indexing


Index on createdAt improves performance when fetching recent records:


TranscriptSchema.index({ createdAt: -1 });

