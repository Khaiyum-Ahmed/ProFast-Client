// src/components/CustomerReviews/ReviewCard.jsx
import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <FaQuoteRight className="text-3xl text-[#03464D] mb-2" />
            <p className="text-gray-700 text-sm mb-6 leading-relaxed">{review.text}</p>
            <hr className="border-dashed border-gray-300 mb-4" />
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#03464D] flex items-center justify-center text-white font-bold text-lg mb-2">
                    {review.name.charAt(0)}
                </div>
                <div className="text-start">
                    <h4 className="font-extrabold text-[#03373D]">{review.name}</h4>
                    <p className="text-sm text-[#606060]">{review.position}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
