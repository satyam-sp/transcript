Transcript Service

A simple Express + MongoDB service to store and fetch audio
transcriptions using dummy data.

------------------------------------------------------------------------

1. Setup Instructions

1.1 Clone the Repository

    git clone <your-repo-url>
    cd backend-transcript

1.2 Install Dependencies

    npm install

1.3 Configure Environment Variables

Create a .env file:

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/transcripts
    DB_POOL_SIZE=10

1.4 Run the Server

    npm run dev    # Using ts-node
    # OR
    npm start      # Using compiled JS

------------------------------------------------------------------------

2. Database

Collection Name: transcripts
Mongoose Model: Transcript

    const TranscriptSchema = new Schema<ITranscript>(
      {
        audioUrl: { type: String, required: true },
        data: { type: String, required: true },
        source: { type: String, required: true },
      },
      { timestamps: true }
    );

    // Index to optimize queries by createdAt
    TranscriptSchema.index({ createdAt: -1 });

    export default model<ITranscript>("Transcript", TranscriptSchema);

------------------------------------------------------------------------

3. API Endpoints

3.1 Create Transcript

POST /api/transcription
Creates a new transcript using dummy transcription data.

Request

    POST /api/transcription
    Content-Type: application/json

    {
      "audioUrl": "https://example.com/sample.mp3"
    }

Response

    {
      "transcript": {
        "_id": "64ab12345f6789abcdef0123",
        "audioUrl": "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
        "data": "Transcript Text",
        "source": "mock",
        "createdAt": "2025-12-09T18:30:23.418Z",
        "updatedAt": "2025-12-09T18:30:23.418Z"
      }
    }

------------------------------------------------------------------------



3.2 Create Transcript Azure

POST /api/transcripts
Creates a new transcript using dummy transcription data.

Request

    POST /api/azure-transcription
    Content-Type: application/json

    {
      "audioUrl": "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
    }

Response

    {
      "transcript": {
        "_id": "64ab12345f6789abcdef0123",
        "audioUrl": "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
        "data": "Transcript Text",
        "source": "mock",
        "createdAt": "2025-12-09T18:30:23.418Z",
        "updatedAt": "2025-12-09T18:30:23.418Z"
      }
    }

------------------------------------------------------------------------

3.2 Fetch Transcripts (Last 30 Days)

Without Pagination

    GET /api/transcription

With Pagination

    GET /api/transcription?page=2&limit=50

Response

    {
      "total": 20,
      "data": [
        {
          "_id": "64ab12345f6789abcdef0123",
          "audioUrl": "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
          "data": "Transcript Text",
          "source": "mock",
          "createdAt": "2025-12-09T18:30:23.418Z",
          "updatedAt": "2025-12-09T18:30:23.418Z"
        }
      ]
    }

------------------------------------------------------------------------

4. Dummy Transcription Logic

For every POST request, the server returns a dummy transcription:

    This is a dummy transcription for audio: <audioUrl>

✅ No real audio processing
✅ Fully free & fast

------------------------------------------------------------------------

5. Database Indexing

    TranscriptSchema.index({ createdAt: -1 });

Improves performance when fetching recent transcripts.

------------------------------------------------------------------------

6. Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   TypeScript

------------------------------------------------------------------------

7. FrontEnd Directory

- /frontend 
Build on next version 16 js node version 20
-npm install 
- npm run dev 
- for web socket you can change url to /ws

✅ Ready for integration with real speech-to-text services in the
future.
