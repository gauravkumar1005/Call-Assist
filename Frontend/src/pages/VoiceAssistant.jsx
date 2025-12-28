import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

export default function VoiceAssistant() {
  const [connected, setConnected] = useState(false);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState(0);
  const [time, setTime] = useState(0);
  const [convs, setConvs] = useState(0);
  const timerRef = useRef(null);

  const toggleConnection = () => {
    setConnected((p) => !p);
    if (!connected) setConvs(0);
  };

  const startRecord = () => {
    if (!connected) return;
    setRecording(true);
    timerRef.current = setInterval(() => {
      setTime((t) => +(t + 0.1).toFixed(1));
      setChunks((c) => c + 1);
    }, 100);
  };

  const stopRecord = () => {
    setRecording(false);
    clearInterval(timerRef.current);
    setConvs((c) => c + 1);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b">
            <h1 className="text-xl font-semibold text-gray-800">
              Levo Wellness Center
            </h1>
            <p className="text-sm text-gray-500">
              AI Voice Assistant Console
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Connection Status */}
            <div
              className={`flex items-center justify-between rounded-xl border px-5 py-4 ${
                connected
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-semibold ${
                    connected ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {connected ? "Connected" : "Disconnected"}
                </p>
                <p className="text-xs text-gray-500">
                  {connected
                    ? "Assistant is ready to respond"
                    : "Connect to start the assistant"}
                </p>
              </div>

              <span
                className={`h-3 w-3 rounded-full ${
                  connected ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Audio Chunks" value={chunks} />
              <Stat label="Recording Time" value={`${time}s`} />
              <Stat label="Conversations" value={convs} />
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t">

              <button
                onClick={toggleConnection}
                className={`w-full py-3 rounded-lg font-medium text-white transition ${
                  connected
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {connected ? "Disconnect" : "Connect to Server"}
              </button>

              <button
                disabled={!connected}
                onMouseDown={startRecord}
                onMouseUp={stopRecord}
                className={`w-full py-3 rounded-lg font-medium text-white transition ${
                  recording
                    ? "bg-rose-600 animate-pulse"
                    : "bg-rose-500 hover:bg-rose-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {recording ? "Recording in progress…" : "Hold to Speak"}
              </button>

              <p className="text-xs text-center text-gray-400">
                Hold the button to record audio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4 text-center">
      <div className="text-lg font-semibold text-indigo-600">
        {value}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {label}
      </div>
    </div>
  );
}
