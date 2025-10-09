// src/components/Features/FeaturesSection.jsx
import React from "react";
import FeatureItem from "./FeatureItem";
import {
    FaMapMarkedAlt,
    FaShieldAlt,
    FaHeadset,
} from "react-icons/fa";

const FeaturesSection = () => {
    const features = [
        {
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
            icon: FaMapMarkedAlt,
        },
        {
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            icon: FaShieldAlt,
        },
        {
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            icon: FaHeadset,
        },
    ];

    return (
        <section className="py-20 border-t border-b border-[#03373D] border-dashed">
            <div className="container mx-auto px-6">
                <div data-aos="zoom-in" data-aos-duration="2000" className="space-y-6">
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={index}
                            feature={feature}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
