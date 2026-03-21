# Intrev-AI 🎙️

> An AI-powered interview practice platform that helps you prepare for job interviews with AI-generated questions, voice-based answers, and real-time feedback.

## Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [API Overview](#api-overview)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## What It Does

Intrev-AI simulates realistic job interviews end-to-end. You choose an interview type and difficulty level, then the platform:

1. Generates contextual interview questions using the **Groq AI** (LLaMA 3) language model
2. Records your spoken answer via your browser microphone
3. Transcribes your audio using **AssemblyAI**
4. Scores your answer and provides detailed AI feedback
5. Presents a results dashboard with scores, strengths, weaknesses, and actionable insights

---

## Features

- 🔐 **JWT Authentication** — Secure email/password registration and login
- 🤖 **AI Question Generation** — Contextual questions powered by Groq's LLaMA 3-8B model
- 🎙️ **Voice Recording** — In-browser audio recording with real-time visual feedback
- 📝 **Speech-to-Text Transcription** — AssemblyAI integration for accurate transcription
- 📊 **AI Feedback & Scoring** — Detailed per-answer feedback with numerical scores
- 🏆 **Results Dashboard** — Score cards, confidence meters, skill breakdowns, and AI insights
- 🧪 **Mock Mode** — Safe testing without live API keys (`USE_AI_MOCK=true`)
- 🎯 **Multiple Interview Types** — Technical, HR, Behavioral, Managerial, and Coding
- ⚖️ **Difficulty Levels** — Easy, Medium, and Hard

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 3, React Router 7 |
| **Backend** | Node.js (ESM), Express 4 |
| **Database** | MongoDB with Mongoose 8 |
| **AI** | Groq SDK (LLaMA 3-8B) |
| **Speech** | AssemblyAI API |
| **Auth** | JWT + bcryptjs |
| **File Upload** | Multer (local disk) |

---

## Prerequisites

- **Node.js** v18 or later (v20 LTS recommended)
- **npm** v9 or later (bundled with Node.js v20+)
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Groq API Key** — [console.groq.com](https://console.groq.com) *(optional — mock mode works without it)*
- **AssemblyAI API Key** — [www.assemblyai.com](https://www.assemblyai.com) *(required for speech transcription)*

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anan5093/intrev-ai.git
cd intrev-ai
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## Configuration

Create a `.env` file inside the `backend/` directory (copy the template below):

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/intrev-ai

# JWT signing secret (use a long random string in production)
JWT_SECRET=your_jwt_secret_here

# Server port (default: 5000)
PORT=5000

# Groq AI API key — get one at https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here

# AssemblyAI API key — get one at https://www.assemblyai.com
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here

# Set to "true" to use mock AI responses (no API keys needed)
USE_AI_MOCK=true
```

> **Tip:** Set `USE_AI_MOCK=true` while developing locally to avoid consuming API credits.

---

## Running the App

### Development (two terminals)

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev       # Starts Express server on http://localhost:5000
```

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev       # Starts Vite dev server on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to the backend automatically.

### Production

```bash
# Build the frontend
cd client
npm run build

# Start the backend (serve the built frontend from your own static server or CDN)
cd ../backend
npm start
```

---

## API Overview

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Create a new account | ❌ |
| `POST` | `/auth/login` | Login and receive a JWT | ❌ |
| `GET` | `/auth/me` | Get the authenticated user | ✅ |
| `POST` | `/interviews` | Create a new interview session | ✅ |
| `GET` | `/interviews/:id` | Fetch an interview by ID | ✅ |
| `POST` | `/interviews/:id/complete` | Mark interview as completed | ✅ |
| `POST` | `/ai/question/:interviewId` | Generate next AI question | ✅ |
| `POST` | `/ai/answer/:interviewId` | Submit answer and get feedback | ✅ |
| `POST` | `/speech/transcribe` | Upload audio and get transcript | ✅ |
| `GET` | `/results/interview/:interviewId` | Get results for an interview | ✅ |
| `GET` | `/results/my-results` | Get all past results for the user | ✅ |

> ✅ = Requires `Authorization: Bearer <token>` header

---

## Project Structure

```
intrev-ai/
├── backend/                   # Express.js API server
│   ├── config/                # DB, AI, and upload configuration
│   ├── controllers/           # Route handler logic
│   ├── middleware/            # JWT auth middleware
│   ├── models/                # Mongoose schemas (User, Interview)
│   ├── routes/                # Express route definitions
│   ├── uploads/audio/         # Local audio file storage
│   └── server.js              # App entry point
│
└── client/                    # React + Vite frontend
    └── src/
        ├── components/        # Reusable UI components
        │   ├── auth/          # Login form, Google button
        │   ├── common/        # Navbar, Footer, Layout, Button
        │   ├── dashboard/     # Score cards, charts, insights
        │   └── interview/     # Question cards, voice recorder
        ├── context/           # React context (AuthContext)
        ├── pages/             # Top-level route pages
        ├── routes/            # React Router configuration
        └── services/          # Axios API service layer
```

---

## Contributing

Contributions are welcome! Please open an issue to discuss your idea before submitting a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built by <a href="https://github.com/anan5093">Anand Raj</a></p>
