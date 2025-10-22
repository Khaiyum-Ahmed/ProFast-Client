import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// 🟢 PendingRiders Component
const PendingRiders = () => {
    // Example mock data — replace this with your fetched data from DB or API
    const [riders, setRiders] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            age: 25,
            nid: "1234567890",
            contact: "01712345678",
            region: "Dhaka",
            warehouse: "Gulshan",
            status: "Pending",
            createdAt: "2025-10-20",
        },
        {
            id: 2,
            name: "Amina Rahman",
            email: "amina@example.com",
            age: 28,
            nid: "9876543210",
            contact: "01812345678",
            region: "Chattogram",
            warehouse: "Agrabad",
            status: "Pending",
            createdAt: "2025-10-21",
        },
    ]);

    const [selectedRider, setSelectedRider] = useState(null); // For modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 🟢 Function: Open modal and set selected rider
    const openModal = (rider) => {
        setSelectedRider(rider);
        setIsModalOpen(true);
    };

    // 🟢 Function: Close modal
    const closeModal = () => {
        setSelectedRider(null);
        setIsModalOpen(false);
    };

    // 🟢 Function: Approve Rider
    const handleApprove = (id) => {
        setRiders((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status: "Approved" } : r
            )
        );
        toast.success("Rider approved successfully!");
        closeModal();
    };

    // 🟢 Function: Cancel Rider
    const handleCancel = (id) => {
        setRiders((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status: "Rejected" } : r
            )
        );
        toast.error("Rider application rejected!");
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <Toaster position="top-center" />
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold text-emerald-900 mb-6">
                    Pending Riders
                </h1>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Region</th>
                                <th className="py-3 px-4 text-left">Warehouse</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider, i) => (
                                <tr
                                    key={rider.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{i + 1}</td>
                                    <td className="py-3 px-4 font-medium">{rider.name}</td>
                                    <td className="py-3 px-4">{rider.email}</td>
                                    <td className="py-3 px-4">{rider.region}</td>
                                    <td className="py-3 px-4">{rider.warehouse}</td>
                                    <td
                                        className={`py-3 px-4 font-semibold ${rider.status === "Approved"
                                                ? "text-green-600"
                                                : rider.status === "Rejected"
                                                    ? "text-red-500"
                                                    : "text-yellow-500"
                                            }`}
                                    >
                                        {rider.status}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => openModal(rider)}
                                            className="text-sm bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold px-3 py-1 rounded"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {riders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-5 text-gray-500">
                                        No pending riders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🟢 Rider Details Modal */}
            {isModalOpen && selectedRider && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold text-emerald-900 mb-4">
                            Rider Information
                        </h2>

                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Contact:</strong> {selectedRider.contact}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>Warehouse:</strong> {selectedRider.warehouse}</p>
                            <p><strong>Applied On:</strong> {selectedRider.createdAt}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => handleCancel(selectedRider.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleApprove(selectedRider.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
