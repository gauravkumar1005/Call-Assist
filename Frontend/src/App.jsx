import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import CreateAgent from "./pages/CreateAgent";
import EditAgent from "./pages/EditAgent";
import VoiceAssistant from "./pages/VoiceAssistant";
import Billing from "./pages/Billing";
import People from "./pages/People";
import MyPhoneNumber from "./pages/MyPhoneNumber";
import PurchasePhoneNumber from "./pages/PurchasePhoneNumber";
import Interactions from "./pages/Interactions";


import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      {/* 🔔 Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/agents"
          element={
            <PrivateRoute>
              <Agents />
            </PrivateRoute>
          }
        />

        <Route
          path="/agents/create"
          element={
            <PrivateRoute>
              <CreateAgent />
            </PrivateRoute>
          }
        />

        <Route
          path="/agents/edit/:id"
          element={
            <PrivateRoute>
              <EditAgent />
            </PrivateRoute>
          }
        />

        <Route
          path="/voice-assistant"
          element={
            <PrivateRoute>
              <VoiceAssistant />
            </PrivateRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <Billing />
            </PrivateRoute>
          }
        />

        <Route
          path="/people"
          element={
            <PrivateRoute>
              <People />
            </PrivateRoute>
          }
        />

        <Route
          path="/phone-numbers"
          element={
            <PrivateRoute>
              <MyPhoneNumber />
            </PrivateRoute>
          }
        />

        <Route
          path="/phone-numbers/purchase"
          element={
            <PrivateRoute>
              <PurchasePhoneNumber />
            </PrivateRoute>
          }
        />
        <Route
          path="/agents/:agentId/interactions"
          element={
            <PrivateRoute>
              <Interactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
