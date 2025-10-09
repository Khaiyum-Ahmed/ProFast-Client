
import WorkCard from "./WorkCard";
import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
    const workItems = [
        {
            title: "Booking Pick & Drop",
            description: "Schedule your delivery easily and let us handle pickup and dropoff seamlessly.",
            icon: FaTruckPickup,
        },
        {
            title: "Cash On Delivery",
            description: "We offer secure and convenient cash-on-delivery options for your customers.",
            icon: FaMoneyBillWave,
        },
        {
            title: "Delivery Hub",
            description: "Our hubs ensure fast and reliable package processing and dispatching.",
            icon: FaWarehouse,
        },
        {
            title: "Booking SME & Corporate",
            description: "Tailored delivery solutions for SMEs and corporate clients with flexible terms.",
            icon: FaBuilding,
        },
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-[#03373D] mb-10">How it Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {workItems.map((item, index) => (
                        <WorkCard
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
