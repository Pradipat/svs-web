import React from "react";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import ApplyJob from "../components/apply-job";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Apply Job"} />
      <ApplyJob />
    </Wrapper>
  );
};

export default index;
