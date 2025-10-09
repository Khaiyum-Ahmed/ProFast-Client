import Banner from "../Banner/Banner";
import FeaturesSection from "../Features/FeaturesSection";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurService";
import Brands from "../SupportBrands/Brands";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <FeaturesSection></FeaturesSection>
        </div>
    );
};

export default Home;