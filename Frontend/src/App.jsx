import { BrowserRouter, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/create" element={<CreateAgent />} />
        <Route path="/agents/edit/:id" element={<EditAgent />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/people" element={<People />} />
        <Route path="/phone-numbers" element={<MyPhoneNumber />} />
        <Route path="/phone-numbers/purchase" element={<PurchasePhoneNumber />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
