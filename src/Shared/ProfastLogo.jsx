import logo from "../assets/images/logo.png"
const ProfastLogo = () => {
    return (
        <div className="flex items-end">
            <img src={logo} alt="" />
            <p className=" font-extrabold text-3xl -ml-4 -mb-1">ProFast</p>
        </div>
    );
};

export default ProfastLogo;