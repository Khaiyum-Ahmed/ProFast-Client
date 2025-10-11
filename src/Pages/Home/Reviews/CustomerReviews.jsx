// src/components/CustomerReviews/CustomerReviews.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import reviewsimg from "../../../assets/images/customer-top.png"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Awlad Hossin",
      position: "Senior Product Designer",
      text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      name: "Nasir Uddin",
      position: "CEO",
      text: "I’ve been using this product for a few weeks now, and my posture has significantly improved. The results are incredible!",
    },
    {
      name: "Rasel Ahamed",
      position: "CTO",
      text: "Excellent service and support! The team truly cares about customer satisfaction and product quality.",
    },
    {
      name: "Sarah Ahmed",
      position: "Product Manager",
      text: "The live parcel tracking and fast delivery have made my shopping experience much smoother. Highly recommend!",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
            <img src={reviewsimg} className="mx-auto mb-5" alt="" />
          <h2 className="md:text-3xl lg:text-5xl font-extrabold text-[#03373D] mb-3">
            What our customers are saying
          </h2>
          <p className="text-[#606060] max-w-2xl lg:max-w-3xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro.
            Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>

        {/* Swiper Section */}
        <div className="relative flex flex-col items-center ">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            navigation={{
              nextEl: ".review-next",
              prevEl: ".review-prev",
            }}
            pagination={{ clickable: true}}
            allowTouchMove={false} // disables swipe gesture for strict click-based navigation
            className="w-full max-w-md"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button className="review-prev w-10 h-10 rounded-full bg-gray-200 hover:bg-lime-500 hover:text-white flex items-center justify-center transition">
              <FaArrowLeft />
            </button>
            <button className="review-next w-10 h-10 rounded-full bg-gray-200 hover:bg-lime-500 hover:text-white flex items-center justify-center transition">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
