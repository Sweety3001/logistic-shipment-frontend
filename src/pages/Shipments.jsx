import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
const Shipments = () => {
  const role = localStorage.getItem("role");
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

const handleUpdateStatus = async (id, status) => {
  if (!status) return;

  try {
    await API.put(`/api/v1/shipments/${id}/status`, {
      status,
      location: "Updated location",
      note: "Updated by admin"
    });

    alert("Status updated");
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert("Update failed");
  }
};
  useEffect(() => {
    const fetchShipments = async () => {
  try {
    const res =
  role === "admin"
    ? await API.get("/api/v1/shipments/my") // all shipments
    : await API.get("/api/v1/shipments/my");
    console.log(res.data);
    setShipments(res.data.shipments || res.data.data?.shipments || []);
  } catch (err) {
    console.log(err);
    setError("Failed to fetch shipments");
  } finally {
    setLoading(false);
  }
};


    fetchShipments();
  }, []);

  if (loading) {
    return <div className="p-6">Loading shipments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-slate-100">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Shipment Dashboard
      </h1>
      <p className="text-sm text-gray-500">
  Role: <span className="font-semibold">{role}</span>
</p>
      <button
        onClick={() => navigate("/create")}
        className="px-5 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
      >
        + Create Shipment
      </button>
      <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
    </div>

    {/* Card */}
    <div className="p-6 bg-white shadow-xl rounded-2xl">

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 border-b">
            
            <th className="py-3">ID</th>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s) => (
            <tr
              key={s._id}
              onClick={() => navigate(`/shipment/${s.trackingId}`)}
              className="transition cursor-pointer hover:bg-gray-50"
            >
              <td className="py-4 text-sm text-gray-500">
                {s._id.slice(-6)}
              </td>

              <td className="text-sm text-indigo-600">
                {s.trackingId}
              </td>

              <td>
                <span className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                  {s.status}
                </span>
              </td>

              <td>{s.origin}</td>
              <td>{s.destination}</td>
              
      {role === "admin" && (
  <td>
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleUpdateStatus(s._id);
      }}
      className="px-2 py-1 text-xs text-white bg-green-600 rounded"
    >
      Mark Delivered
    </button>
  </td>
)}
{role === "admin" && (
  <td>
    <select
      onChange={(e) => {
        e.stopPropagation(); // prevents row click
        handleUpdateStatus(s._id, e.target.value);
      }}
      className="px-2 py-1 border rounded"
    >
      <option value="">Update</option>
      <option value="CREATED">CREATED</option>
      <option value="IN_TRANSIT">IN_TRANSIT</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  </td>
)}
            </tr>
          ))}
        </tbody>
      </table>

      {shipments.length === 0 && (
        <p className="mt-6 text-center text-gray-400">
          No shipments yet. Create your first shipment 🚀
        </p>
      )}
    </div>
  </div>
</div>
  );
};

export default Shipments;