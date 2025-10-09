import { NavLink } from "react-router";
import ProfastLogo from "../ProfastLogo";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] rounded-4xl text-primary-content p-10">
            <aside>
                <div className="text-white">
                    <ProfastLogo></ProfastLogo>
                </div>
                <p className="text-base text-[#DADADA] mb-8">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.
                </p>
                <div className="border-t border-b border-dashed border-[#03464D] w-full">
                    <ul className="flex justify-center gap-4 py-8 font-medium text-base text-[#DADADA] ">
                        <li><NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/coverage">Coverage</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/pricing">Pricing</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>


            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a className="w-8 h-8 bg-[#2489BE] rounded-full flex justify-center items-center text-black">
                        <FaLinkedinIn />
                    </a>
                    <a className="w-8 h-8 bg-[#fff] rounded-full flex justify-center items-center text-black">
                        <FaXTwitter />
                    </a>
                    <a className="w-8 h-8 bg-[#00B2FF] rounded-full flex justify-center items-center text-white text-xl">
                        <FaFacebookF />
                    </a>
                    <a className="w-8 h-8 bg-[#FF0000] rounded-full flex justify-center items-center text-white text-xl">
                        <FaYoutube />
                    </a>
                </div>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </nav>
        </footer>
    );
};

export default Footer;