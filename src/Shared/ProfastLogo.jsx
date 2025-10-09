import logo from "../assets/images/logo.png"
const ProfastLogo = () => {
    return (
        <div className="flex items-end">
            <img className="mb-2" src={logo} alt="ProFast" />
            <p className=" font-extrabold text-3xl -ml-4 ">ProFast</p>
        </div>
    );
};

export default ProfastLogo;