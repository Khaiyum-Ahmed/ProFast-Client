import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
 // assuming you have auth context
import Loading from "../../Loading/Loading";
import UseAuth from "../../../hooks/UseAuth";

const UpdateProfile = () => {
    const { user } = UseAuth(); // current logged-in user
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch current user data
    const { data: profile, isLoading, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // ✅ Setup form
    const {
        register,
        handleSubmit,
        // reset,
        formState: { isSubmitting },
    } = useForm();

    // ✅ Mutation for updating
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${user.email}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            refetch();
        },
        onError: () => {
            toast.error("Failed to update profile.");
        },
    });

    // ✅ Submit handler
    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    if (isLoading) return <Loading />;

    // 🧩 Role-based UI fields
    const role = profile?.role;

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                Update Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block font-semibold mb-1">Full Name</label>
                    <input
                        type="text"
                        defaultValue={profile?.name}
                        {...register("name", { required: true })}
                        className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Contact */}
                <div>
                    <label className="block font-semibold mb-1">Contact Number</label>
                    <input
                        type="text"
                        defaultValue={profile?.contact}
                        {...register("contact", { required: true })}
                        className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Address (for user only) */}
                {role === "user" && (
                    <div>
                        <label className="block font-semibold mb-1">Address</label>
                        <input
                            type="text"
                            defaultValue={profile?.address}
                            {...register("address")}
                            className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>
                )}

                {/* Rider-specific fields */}
                {role === "rider" && (
                    <>
                        <div>
                            <label className="block font-semibold mb-1">Region</label>
                            <input
                                type="text"
                                defaultValue={profile?.region}
                                {...register("region")}
                                className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Warehouse</label>
                            <input
                                type="text"
                                defaultValue={profile?.warehouse}
                                {...register("warehouse")}
                                className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </>
                )}

                {/* Profile Image (optional) */}
                <div>
                    <label className="block font-semibold mb-1">Profile Image URL</label>
                    <input
                        type="url"
                        defaultValue={profile?.profile_image}
                        {...register("profile_image")}
                        placeholder="https://your-image-link.com"
                        className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="text-center">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md transition"
                    >
                        {isSubmitting ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
