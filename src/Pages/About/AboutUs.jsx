import { motion as Motion } from "framer-motion";
import {  FaShieldAlt, FaUsers, FaClock } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { Link } from "react-router";

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-6 md:px-10 lg:px-20">
            {/* Header Section */}
            <Motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
                    About <span className="text-blue-500">ProFast Delivery</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    We’re transforming parcel delivery in Bangladesh with speed, trust, and technology.
                    Whether it’s business or personal, your delivery is our top priority.
                </p>
            </Motion.div>

            {/* Mission & Vision Section */}
            <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
                <Motion.img
                    src="https://i.ibb.co.com/NQYd0w1/delivery-company-service-TMQS7-XFPNY-w600.jpg"
                    alt="Delivery illustration"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl shadow-2xl w-full"
                />

                <Motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold text-blue-700 border-l-4 border-blue-500 pl-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        To make every delivery fast, reliable, and effortless — bridging people and businesses
                        across Bangladesh with trust and technology.
                    </p>

                    <h2 className="text-3xl font-bold text-blue-700 border-l-4 border-blue-500 pl-4 mt-6">
                        Our Vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        To become the most trusted delivery network in South Asia by combining innovation,
                        real-time tracking, and unbeatable service quality.
                    </p>
                </Motion.div>
            </div>

            {/* Why Choose Us Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-700 mb-3">Why Choose Us</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    With thousands of happy customers and an ever-growing network, here’s why ProFast Delivery stands out.
                </p>
            </div>

            <Motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-blue-500">
                    <FaTruckFast className="text-4xl text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Fast & Reliable</h3>
                    <p className="text-gray-600">
                        Experience guaranteed on-time delivery, every time — within and beyond your city.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-green-500">
                    <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Secure Handling</h3>
                    <p className="text-gray-600">
                        Every parcel is handled with utmost care and end-to-end tracking security.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-purple-500">
                    <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-purple-700 mb-2">Trusted by Thousands</h3>
                    <p className="text-gray-600">
                        Thousands of satisfied customers trust us daily for their personal and business deliveries.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center border-t-4 border-orange-500">
                    <FaClock className="text-4xl text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                        Our support team is always ready to assist — anytime, anywhere you need help.
                    </p>
                </div>
            </Motion.div>

            {/* Bottom CTA */}
            <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-20"
            >
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                    Want to send your parcel with ProFast?
                </h3>
                <Link to='/addParcel' className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
                    Get Started
                </Link>
            </Motion.div>
        </div>
    );
};

export default AboutUs;
