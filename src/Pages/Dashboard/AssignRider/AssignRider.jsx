import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../Loading/Loading";

const AssignRider = () => {
    const axiosSecure = UseAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [riders, setRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);
    const queryClient = useQueryClient();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&delivery_status=not_collected"
            );
            // Sort oldest first
            return res.data.sort(
                (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
            );
            
        },
        
    });

    const { mutateAsync: assignRider } = useMutation({
        mutationFn: async ({ parcelId, rider }) => {
            console.log(rider)
            const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
                riderId: rider._id,
                riderEmail: rider.email,
                riderName: rider.name,
            });
        
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["assignableParcels"]);
            Swal.fire("Success", "Rider assigned successfully!", "success");
            document.getElementById("assignModal").close();
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    // Step 2: Open modal and load matching riders
    const openAssignModal = async (parcel) => {
        console.log(parcel)
        setSelectedParcel(parcel);
        setLoadingRiders(true);
        setRiders([]);

        try {
            const res = await axiosSecure.get("/riders/available", {
                params: {
                    // district: parcel.sender_center, // match with rider.district
                    warehouse: parcel.sender_center, // match with rider.district
                },
            });
            setRiders(res.data);
            console.log(riders)
            console.log('data', res.data)
        } catch (error) {
            console.error("Error fetching riders", error);
            Swal.fire("Error", "Failed to load riders", "error");
        } finally {
            setLoadingRiders(false);
            document.getElementById("assignModal").showModal();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

            {isLoading ? (
                <Loading></Loading>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No parcels available for assignment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Sender Center</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Created At</th>
                                <th>Action</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.type}</td>
                                    <td>{parcel.sender_center}</td>
                                    <td>{parcel.receiver_center}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => openAssignModal(parcel)}
                                            className="btn btn-sm btn-primary text-black">
                                            <FaMotorcycle className="inline-block mr-1" />
                                            Assign Rider
                                        </button>
                                    </td>
                                    <td>{parcel.
                                        payment_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* 🛵 Assign Rider Modal */}
                    <dialog id="assignModal" className="modal">
                        <div className="modal-box max-w-2xl">
                            <h3 className="text-lg font-bold mb-3">
                                Assign Rider for Parcel:{" "}
                                <span className="text-primary">{selectedParcel?.title}</span>
                            </h3>

                            {loadingRiders ? (
                                <Loading></Loading>
                            ) : riders.length === 0 ? (
                                <p className="text-error">No available riders in this district.</p>
                            ) : (
                                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {riders.map((rider) => (
                                                <tr key={rider._id}>
                                                    <td>{rider.name}</td>
                                                    <td>{rider.contact}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                assignRider({
                                                                    parcelId: selectedParcel._id,
                                                                    rider,
                                                                })
                                                            }
                                                            className="btn btn-xs btn-success">
                                                            Assign
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
};

export default AssignRider;