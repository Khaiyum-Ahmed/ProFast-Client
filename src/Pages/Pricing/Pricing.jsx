import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../Loading/Loading";
import { FaBox, FaRegFileAlt, FaTruckMoving } from "react-icons/fa";

const Pricing = () => {
    const axiosSecure = useAxiosSecure();

    const { data: pricingPlans = [], isLoading } = useQuery({
        queryKey: ["pricingPlans"],
        queryFn: async () => {
            const res = await axiosSecure.get("/pricing");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto py-16 px-6">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
                Our Pricing Plans
            </h1>
            <p className="text-center text-gray-600 mb-12">
                Transparent, affordable delivery costs — no hidden charges.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan._id}
                        className={`bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 border-t-4 ${plan.highlight ? "border-blue-600" : "border-gray-300"
                            }`}
                    >
                        <div className="p-6 text-center">
                            <div className="flex justify-center mb-4 text-4xl text-blue-600">
                                {plan.icon === "FaBox" && <FaBox />}
                                {plan.icon === "FaTruckMoving" && <FaTruckMoving />}
                                {plan.icon === "FaRegFileAlt" && <FaRegFileAlt />}
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">{plan.title}</h2>
                            <p className="text-gray-500 mb-4">{plan.subtitle}</p>

                            <div className="text-gray-700 space-y-2">
                                {plan.features.map((feature, i) => (
                                    <p key={i}>✅ {feature}</p>
                                ))}
                            </div>

                            <div className="mt-6 text-3xl font-bold text-blue-700">
                                ৳{plan.price}
                                {plan.extra && (
                                    <span className="text-sm text-gray-500 font-medium">
                                        {" "}
                                        + {plan.extra}
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 text-gray-500">{plan.condition}</p>

                            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                Get Started
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
