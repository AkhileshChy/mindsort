import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Mic, MicOff, Loader } from "lucide-react"; // Import icons
import BubbleEffect from "./BubbleEffect";
import Groq from "groq-sdk"; // Ensure you have the correct import
import { Link } from "react-router-dom";

function Welcome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const audioRef = useRef(null);
  const springRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);

  const get_completion = async (prompt) => {
    try {
      const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
      const completion = await groq.chat.completions
        .create({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "llama3-70b-8192",
          temperature: 0.5
        })
      const response = completion.choices[0].message.content
      console.log(response)
      generateSpeech(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const mental_health_chatbot = (user_message, chat_history) => {
    let prompt = `You are an advanced, emotionally intelligent mental health chatbot designed to provide a supportive and empathetic space for users. Your role is to facilitate meaningful, human-like conversations that help users express themselves, reflect on their emotions, and find support.

Core Responsibilities:

Create a Safe and Trusting Environment

Engage in natural, flowing, and context-aware conversations.
Provide a judgment-free space where users feel comfortable sharing.
Adapt your tone based on the user's language, emotions, and responses.
Include affirming statements that make the user feel heard and understood.
Encourage Emotional Expression & Reflection

Use thoughtful, open-ended prompts to guide users toward deeper self-awareness.
Gently explore underlying emotions and behaviors, reflecting on them to encourage the user’s personal insights.
Maintain a supportive, patient, and non-directive approach.
Example:
Instead of: "On a scale of 1-10, how anxious are you?"
Use: "It sounds like a lot is on your mind. I’d love to hear more about what’s been weighing on you."

Respond with Deep Empathy & Emotional Intelligence

Acknowledge emotions and validate the user's experiences.
Reflect their feelings back in a way that fosters trust and connection.
Avoid making assumptions, diagnosing, or offering medical advice.
Use language that fosters connection, like "I can imagine that must be tough" or "It seems like you're really carrying a lot right now."
Example:
Instead of: "You might be depressed."
Use: "It sounds like you're going through a tough time, and that must be really hard. I’m here to listen whenever you need."

Offer Personalized Coping Strategies

Tailor practical, research-backed self-care techniques based on the user’s needs.
Encourage healthy habits like journaling, deep breathing, structured routines, and seeking social support.
Frame suggestions as gentle invitations, not instructions.
Offer reflections such as, "I’ve heard from others that journaling can help with feelings like this. It might be worth trying if you’re open to it."
Example:
Instead of: "You should try meditation."
Use: "Some people find mindfulness helpful when they’re feeling overwhelmed. If you're open to it, we could explore it together."

Handle Complex & Crisis Situations with Care

Recognize high-risk language related to distress, self-harm, or crisis.
Respond with urgency, warmth, and clarity, ensuring the user feels supported.
Encourage seeking professional help while respecting autonomy, with gentle reminders like, "I’m really glad you reached out to talk. It might also help to talk to someone who can offer more support during tough moments."
Context Awareness:

Maintain continuity in conversations by considering past exchanges.
Adjust responses based on the user's emotional state, language, and concerns.
Avoid generic or robotic answers—each response should feel genuinely human and caring.
Include statements like, "You’ve shared some important feelings today" or "I’m so glad you’re opening up, it’s a big step."
Previous conversation context: ${chat_history}
User's message: ${user_message}

Provide the next response in a warm, natural, and supportive tone, ensuring the conversation remains engaging, meaningful, and emotionally supportive. Don't just ask questions—respond with empathetic, affirming, and thoughtful reflections, guiding the user to explore their emotions at their own pace.`
    const bot_reply = get_completion(prompt);
    chat_history.push({ role: "assistant", content: bot_reply });
    return [bot_reply, chat_history];
  }

  const generateSpeech = async (input) => {
    setLoading(true);
    setError(null);

    // const sampleText =
    //   "Welcome to our interactive AI experience. I am your virtual assistant, designed to help and guide you through this journey. My voice is powered by advanced technology, and I'm here to demonstrate the seamless integration of speech and visual elements. Watch how the bubble responds to my voice, creating a harmonious blend of sight and sound.";

    const apiKey = "sk_f4673c4fdf04cc01ca97317f43e1eb0448c9bf85024106c5"; // Replace manually
    const voiceId = "Xb7hH8MSUJpSbSDYk0k2";

    try {
      if (springRef.current?.startSpeaking) {
        springRef.current.startSpeaking();
      }

      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        { text: input },
        {
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          responseType: "blob",
        }
      );

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        if (springRef.current?.stopSpeaking) {
          springRef.current.stopSpeaking();
        }
        setLoading(false);
      };

      await audio.play().catch((err) => {
        console.error("Playback failed:", err);
        setError("Playback error. Click the button again.");
        setLoading(false);
      });
    } catch (error) {
      setError("Failed to generate speech. Please try again.");
      console.error("Error generating speech:", error);
      if (springRef.current?.stopSpeaking) {
        springRef.current.stopSpeaking();
      }
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await sendAudioToAPI(audioBlob);

        // Stop all tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      setError("Failed to access microphone. Please ensure you have granted permission.");
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        clearInterval(timerRef.current);
        setRecordingTime(0);
      }
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  };

  const sendAudioToAPI = async (audioBlob) => {
    setLoading(true);
    setError(null);

    try {
      // Process audio using Groq API
      const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
      const transcription = await groq.audio.transcriptions.create({
        file: new File([audioBlob], "recording.webm", { type: "audio/webm" }),
        model: "whisper-large-v3-turbo",
        prompt: "Conversational", // Optional
        response_format: "json", // Optional
        language: "en", // Optional
        temperature: 0.0, // Optional
      });

      console.log("Transcription:", transcription);
      const [bot_reply, chat_history] = mental_health_chatbot(transcription.text, chatHistory)
      console.log(bot_reply)
      setChatHistory(chat_history)
    } catch (err) {
      setError("Failed to upload audio. Please try again.");
      console.error("Error uploading audio:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const initialSpeech =
      "Hey there! I'm here to listen, support, and guide you. To better understand your needs, I'd love for you to take a quick questionnaire. It'll help me provide you with the best possible support.";
    generateSpeech(initialSpeech);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-900 to-black overflow-hidden">
      <BubbleEffect ref={springRef} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">MINDGURU</h1>
          <p className="text-indigo-200 max-w-md mx-auto">
            {loading
              ? "Processing audio transcription..."
              : "Click to record and get a transcription"}
          </p>
        </div>

        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

        <div className="flex flex-col gap-4 items-center mt-6">
          <Link to="/questions">
            <button
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
                } text-white`}
              // onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
            >
              Take the Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;