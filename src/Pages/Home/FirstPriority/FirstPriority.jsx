import location_marchant from "../../../assets/images/location-merchant.png"
const FirstPriority = () => {
    return (
        <div className="hero bg-top bg-contain bg-no-repeat bg-[url(assets/images/be-a-merchant-bg.png)] bg-[#03373D] my-20 py-20 rounded-4xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location_marchant}
                    className="max-w-xl md:mb-8"
                />
                <div>
                    <h1 className="lg:text-5xl lg:text-start md:text-center md:text-3xl font-extrabold text-white">Merchant and Customer Satisfaction <br /> is Our First Priority</h1>
                    <p className="py-6 lg:text-start md:text-center text-[#DADADA] text-base">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className=" flex gap-5 lg:justify-start md:justify-center">
                        <button className=" p-4 bg-[#CAEB66] rounded-full text-[#1F1F1F] text-xl font-bold">Become a Merchant</button>
                        <button className="p-4 border border-[#CAEB66] rounded-full btn-outline-[#CAEB66] text-[#CAEB66] font-bold text-xl">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPriority;