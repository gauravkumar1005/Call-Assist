import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        
        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Sign in to your account or create a new one to get started
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
          >
            Create Account
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-400 mt-6">
          Secure • Fast • Reliable
        </p>
      </div>
    </div>
  );
}
