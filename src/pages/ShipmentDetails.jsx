import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ShipmentDetails = () => {
  const { trackingId } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([]);
  // ✅ ADD THIS
const steps = [
  "CREATED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

const currentStep = steps.indexOf(shipment?.status);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const shipmentRes = await API.get(
        `/api/v1/shipments/${trackingId}`
      );

      const timelineRes = await API.get(
        `/api/v1/shipments/${trackingId}/timeline`
      );

      setShipment(shipmentRes.data.data);
      setTimeline(timelineRes.data.data.timeline);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [trackingId]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!shipment)
    return <div className="p-6 text-red-500">Shipment not found</div>;

  return (
    <div className="min-h-screen p-6 bg-slate-100">
      <div className="max-w-2xl p-8 mx-auto mt-10 bg-white shadow-xl rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold">Shipment Details</h1>

        <p><strong>Tracking ID:</strong> {shipment.trackingId}</p>
        <p><strong>Status:</strong> {shipment.status}</p>
        <p><strong>Origin:</strong> {shipment.origin}</p>
        <p><strong>Destination:</strong> {shipment.destination}</p>
        
        
        {/* ✅ STEP 2: STATUS + PROGRESS BAR */}
<div className="mt-6">
  <p className="text-sm text-gray-500">Current Status</p>
  <h2 className="text-xl font-bold text-indigo-600">
    {shipment.status}
  </h2>

  {/* Progress Stepper */}
  <div className="flex items-center justify-between mt-4">
    {steps.map((step, index) => (
      <div key={step} className="flex flex-col items-center w-full">
        
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white
            ${index <= currentStep ? "bg-indigo-600" : "bg-gray-300"}`}
        >
          {index + 1}
        </div>

        <p className="mt-2 text-xs text-center">{step}</p>

        {index !== steps.length - 1 && (
          <div
            className={`h-1 w-full 
              ${index < currentStep ? "bg-indigo-600" : "bg-gray-300"}`}
          />
        )}
      </div>
    ))}
  </div>
</div>



        
        <div className="pl-4 mt-6 space-y-4 border-l-2 border-gray-200">
  <h2 className="mb-3 text-lg font-semibold">Tracking Timeline</h2>

  {timeline.length === 0 ? (
    <p className="text-gray-400">No updates yet</p>
  ) : (
    <div className="space-y-3">
      {timeline.map((t, index) => (
        <div
          key={index}
          className="flex items-start gap-3"
        >
          <div className="w-3 h-3 mt-1 bg-indigo-600 rounded-full"></div>

          <div>
            <p className="font-medium">{t.status}</p>
            <p className="text-sm text-gray-500">
              {t.location} • {new Date(t.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">{t.note}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
      
    </div>
    
  );
};

export default ShipmentDetails;