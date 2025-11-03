import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaClock, FaMoneyBill, FaBuilding, FaStore } from "react-icons/fa";
import Loading from "../Loading/Loading";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Services = () => {
    const axiosSecure = UseAxiosSecure();

    // ✅ Fetch services from backend
    const { data: services = [], isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axiosSecure.get("/services");
            return res.data;
        },
    });
    console.log(services)
    if (isLoading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
                Our Delivery Services
            </h1>
            <p className="text-center text-gray-600 mb-12">
                We offer fast, reliable, and affordable delivery options for individuals, businesses, and e-commerce platforms.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                    const icons = {
                        "Same Day Delivery": <FaTruck className="text-blue-600 text-4xl mb-4" />,
                        "Next Day Delivery": <FaClock className="text-blue-600 text-4xl mb-4" />,
                        "Cash on Delivery": <FaMoneyBill className="text-blue-600 text-4xl mb-4" />,
                        "Corporate Delivery": <FaBuilding className="text-blue-600 text-4xl mb-4" />,
                        "E-commerce Fulfillment": <FaStore className="text-blue-600 text-4xl mb-4" />,
                    };

                    return (
                        <div
                            key={service._id}
                            className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg hover:scale-105 transition transform duration-300"
                        >
                            {icons[service.title] || <FaTruck className="text-blue-600 text-4xl mb-4" />}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <button className="mt-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition">
                                Learn More
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
