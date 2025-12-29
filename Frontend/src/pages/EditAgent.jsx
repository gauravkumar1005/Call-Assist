import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { toastError, toastSuccess } from "../utils/toast";

export default function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    agentType: "",
    prompt: "",
    kb: "",
    guardrail: "",
    voice: "",
    lang: "",
  });

  useEffect(() => {
    if (id) fetchAgent();
  }, [id]);

  const fetchAgent = async () => {
    try {
      const res = await api.get(`/agents/${id}`);
      setForm(res.data);
    } catch (err) {
      alert("Failed to load agent");
      navigate("/agents");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/agents/${id}`, form);
      toastSuccess("Agent updated successfully");
      navigate("/agents");
    } catch (err) {
      toastError("Failed to update agent");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[70vh] text-gray-500">
          Loading agent details...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white border rounded-xl shadow-sm p-8">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Edit Agent</h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your agent configuration and behavior
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-5">

            {/* Agent Type */}
            <div>
              <label className="form-label">Agent Type</label>
              <input
                name="agentType"
                value={form.agentType}
                readOnly
                className="form-input bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="form-label">Prompt</label>
              <textarea
                name="prompt"
                value={form.prompt}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Define how the agent should behave"
              />
            </div>

            {/* Knowledge Base */}
            <div>
              <label className="form-label">Knowledge Base</label>
              <input
                name="kb"
                value={form.kb}
                onChange={handleChange}
                className="form-input"
                placeholder="Attach KB reference"
              />
            </div>

            {/* Guardrail */}
            <div>
              <label className="form-label">Guardrail</label>
              <input
                name="guardrail"
                value={form.guardrail}
                onChange={handleChange}
                className="form-input"
                placeholder="Safety rules / restrictions"
              />
            </div>

            {/* Voice & Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Voice</label>
                <select
                  name="voice"
                  value={form.voice}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Voice</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="form-label">Language</label>
                <select
                  name="lang"
                  value={form.lang}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate("/agents")}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Update Agent
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
