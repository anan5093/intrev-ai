import { useEffect, useState } from "react";
import { transcribeSpeech } from "../../services/speechService";
import { useAuth } from "../../context/AuthContext";

export default function SpeechToText({ audioBlob, onResult }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!audioBlob) return;

    const transcribe = async () => {
      try {
        setLoading(true);
        const text = await transcribeSpeech(audioBlob, token);
        onResult(text);
      } catch (err) {
        console.error("Speech to text error:", err);
      } finally {
        setLoading(false);
      }
    };

    transcribe();
  }, [audioBlob, token, onResult]);

  // ⛔ No UI rendered — logic-only component
  return loading ? (
    <p className="text-center text-gray-500 mt-3">
      Transcribing audio...
    </p>
  ) : null;
}
