"use client";

import Banner from "./Banner";
import Features from "./Features";
import Reasons from "./Reasons";
import HowItWorks from "./HowItWorks";
import Plans from "./Plans";
import Testimonies from "./Testimonies";
import GetStarted from "./GetStarted";
import Contact from "./Contact";
import Footer from "../reusable/Footer";

const Home = () => {
  return (
    <div className="bg-background h-auto w-[100vw] xs:overflow-x-hidden">

      <Banner />
      <div className="lg:h-10 xs:h-0" />
      <Features />
      <div className="h-10" />
      <HowItWorks />
      <div className="h-20" />
      <Reasons />
      <Testimonies />
      <div className="h-20" />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Home;
