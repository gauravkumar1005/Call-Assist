import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { toastSuccess, toastError} from "../utils/toast";

export default function CreateAgent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    agentType: "",
    prompt: "",
    kb: "",
    guardrail: "",
    voice: "",
    lang: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await api.post("/agents", form);
      toastSuccess("Agent created successfully");
      navigate("/agents");
    } catch (err) {
      toastError("Failed to create agent");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Agent
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Configure agent behavior, voice, and language
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-6">

            {/* Agent Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Agent Type
              </label>
              <input
                name="agentType"
                value={form.agentType}
                onChange={handleChange}
                placeholder="Healthcare, Insurance, Support"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Agent Prompt
              </label>
              <textarea
                name="prompt"
                value={form.prompt}
                onChange={handleChange}
                rows="4"
                placeholder="Describe how the agent should behave..."
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Knowledge Base */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Knowledge Base
              </label>
              <input
                name="kb"
                value={form.kb}
                onChange={handleChange}
                placeholder="KB reference or URL"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Guardrail */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Guardrail
              </label>
              <input
                name="guardrail"
                value={form.guardrail}
                onChange={handleChange}
                placeholder="Safety or policy rules"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Voice & Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Voice
                </label>
                <select
                  name="voice"
                  value={form.voice}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                >
                  <option value="">Select Voice</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  name="lang"
                  value={form.lang}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/agents")}
                className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow"
              >
                Save Agent
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
