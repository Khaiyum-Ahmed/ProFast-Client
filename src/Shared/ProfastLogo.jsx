import { Link } from "react-router";
import logo from "../assets/images/logo.png"
const ProfastLogo = () => {
    return (
        <Link to="/" className="flex items-end">
            <img className="mb-2" src={logo} alt="ProFast" />
            <p className=" font-extrabold text-3xl text-[#303030] -ml-4 ">ProFast</p>
        </Link>
    );
};

export default ProfastLogo;