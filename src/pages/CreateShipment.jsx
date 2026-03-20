import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateShipment = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/api/v1/shipments", formData);
      alert("Shipment created successfully 🚀");
      navigate("/shipments");
    } catch (err) {
      console.log(err);
      alert("Error creating shipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
  <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">

    <h1 className="mb-6 text-2xl font-bold text-gray-800">
      Create Shipment
    </h1>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="origin"
        placeholder="Origin"
        value={formData.origin}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Create Shipment
      </button>

    </form>
  </div>
</div>
  );
};

export default CreateShipment;