"use client";

import Banner from "./Banner";
import Services from "./Services";
import Reasons from "./Reasons";
import Location from "./Location";
import Plans from "./Plans";
import Testimonies from "./Testimonies";
import GetStarted from "./GetStarted";
import Contact from "./Contact";
import Footer from "../reusable/Footer";
import Navbar from "../reusable/Navbar";

const Home = () => {
  return (
    <div className="bg-white w-[100vw] overflow-x-hidden">

      <Banner />
      <Services />
      <div className="h-10" />
      {/* <Location />
      <div className="h-20" />
      <Reasons />
      <Plans /> */}
      {/* <Testimonies />
      <div className="h-20" />
      <GetStarted />
      <Contact />
      <Footer /> */}
    </div>
  );
};

export default Home;
