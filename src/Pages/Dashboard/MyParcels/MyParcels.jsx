import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    console.log(parcels)
    // Handlers
    // 🔍 View
    const handleView = (parcel) => {
        Swal.fire({
            title: `📦 ${parcel.title}`,
            html: `
        <p><b>Type:</b> ${parcel.type}</p>
        <p><b>Sender:</b> ${parcel.sender_name || "N/A"}</p>
        <p><b>Receiver:</b> ${parcel.receiver_name || "N/A"}</p>
        <p><b>Cost:</b> ৳${parcel.cost}</p>
        <p><b>Status:</b> ${parcel.payment_status}</p>
        <p><b>Tracking ID:</b> ${parcel.tracking_id || "N/A"}</p>
      `,
            confirmButtonColor: "#3B82F6",
        });
    };

    // 💳 Pay Action
    const handlePay = (parcel) => {
        if (parcel.payment_status === "paid") {
            Swal.fire({
                icon: "info",
                title: "Already Paid",
                text: "This parcel has already been paid.",
                confirmButtonColor: "#3B82F6",
            });
            return;
        }

        Swal.fire({
            title: "Confirm Payment?",
            text: `Proceed to pay ৳${parcel.cost} for "${parcel.title}"`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Pay Now",
            confirmButtonColor: "#10B981",
            cancelButtonColor: "#6B7280",
        }).then((result) => {
            if (result.isConfirmed) {
                // ✅ Simulate payment success (API call can go here)
                // setParcels(
                //     parcels.map((p) =>
                //         p._id === parcel._id ? { ...p, payment_status: "paid" } : p
                //     )
                // );
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful 💳",
                    text: `You have successfully paid ৳${parcel.cost}.`,
                    confirmButtonColor: "#10B981",
                });
            }
        });
    };

    // ❌ Delete
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                // 🧠 Replace this URL with your actual API endpoint
                axiosSecure.delete(`parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                icon: "success",
                                title: "Deleted!",
                                text: "The parcel has been deleted successfully.",
                                confirmButtonColor: "#10B981",
                            });
                        }
                        refetch();
                    }) 
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Network Error",
                    text: error.message,
                    confirmButtonColor: "#EF4444",
                });
            }
        }
    };
    return (
        <div className="p-6 bg-base-100 shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">📦 ProFast Parcel List</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base font-semibold">
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created By</th>
                            <th>Cost (৳)</th>
                            <th>Created Date</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No parcels found 😕
                                </td>
                            </tr>
                        ) : (
                            parcels.map((parcel,index) => (
                                <tr key={parcel._id} className="hover">
                                    <td className="font-medium">{index + 1}</td>
                                    <td className="font-medium">{parcel.title}</td>
                                    <td className="capitalize">
                                        {parcel.type === "document" ? "Document" : "Non-Document"}
                                    </td>
                                    <td>{parcel.created_by}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {new Date(parcel.creation_date).toLocaleDateString("en-GB")}
                                    </td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${parcel.payment_status === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {parcel.payment_status === "paid" ? "Paid" : "Unpaid"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-sm btn-info text-white"
                                                onClick={() => handleView(parcel)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary text-black"
                                                onClick={() => handlePay(parcel)}
                                            >
                                                Pay
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error text-white"
                                                onClick={() => handleDelete(parcel._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;