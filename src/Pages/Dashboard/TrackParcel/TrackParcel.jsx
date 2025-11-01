import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";

const TrackParcel = () => {
    const axiosSecure = UseAxiosSecure();
    const [trackingId, setTrackingId] = useState("");
    const [searchId, setSearchId] = useState("");

    const { data: trackingData = [], isFetching, error } = useQuery({
        queryKey: ["tracking", searchId],
        enabled: !!searchId,
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
        const cleanedId = trackingId.trim().replace(/\s+/g, "");
        setSearchId(cleanedId);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">
            <h2 className="text-3xl font-semibold mb-4 text-center text-blue-700">
                📦 Track Your Parcel
            </h2>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-8 justify-center">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID (e.g. PCL-20251028-3KCEY)"
                    className="flex-grow max-w-md border border-gray-300 focus:ring-2 focus:ring-blue-400 p-2 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Track
                </button>
            </form>

            {/* Loader */}
            {isFetching && <Loading />}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500">Failed to fetch tracking info.</p>
            )}

            {/* Timeline Results */}
            {trackingData.length > 0 && (
                <div className="relative border-l-4 border-blue-500 ml-4 md:ml-0 md:border-none md:space-y-12">
                    {trackingData.map((update, idx) => {
                        const isLeft = idx % 2 === 0; // alternate layout
                        return (
                            <Motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`md:flex md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                    } md:gap-8 relative`}
                            >
                                {/* Line Connector for Timeline */}
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-200 transform -translate-x-1/2"></div>

                                {/* Marker */}
                                <div className="flex justify-center md:justify-end md:w-1/2 relative">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md z-10 ${isLeft ? "md:mr-4" : "md:ml-4"
                                            }`}
                                    >
                                        <FaMapMarkerAlt />
                                    </div>
                                </div>

                                {/* Card */}
                                <div
                                    className={`md:w-1/2 bg-gray-50 border border-gray-200 rounded-lg shadow-md p-5 ${isLeft ? "md:ml-4" : "md:mr-4"
                                        }`}
                                >
                                    <p className="text-blue-700 font-semibold text-lg">
                                        {update.status}
                                    </p>
                                    <p className="text-gray-700 mt-1">{update.details}</p>
                                    <p className="text-gray-600 mt-1 flex items-center gap-1">
                                        <FaMapMarkerAlt className="text-blue-500" /> {update.location}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <FaClock className="text-blue-400" />
                                        {new Date(update.timestamp).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 italic">
                                        Updated by {update.updated_by}
                                    </p>
                                </div>
                            </Motion.div>
                        );
                    })}
                </div>
            )}

            {/* Empty State */}
            {!isFetching && searchId && trackingData.length === 0 && (
                <p className="text-center text-gray-600 mt-4">
                    No updates found for tracking ID <b>{searchId}</b>.
                </p>
            )}
        </div>
    );
};

export default TrackParcel;
