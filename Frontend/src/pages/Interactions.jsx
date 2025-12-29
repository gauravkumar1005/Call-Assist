import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import { toastError } from "../utils/toast";

export default function Interactions() {
  const { agentId } = useParams();
  const navigate = useNavigate();

  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const res = await api.get(`/agents/${agentId}/interactions`);
      setInteractions(res.data);
    } catch (err) {
      toastError("Failed to load interactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Agent Interactions
            </h1>
            <p className="text-sm text-gray-500">
              View call / chat history for this agent
            </p>
          </div>

          <button
            onClick={() => navigate("/agents")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto bg-white shadow rounded-xl overflow-hidden">
          {loading && (
            <div className="p-6 text-center text-gray-500">
              Loading interactions...
            </div>
          )}

          {!loading && interactions.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No interactions found
            </div>
          )}

          {!loading && interactions.length > 0 && (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Duration (sec)
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {interactions.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 capitalize">
                      {item.interactionType}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.startTime).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {item.duration ?? "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
