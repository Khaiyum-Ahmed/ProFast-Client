import React from "react";
import { useForm } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
import riderImage from "../../assets/images/agent-pending.png"; // replace with your image path
import { useLoaderData } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
    const warehouseData = useLoaderData(); // should return array of regions + warehouses
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const regions = [...new Set(warehouseData.map((d) => d.region))];

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const selectedRegion = watch("region", "");
    const filteredWarehouses = selectedRegion
        ? warehouseData.filter((d) => d.region === selectedRegion)
        : [];

    const onSubmit = (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || '',
            email: user?.email || '',
            status: "pending",
            work_status: "available",
            created_at: new Date().toISOString(),
        }
        console.log('rider data', riderData);
        axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your application is pending approval.",
                    });
                }
            })
        // toast.success(`Thanks, ${data.name}! Your rider request has been submitted.`, {
        //     duration: 4000,
        // });
        // console.log("Rider Application:", data);
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 rounded-4xl py-20 px-14 md:px-16">
            {/* <Toaster position="top-center" /> */}

            {/* Section Title */}
            <div className="max-w-5xl mx-auto mb-12">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#03373D] mb-4">
                    Be a Rider
                </h1>
                <p className="text-[#606060] max-w-2xl">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl p-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Form */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Tell us about yourself
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    value={user.displayName || ""}
                                    readOnly
                                    placeholder="Your Name"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Your Age</label>
                                <input
                                    {...register("age", {
                                        required: "Age is required",
                                        min: { value: 18, message: "Must be 18 or older" },
                                    })}
                                    type="number"
                                    placeholder="Your age"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                />
                                {errors.age && (
                                    <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Your Email</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                    value={user.email}
                                    readOnly
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Your Region</label>
                                <select
                                    {...register("region", { required: "Select a region" })}
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                >
                                    <option value="">Select your region</option>
                                    {regions.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                                {errors.region && (
                                    <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">NID No</label>
                                <input
                                    {...register("nid", { required: "NID is required" })}
                                    placeholder="NID"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                />
                                {errors.nid && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nid.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Contact</label>
                                <input
                                    {...register("contact", {
                                        required: "Contact number required",
                                        pattern: {
                                            value: /^(\+?88)?01[3-9]\d{8}$/,
                                            message: "Enter a valid Bangladeshi number",
                                        },
                                    })}
                                    placeholder="Contact"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                                />
                                {errors.contact && (
                                    <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Which wire-house you want to work?
                            </label>
                            <select
                                {...register("warehouse", { required: "Select a wire-house" })}
                                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-lime-200"
                            >
                                <option value="">Select wire-house</option>
                                {filteredWarehouses.map((w, i) => (
                                    <option key={i} value={w.district}>
                                        {w.district}
                                    </option>
                                ))}
                            </select>
                            {errors.warehouse && (
                                <p className="text-red-500 text-xs mt-1">{errors.warehouse.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold rounded py-2 mt-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Image Section */}
                <div className="flex justify-center md:justify-end">
                    <img
                        src={riderImage}
                        alt="Rider"
                        className="w-72 md:w-96 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default BeARider;
