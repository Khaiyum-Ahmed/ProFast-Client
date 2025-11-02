import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";
import { toast } from "react-hot-toast";
import { FaMotorcycle, FaBoxOpen, FaMoneyBill } from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";

const RiderDashboard = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const riderEmail = user?.email;
    // console.log(riderEmail)

    // ✅ Rider summary stats
    const { data: summary, isLoading: loadingSummary } = useQuery({
        queryKey: ["rider-summary", riderEmail],
        enabled: !!riderEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/summary/${riderEmail}`);
            return res.data;
        },
    });

    // ✅ Rider assigned parcels
    const { data: parcels, isLoading: loadingParcels } = useQuery({
        queryKey: ["rider-parcels", riderEmail],
        enabled: !!riderEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels/${riderEmail}`);
            return res.data;
        },
    });

    // ✅ Mutation to update parcel status
    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/rider/update-status/${id}`, { status });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Parcel status updated!");
            queryClient.invalidateQueries(["rider-parcels"]);
            queryClient.invalidateQueries(["rider-summary"]);
        },
        onError: () => {
            toast.error("Failed to update parcel status");
        },
    });

    if (loadingParcels || loadingSummary) return <Loading />;

    return (
        <div className="space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-indigo-700 text-center">
                🚴 Rider Dashboard
            </h1>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-5 rounded-xl shadow text-center">
                    <FaMotorcycle className="mx-auto text-3xl text-blue-600" />
                    <p className="text-gray-500 mt-2">Total Assigned</p>
                    <h2 className="text-2xl font-bold">{summary?.totalAssigned}</h2>
                </div>
                <div className="bg-green-50 p-5 rounded-xl shadow text-center">
                    <FaBoxOpen className="mx-auto text-3xl text-green-600" />
                    <p className="text-gray-500 mt-2">Delivered</p>
                    <h2 className="text-2xl font-bold">{summary?.totalDelivered}</h2>
                </div>
                <div className="bg-yellow-50 p-5 rounded-xl shadow text-center">
                    <FaMoneyBill className="mx-auto text-3xl text-yellow-600" />
                    <p className="text-gray-500 mt-2">Earnings</p>
                    <h2 className="text-2xl font-bold">৳{summary?.totalEarnings}</h2>
                </div>
            </div>

            {/* Assigned Parcels Table */}
            <div className="bg-white p-6 rounded-2xl shadow border">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">📦 My Assigned Parcels</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-indigo-50 text-left">
                                <th className="p-3">Tracking ID</th>
                                <th className="p-3">Sender</th>
                                <th className="p-3">Receiver</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels?.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3">{p.tracking_id}</td>
                                    <td className="p-3">{p.sender_name}</td>
                                    <td className="p-3">{p.receiver_name}</td>
                                    <td className="p-3 capitalize">{p.delivery_status}</td>
                                    <td className="p-3">
                                        {p.delivery_status === "rider_assigned" && (
                                            <button
                                                onClick={() => mutation.mutate({ id: p._id, status: "picked" })}
                                                className="btn btn-sm bg-blue-600 text-white"
                                            >
                                                Mark Picked
                                            </button>
                                        )}
                                        {p.delivery_status === "in_transit" && (
                                            <button
                                                onClick={() => mutation.mutate({ id: p._id, status: "delivered" })}
                                                className="btn btn-sm bg-green-600 text-white"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                        {p.delivery_status === "delivered" && (
                                            <span className="text-green-600 font-semibold">✅ Delivered</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;
