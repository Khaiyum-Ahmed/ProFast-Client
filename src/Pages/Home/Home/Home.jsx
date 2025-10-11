import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import FeaturesSection from "../Features/FeaturesSection";
import FirstPriority from "../FirstPriority/FirstPriority";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurService";
import CustomerReviews from "../Reviews/CustomerReviews";
import Brands from "../SupportBrands/Brands";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <FeaturesSection></FeaturesSection>
            <FirstPriority></FirstPriority>
            <CustomerReviews></CustomerReviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;