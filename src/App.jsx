import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shipments from "./pages/Shipments";
// import Dashboard from "./pages/Dashboard";
import CreateShipment from "./pages/CreateShipment";
import ShipmentDetails from "./pages/ShipmentDetails";
import TrackShipment from "./pages/TrackShipment";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="app-container">
    <BrowserRouter>
      <Routes>
  {/* Login */}
  <Route path="/login" element={<Login />} />

  {/* Default redirect */}
  <Route
  path="/"
  element={
    localStorage.getItem("token") ? (
      <Navigate to="/shipments" />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  {/* Protected routes */}
  <Route
    path="/shipments"
    element={
      <ProtectedRoute>
        <Shipments />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create"
    element={
      <ProtectedRoute>
        <CreateShipment />
      </ProtectedRoute>
    }
  />

  {/* Other routes */}
  <Route path="/shipment/:trackingId" element={<ShipmentDetails />} />
  <Route path="/track" element={<TrackShipment />} />
</Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;