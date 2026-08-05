import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import HowItWorks from "../components/landing/HowItWorks";
import DashboardPreview from "../components/landing/DashboardPreview";
import Footer from "../components/landing/Footer";

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <DashboardPreview />
      <Footer/>
    </>
  );
}

export default Landing;