// src/components/OurServices/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, text, highlight = false } = service;
    return (
        <div data-aos="fade-right"
            data-aos-offset="500"
             data-aos-duration="2000"
            data-aos-easing="ease-in-sine"
            className={`flex flex-col items-center text-center rounded-2xl shadow-md py-8 px-6 transition-all duration-300 ${highlight
                ? "bg-lime-200 hover:bg-lime-300"
                : "bg-white hover:bg-gray-50"
                }`}
        >
            <div className="text-5xl text-[#03373D] mb-4">
                <Icon />
            </div>
            <h3 className="font-bold text-2xl text-[#03373D] mb-4">{title}</h3>
            <p className="text-base font-medium text-[#606060]">{text}</p>
        </div>
    );
};

export default ServiceCard;
