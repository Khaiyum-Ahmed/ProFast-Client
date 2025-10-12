import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FiSearch } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// ✅ Fix leaflet marker issue for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Custom green highlight icon for selected district
const highlightIcon = new L.Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
});

// ✅ Custom hook to move the map when selected district changes
const FlyToDistrict = ({ district }) => {
    const map = useMap();
    useEffect(() => {
        if (district) {
            map.flyTo([district.latitude, district.longitude], 10, {
                duration: 2,
            });
        }
    }, [district, map]);
    return null;
};

const Coverage = () => {
    const districtData = useLoaderData(); // loaded from router loader
    const [search, setSearch] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const handleSearch = () => {
        const query = search.trim().toLowerCase();

        if (!query) {
            alert("Please enter a district name");
            return;
        }

        // ✅ Match partial name (case-insensitive)
        const found = districtData.find((d) =>
            d.district.toLowerCase().includes(query)
        );

        if (found) {
            setSelectedDistrict(found);
        } else {
            alert("No district found with that name");
        }
    };

    const defaultCenter = [23.685, 90.3563]; // Center of Bangladesh

    return (
        <div className="min-h-screen  py-12 px-6 md:px-20">
            <div className="bg-white shadow-md rounded-2xl p-20">
                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                    We are available in{" "}
                    <span className="text-lime-500">64 districts</span>
                </h2>

                {/* Search Box */}
                <div className="flex justify-center items-center gap-2 mb-10">
                    <div className="relative w-full max-w-md">
                        <FiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search district name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-28 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-lime-400 hover:bg-lime-500 text-gray-800 font-medium px-5 py-1.5 rounded-full transition"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    We deliver almost all over Bangladesh
                </h3>

                {/* Map Section */}
                <MapContainer
                    center={defaultCenter}
                    zoom={7}
                    scrollWheelZoom={false}
                    className="h-[500px] w-full rounded-xl z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* ✅ Fly animation to selected district */}
                    <FlyToDistrict district={selectedDistrict} />

                    {/* ✅ Render markers for all districts */}
                    {districtData.map((district, idx) => (
                        <Marker
                            key={idx}
                            position={[district.latitude, district.longitude]}
                            icon={
                                selectedDistrict?.district === district.district
                                    ? highlightIcon
                                    : new L.Icon.Default()
                            }
                        >
                            <Popup>
                                <div className="text-sm">
                                    <h3 className="font-bold text-gray-800 mb-1">
                                        {district.district}
                                    </h3>
                                    <p className="text-gray-600 text-xs mb-1">
                                        <strong>Region:</strong> {district.region}
                                    </p>
                                    <p className="text-gray-600 text-xs mb-1">
                                        <strong>City:</strong> {district.city}
                                    </p>
                                    <p className="text-gray-600 text-xs">
                                        <strong>Areas:</strong> {district.covered_area.join(", ")}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Optional Message */}
                {selectedDistrict && (
                    <div className="text-center mt-6">
                        <p className="text-gray-700 font-medium">
                            Showing coverage for{" "}
                            <span className="font-bold text-lime-500">
                                {selectedDistrict.district}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coverage;
