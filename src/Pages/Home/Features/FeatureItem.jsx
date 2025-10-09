// src/components/Features/FeatureItem.jsx
import React from "react";

const FeatureItem = ({feature}) => {
    const {icon: Icon, title, description } = feature;
    return (
        <div
            className={`flex flex-col md:flex-row items-center  rounded-2xl shadow-md p-8 bg-gray-50 mb-6`}
        >
            {/* Illustration or Icon */}
            <div className="flex-shrink-0 text-[#03373D] text-7xl pr-12 border-r  border-[#03373D] border-dashed">
                <Icon />
            </div>

            {/* Text Content */}
            <div className="pl-12">
                <h3 className="font-extrabold text-2xl mb-3 text-[#03373D]">{title}</h3>
                <p className="text-base text-[#606060] leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default FeatureItem;
