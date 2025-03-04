import HeaderSix from "@/layout/headers/header-6";
import React from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import HeroBanner from "../../common/hero-banner";
import Footer from "@/layout/footers/footer";
import FormArea from "./form-area";

const ApplyJob = () => {

  return (
    <>
      <HeaderSix />
      <Breadcrumb title_top="Apply"  title_bottom="Jobs" />
      {/* <HeroBanner title="About" subtitle="SVS" bg_img="/assets/img/breadcrumb/breadcrumb-2.jpg" /> */}
      <FormArea />
      <Footer />
      {/* <FooterFive style_contact={true} style_team={true} /> */}
    </>
  );
};

export default ApplyJob;
