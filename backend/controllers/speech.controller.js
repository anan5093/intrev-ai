import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const ASSEMBLY_API = "https://api.assemblyai.com/v2";

export const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    if (!process.env.ASSEMBLYAI_API_KEY) {
      return res.status(500).json({ message: "AssemblyAI API key missing" });
    }

    const audioPath = req.file.path;

    if (!fs.existsSync(audioPath)) {
      return res.status(400).json({ message: "Audio file not found on server" });
    }

    /* ===== Upload audio ===== */
    const data = new FormData();
    data.append("file", fs.createReadStream(audioPath));

    const uploadRes = await axios.post(
      `${ASSEMBLY_API}/upload`,
      data,
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          ...data.getHeaders(),
        },
      }
    );

    const audioUrl = uploadRes.data.upload_url;

    /* ===== Start transcription ===== */
    const transcriptRes = await axios.post(
      `${ASSEMBLY_API}/transcript`,
      { audio_url: audioUrl },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    const transcriptId = transcriptRes.data.id;

    /* ===== Poll result ===== */
    let transcript;
    while (true) {
      const pollingRes = await axios.get(
        `${ASSEMBLY_API}/transcript/${transcriptId}`,
        {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
          },
        }
      );

      transcript = pollingRes.data;

      if (transcript.status === "completed") break;
      if (transcript.status === "error") {
        throw new Error(transcript.error || "Transcription failed");
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    res.json({ text: transcript.text });
  } catch (error) {
    console.error("Speech Error:", error.response?.data || error);
    res.status(500).json({ message: "Speech to text failed" });
  }
};
