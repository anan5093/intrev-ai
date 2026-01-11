import axios from "axios";

export const transcribeSpeech = async (audioBlob, token) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "answer.wav");

  const res = await axios.post(
    "/api/speech/transcribe",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.text;
};
