import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";
import { toast } from "react-hot-toast";
import { FaBox, FaMoneyBill, FaTruck } from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import { Link } from "react-router";

const UserDashboard = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;

    // ✅ Fetch user's parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["user-parcels", userEmail],
        enabled: !!userEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/parcels/${userEmail}`);
            return res.data;
        },
    });
// console.log(parcels)
    if (isLoading) return <Loading />;

    // ✅ Stats summary
    const totalParcels = parcels.length;
    const delivered = parcels.filter((p) => p.delivery_status === "delivered").length;
    const pendingPayment = parcels.filter((p) => p.payment_status !== "paid").length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center">
                📦 User Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-5 rounded-xl shadow text-center">
                    <FaBox className="mx-auto text-3xl text-blue-600" />
                    <p className="text-gray-500 mt-2">Total Parcels</p>
                    <h2 className="text-2xl font-bold">{totalParcels}</h2>
                </div>
                <div className="bg-green-50 p-5 rounded-xl shadow text-center">
                    <FaTruck className="mx-auto text-3xl text-green-600" />
                    <p className="text-gray-500 mt-2">Delivered</p>
                    <h2 className="text-2xl font-bold">{delivered}</h2>
                </div>
                <div className="bg-yellow-50 p-5 rounded-xl shadow text-center">
                    <FaMoneyBill className="mx-auto text-3xl text-yellow-600" />
                    <p className="text-gray-500 mt-2">Pending Payments</p>
                    <h2 className="text-2xl font-bold">{pendingPayment}</h2>
                </div>
            </div>

            {/* All Parcels */}
            <div className="bg-white p-6 rounded-2xl shadow border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">
                        📦 My Parcels
                    </h2>
                    <Link
                        to="/addParcel"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        + New Parcel
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50 text-left">
                                <th className="p-3">Tracking ID</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Receiver</th>
                                <th className="p-3">Cost</th>
                                <th className="p-3">Payment</th>
                                <th className="p-3">Delivery</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels?.map((p) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 font-semibold text-gray-700">{p.tracking_id}</td>
                                    <td className="p-3">{p.title}</td>
                                    <td className="p-3">{p.receiver_name}</td>
                                    <td className="p-3">৳{p.cost}</td>
                                    <td
                                        className={`p-3 font-semibold ${p.payment_status === "paid" ? "text-green-600" : "text-red-500"
                                            }`}
                                    >
                                        {p.payment_status}
                                    </td>
                                    <td
                                        className={`p-3 capitalize ${p.delivery_status === "delivered"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        {p.delivery_status}
                                    </td>
                                    <td className="p-3 space-x-2">
                                        {/* <Link
                                            to={`/dashboard/track/${p.tracking_id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Track
                                        </Link> */}
                                        <Link
                                            to='/dashboard/track' state={{ trackingId: p.tracking_id }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Track
                                        </Link>
                                        {p.payment_status !== "paid" && (
                                            <Link to={`payment/${p._id}`}
                                                onClick={() => toast.success("Redirecting to payment...")}
                                                className="text-yellow-600 hover:underline cursor-pointer"
                                            >
                                                Pay Now
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {parcels.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        You haven’t booked any parcels yet.{" "}
                        <Link to="/dashboard/book-parcel" className="text-blue-600 underline">
                            Book one now!
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
