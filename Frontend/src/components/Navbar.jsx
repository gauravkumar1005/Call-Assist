import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openAgents, setOpenAgents] = useState(false);
  const [openNumbers, setOpenNumbers] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const agentsRef = useRef(null);
  const numbersRef = useRef(null);

  const username = localStorage.getItem("username") || "U";
  const avatarLetter = username.charAt(0).toUpperCase();

  /* 🔹 Click Outside Close */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        agentsRef.current &&
        !agentsRef.current.contains(e.target)
      ) {
        setOpenAgents(false);
      }
      if (
        numbersRef.current &&
        !numbersRef.current.contains(e.target)
      ) {
        setOpenNumbers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-blue-600 cursor-pointer"
        >
          Call Assistant
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">

          <button onClick={() => navigate("/dashboard")} className={isActive("/dashboard")}>
            Dashboard
          </button>

          {/* Agents */}
          <div className="relative" ref={agentsRef}>
            <button
              onClick={() => {
                setOpenAgents(!openAgents);
                setOpenNumbers(false);
              }}
              className={`flex items-center gap-1 ${isActive("/agents")}`}
            >
              Agents <span className="text-xs">▾</span>
            </button>

            {openAgents && (
              <div className="dropdown">
                <button onClick={() => navigate("/agents")} className="dropdown-item">
                  My Agents
                </button>
                <button onClick={() => navigate("/agents/create")} className="dropdown-item">
                  Create Agent
                </button>
              </div>
            )}
          </div>

          {/* Phone Numbers */}
          <div className="relative" ref={numbersRef}>
            <button
              onClick={() => {
                setOpenNumbers(!openNumbers);
                setOpenAgents(false);
              }}
              className={`flex items-center gap-1 ${isActive("/phone-numbers")}`}
            >
              Phone Numbers <span className="text-xs">▾</span>
            </button>

            {openNumbers && (
              <div className="dropdown w-56">
                <button onClick={() => navigate("/phone-numbers")} className="dropdown-item">
                  My Phone Numbers
                </button>
                <button onClick={() => navigate("/phone-numbers/purchase")} className="dropdown-item">
                  Purchase Number
                </button>
              </div>
            )}
          </div>

          <button onClick={() => navigate("/billing")} className={isActive("/billing")}>
            Billing
          </button>

          <button onClick={() => navigate("/people")} className={isActive("/people")}>
            People
          </button>

          {/* Avatar + Logout */}
          <div className="flex items-center gap-3 ml-4">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
              {avatarLetter}
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-5 py-4 space-y-3 text-sm">

          <button onClick={() => navigate("/dashboard")} className="block w-full text-left">
            Dashboard
          </button>

          <button onClick={() => navigate("/agents")} className="block w-full text-left">
            My Agents
          </button>

          <button onClick={() => navigate("/agents/create")} className="block w-full text-left">
            Create Agent
          </button>

          <button onClick={() => navigate("/phone-numbers")} className="block w-full text-left">
            Phone Numbers
          </button>

          <button onClick={() => navigate("/billing")} className="block w-full text-left">
            Billing
          </button>

          <button onClick={() => navigate("/people")} className="block w-full text-left">
            People
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
