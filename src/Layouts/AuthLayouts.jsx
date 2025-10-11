import { Outlet } from "react-router";
import authimg from "../assets/images/authImage.png"
import ProfastLogo from "../Shared/ProfastLogo";
const AuthLayouts = () => {
    return (
        <div className="p-12 bg-base-200">
            <div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1">
                    <img
                        src={authimg}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayouts;