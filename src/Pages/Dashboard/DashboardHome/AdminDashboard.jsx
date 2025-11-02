import { useQuery } from "@tanstack/react-query";
import { FaBox, FaMoneyBill, FaMotorcycle, FaUsers } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DashboardCard = ({ title, value, icon }) => (
  <Card className="p-5 shadow-md rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-100 border border-indigo-200">
    <CardContent className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="text-indigo-600 text-3xl">{icon}</div>
    </CardContent>
  </Card>
);

const AdminDashboarded = () => {
  const axiosSecure = useAxiosSecure();

  // Dashboard Stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  // Recent Parcels
  const { data: parcels, isLoading: loadingParcels } = useQuery({
    queryKey: ["recent-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/recent-parcels");
      return res.data;
    },
  });

  // Revenue Chart
  const { data: revenueData, isLoading: loadingChart } = useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/revenue-chart");
      return res.data;
    },
  });

  if (loadingStats || loadingParcels || loadingChart) return <Loading />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-700 text-center">
        🧭 Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Parcels" value={stats?.parcelsCount} icon={<FaBox />} />
        <DashboardCard title="Active Riders" value={stats?.ridersCount} icon={<FaMotorcycle />} />
        <DashboardCard title="Registered Users" value={stats?.usersCount} icon={<FaUsers />} />
        <DashboardCard title="Total Revenue" value={`৳${stats?.totalRevenue}`} icon={<FaMoneyBill />} />
      </div>

      {/* Recent Parcels Table */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📦 Recent Parcels</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-left">
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Status</th>
                <th className="p-3">Cost</th>
              </tr>
            </thead>
            <tbody>
              {parcels?.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{p.tracking_id}</td>
                  <td className="p-3">{p.sender_name}</td>
                  <td className="p-3">{p.receiver_name}</td>
                  <td className="p-3 capitalize">{p.delivery_status}</td>
                  <td className="p-3 text-green-600 font-semibold">৳{p.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">💰 Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboarded;
