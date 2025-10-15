import { Link, NavLink } from "react-router";
import ProfastLogo from "../ProfastLogo";
import UseAuth from "../../hooks/UseAuth";

const Navbar = () => {
    const {user,logOutUser} = UseAuth();
    const userLogOut = ()=>{
        logOutUser()
        .then(()=>console.log("Sign-Out successfully"))
        .catch(error=>{
            console.log(error)
        })
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        {
            user && 
            <>
        <li><NavLink to="/addParcel">Add Parcels</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/rider">Be a Rider</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 rounded-2xl mb-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
             
                <div to="/"><ProfastLogo></ProfastLogo></div>
                
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-5 font-medium text-[#606060]">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user? <div className="flex items-center gap-2">
                        <p className="font-medium">{user.email}</p>
                        <button onClick={userLogOut} className="btn btn-primary text-black font-bold">LogOut</button>
                    </div> :
                    <Link to="/login" className="btn btn-primary text-black">LogIn</Link>
                }
                {/* <a className="btn">Button</a> */}
            </div>
        </div>
    );
};

export default Navbar;