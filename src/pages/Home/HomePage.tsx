import { AllBooks } from "../../components";
import Footer from "../../components/footer/Footer";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <>
      <div className="p-5 mb-20">
        <HeroSection />
        <AllBooks />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
