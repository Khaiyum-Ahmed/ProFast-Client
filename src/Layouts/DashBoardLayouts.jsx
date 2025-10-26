import { NavLink, Outlet } from "react-router";
import ProfastLogo from "../Shared/ProfastLogo";
import { FaBoxOpen, FaHome, FaMoneyBillWave, FaMotorcycle, FaRoute, FaUserCheck, FaUserClock, FaUserEdit, FaUserShield } from "react-icons/fa";
import UseUserRole from "../hooks/UseUserRole";

const DashBoardLayouts = () => {
    const { role, roleLoading } = UseUserRole();
    console.log(role)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">DashBoard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-4">
                    {/* Sidebar content here */}
                    <ProfastLogo></ProfastLogo>
                    <li>
                        <NavLink to="/" className="flex items-center gap-3">
                            <FaHome className="text-xl" /> Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/myParcels" className="flex items-center gap-3">
                            <FaBoxOpen className="text-xl" /> My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-3">
                            <FaMoneyBillWave className="text-xl" /> Payment History
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/track" className="flex items-center gap-3">
                            <FaRoute className="text-xl" /> Track Your Parcel
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/profile" className="flex items-center gap-3">
                            <FaUserEdit className="text-xl" /> Update Profile
                        </NavLink>
                    </li>
                    {/* riders link */}

                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <FaUserCheck className="inline-block mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <FaUserClock className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-admin">
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div >
    );
};

export default DashBoardLayouts;