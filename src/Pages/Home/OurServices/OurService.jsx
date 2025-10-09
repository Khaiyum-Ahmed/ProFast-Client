import ServiceCard from "./ServiceCard";
import {
    FaTruck,
    FaGlobeAmericas,
    FaBoxOpen,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt,
} from "react-icons/fa";

const OurServices = () => {
    const services = [
        {
            title: "Express & Standard Delivery",
            text: "We deliver parcels within 24–72 hours in major cities. Express delivery available in 4–6 hours.",
            icon: FaTruck,
        },
        {
            title: "Nationwide Delivery",
            text: "We deliver parcels nationwide with home delivery in every district within 48–72 hours.",
            icon: FaGlobeAmericas,
            highlight: true,
        },
        {
            title: "Fulfillment Solution",
            text: "We offer inventory management, online order processing, packaging, and after-sales support.",
            icon: FaBoxOpen,
        },
        {
            title: "Cash on Home Delivery",
            text: "100% cash-on-delivery coverage across Bangladesh with full product safety assurance.",
            icon: FaMoneyBillWave,
        },
        {
            title: "Corporate Service / Contract in Logistics",
            text: "Custom logistics solutions for corporate clients, including warehouse and inventory management.",
            icon: FaBuilding,
        },
        {
            title: "Parcel Return",
            text: "Efficient logistics for returns and exchanges for online businesses and eCommerce partners.",
            icon: FaUndoAlt,
        },
    ];

    return (
        <section className="py-20 bg-[#03373D] text-white rounded-3xl mt-10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center mb-3">Our Services</h2>
                <p className="text-center text-base font-medium text-[#DADADA] mb-10 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                           service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
