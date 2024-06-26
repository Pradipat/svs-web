import AboutArea from "@/common/about-area";
import FooterFive from "@/layout/footers/footer-5";
import HeaderSix from "@/layout/headers/header-6";
import React from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import HeroBanner from "../../common/hero-banner";
import CtaArea from "../contact/cta-area";
import TeamArea from "../homes/home-4/team-area";
import Brand from "./brand";
import CompanyArea from "./company-area";
import JobArea from "./job-area";
import JourneyArea from "./journey-area";
import Footer from "@/layout/footers/footer";
import SalesArea from "@/common/sales-area";
import PlanArea from "../homes/home-5/plan-area";
import PaymentMethodArea from "../homes/home-2/payment-method-area";



const About = () => {
  return (
    <>
      <HeaderSix />
      <Breadcrumb title_top="About"  title_bottom="SVS" />
      <HeroBanner title="About" subtitle="SVS" bg_img="/assets/img/breadcrumb/breadcrumb-2.jpg" />
      {/* <Brand /> */}
      <CompanyArea />
      <PlanArea />
      <PaymentMethodArea/>
      {/* <AboutArea /> */}
      {/* <SalesArea /> */}
      {/* <TeamArea bg_style={true} /> */}
      {/* <JourneyArea /> */}
      {/* <JobArea /> */}
      {/* <CtaArea /> */}
      <Footer />
      {/* <FooterFive style_contact={true} style_team={true} /> */}
    </>
  );
};

export default About;
