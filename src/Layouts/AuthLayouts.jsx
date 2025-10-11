import { Outlet } from "react-router";
import authimg from "../assets/images/authImage.png"
import ProfastLogo from "../Shared/ProfastLogo";
const AuthLayouts = () => {
    return (
        <div className="m-12" >
            <div className="mb-12">
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="hero-content max-w-11/12 flex-col gap-10 lg:flex-row-reverse mx-auto ">
                <div className="flex-1 w-11/12 bg-[#FAFDF0] py-24 hidden lg:flex">
                    <img
                        src={authimg}
                        className="max-w-xl"
                    />
                </div>
                <div className="flex-1 w-11/12 py-24">

                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayouts;