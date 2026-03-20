import { useState } from "react";
import API from "../services/api";

const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState(null);

const handleTrack = async () => {
  try {
    const cleanId = trackingId.trim();

    const res = await API.get(
      `/api/v1/shipments/track/${cleanId}`
    );

    setData(res.data.data);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert("Tracking failed");
  }
};

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-slate-100">
      <h1 className="mb-4 text-2xl font-bold">Track Shipment</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleTrack}
          className="px-4 text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Track
        </button>
      </div>

      {data && (
        <div className="w-full max-w-md p-4 bg-white shadow rounded-xl">
          <p><strong>Status:</strong> {data.currentStatus}</p>

          <h2 className="mt-4 font-semibold">Timeline:</h2>
          {data.timeline.map((t, i) => (
            <div key={i} className="pl-2 mt-2 border-l-2">
              <p>{t.status}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackShipment;