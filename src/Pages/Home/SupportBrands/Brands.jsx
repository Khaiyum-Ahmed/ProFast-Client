import React from 'react';
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brands/amazon.png"
import brand2 from "../../../assets/brands/casio.png"
import brand3 from "../../../assets/brands/amazon_vector.png"
import brand4 from "../../../assets/brands/moonstar.png"
import brand5 from "../../../assets/brands/randstad.png"
import brand6 from "../../../assets/brands/start-people 1.png"
import brand7 from "../../../assets/brands/start.png"
const brands = [brand1, brand2, brand3, brand4, brand5,brand6,brand7]
const Brands = () => {
    return (
        <div className='py-24'>
            <div className='mb-8'>
                <h3 className='text-[#03373D] font-extrabold text-center text-3xl'>We've helped thousands of sales teams</h3>
            </div>
            <div>
                <Marquee pauseOnHover speed={100} gradient={true} gradientColor="#e7e7e7">
                    {brands.map((brand, idx) => <div key={idx} className='mx-8 flex items-center'>
                        <img src={brand} className='h-6 object-contain' />
                    </div> )}
                </Marquee>
            </div>
        </div>
    );
};

export default Brands;