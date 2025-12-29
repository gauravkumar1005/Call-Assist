import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { toastSuccess, toastError } from "../utils/toast";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const accountId = localStorage.getItem("accountId");

      const res = await api.get("/agents", {
        headers: {
          "X-Account-Id": accountId,
        },
      });

      setAgents(res.data);
    } catch (err) {
      toastError("Failed to load agents");
    }
  };

  const deleteAgent = async (agentId) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;

    try {
      await api.delete(`/agents/${agentId}`);

      toastSuccess("Agent deleted successfully 🗑️");
      fetchAgents();
    } catch (err) {
      toastError("Failed to delete agent");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Agents
            </h1>
            <p className="text-sm text-gray-500">
              Manage and configure your AI agents
            </p>
          </div>

          <button
            onClick={() => navigate("/agents/create")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow w-full sm:w-auto"
          >
            + Create Agent
          </button>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Agent Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Language
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Voice
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {agents.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    No agents created yet
                  </td>
                </tr>
              )}

              {agents.map((agent) => (
                <tr key={agent._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium capitalize">
                    {agent.agentType}
                  </td>
                  <td className="px-6 py-4">
                    {agent.lang === "hi" ? "Hindi" : "English"}
                  </td>
                  <td className="px-6 py-4 capitalize">{agent.voice}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/agents/${agent._id}/interactions`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Interactions
                      </button>
                      <button
                        onClick={() => navigate(`/voice-assistant`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Connect
                      </button>
                      <button
                        onClick={() => navigate(`/agents/edit/${agent._id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAgent(agent._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden max-w-6xl mx-auto space-y-4">
          {agents.length === 0 && (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
              No agents created yet
            </div>
          )}

          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white rounded-xl shadow p-5 space-y-3"
            >
              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {agent.agentType}
                </h3>
                <p className="text-sm text-gray-500">
                  Language: {agent.lang === "hi" ? "Hindi" : "English"}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  Voice: {agent.voice}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/voice-assistant`)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-md text-sm"
                >
                  Connect
                </button>
                <button
                  onClick={() => navigate(`/agents/edit/${agent._id}`)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAgent(agent._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
