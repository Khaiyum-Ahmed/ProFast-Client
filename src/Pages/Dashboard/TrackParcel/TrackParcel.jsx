import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";

const TrackParcel = () => {
  const axiosSecure = UseAxiosSecure();
  const [trackingId, setTrackingId] = useState("");
  const [searchId, setSearchId] = useState(""); // used to trigger search

  // ✅ Fetch tracking info only when we have a valid ID
  const { data: trackingData = [], isFetching, error } = useQuery({
    queryKey: ["tracking", searchId],
    enabled: !!searchId, // 🔥 prevents auto-run on mount
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${searchId}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast.error("Please enter a valid Tracking ID");
      return;
    }

    // 🔥 Clean spaces safely
    const cleanedId = trackingId.trim().replace(/\s+/g, "");
    setSearchId(cleanedId);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">📦 Track Your Parcel</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID (e.g. PCL-20251028-3KCEY)"
          className="flex-grow border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Track
        </button>
      </form>

      {/* 🌀 Loading State */}
      {isFetching && <Loading></Loading>}

      {/* ❌ Error Handling */}
      {error && <p className="text-center text-red-500">Failed to fetch tracking info.</p>}

      {/* ✅ Results */}
      {trackingData.length > 0 && (
        <div className="space-y-3">
          {trackingData.map((update, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <p>
                <strong>Status:</strong> {update.status}
              </p>
              <p>
                <strong>Details:</strong> {update.details}
              </p>
              <p>
                <strong>Location:</strong> {update.location}
              </p>
              <p className="text-sm text-gray-500">
                Updated by {update.updated_by} on{" "}
                {new Date(update.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 🧩 Empty State */}
      {!isFetching && searchId && trackingData.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          No updates found for tracking ID <b>{searchId}</b>.
        </p>
      )}
    </div>
  );
};

export default TrackParcel;
